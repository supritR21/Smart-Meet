import { initTRPC, TRPCError } from '@trpc/server';
import { cache } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { polarClient } from '@/lib/polar';
import { db } from '@/db';
import { meetings, agents } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';
import { MAX_FREE_AGENTS, MAX_FREE_MEETINGS } from '@/modules/premium/constants';

export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: 'user_123' };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
export const baseProcedure = t.procedure;
export const protectedProcedure = baseProcedure.use(async ({ctx, next}) => {
  const session = await auth.api.getSession({
      headers: await headers(),
    });
    if(!session) {
      throw new TRPCError({code: "UNAUTHORIZED", message: "Unauthorized"});
    }
    return next({ctx: {...ctx, auth: session}});
});

export const premiumProcedure = (entity: "meetings" | "agents") =>
  protectedProcedure.use(async ({ctx, next}) => {
    const customer = await polarClient.customers.getStateExternal({
      externalId: ctx.auth.user.id,
    });
    // attach customer to context and continue the middleware chain
    //return next({ ctx: { ...ctx, customer } });

    const [userMeetings] = await db
       .select({
        count: count(meetings.id),
       })
       .from(meetings)
       .where(eq(meetings.userId, ctx.auth.user.id));

    const [userAgents] = await db
        .select({
          count: count(agents.id),
        })
        .from(agents)
        .where(eq(agents.userId, ctx.auth.user.id));

    const isPremium = customer.activeSubscriptions.length > 0;
    const isFreeAgentLimitReached = userAgents.count >= MAX_FREE_AGENTS;
    const isFreeMeetingLimitReached = userMeetings.count >= MAX_FREE_MEETINGS;

    const shouldThrowMeetingError = 
        entity === "meetings" && !isPremium && isFreeMeetingLimitReached;

    const shouldThrowAgentError = 
        entity === "agents" && !isPremium && isFreeAgentLimitReached;

    if(shouldThrowMeetingError) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Free meeting limit of ${MAX_FREE_MEETINGS} reached. Please upgrade to premium to create more meetings.`,
      });
    }

    if(shouldThrowAgentError) {
      throw new TRPCError({
        code: "FORBIDDEN",
        message: `Free agent limit of ${MAX_FREE_AGENTS} reached. Please upgrade to premium to create more agents.`,
      });
    }
    return next({ctx: {...ctx, customer }});
  });