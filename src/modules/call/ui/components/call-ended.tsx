import Link from "next/link";
import { Button } from "@/components/ui/button";

export const CallEnded = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-radial from-sidebar-accent to-sidebar p-6">
      <div className="max-w-md w-full flex flex-col items-center justify-center bg-background rounded-2xl p-10 shadow-lg border border-border/40">
        <h6 className="text-2xl font-semibold text-center mb-2">You have ended the call</h6>
        <p className="text-center text-sm text-muted-foreground mb-6">
          Summary will appear in a few minutes.
        </p>
        <Button asChild className="w-full">
          <Link href="/meetings">Back to meetings</Link>
        </Button>
      </div>
    </div>
  );
};
