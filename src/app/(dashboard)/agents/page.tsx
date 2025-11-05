import { AgentsView, AgentsViewError } from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { get } from "http";
import { Suspense } from "react";
import { LoadingState } from "@/components/loading-state";
import { AgentsViewLoading } from "@/modules/agents/ui/views/agents-view";
import { ErrorBoundary } from "react-error-boundary";


const Page = () => {
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense
                fallback={<AgentsViewLoading />}
            >
                <ErrorBoundary fallback={<AgentsViewError />}>
                    <AgentsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;