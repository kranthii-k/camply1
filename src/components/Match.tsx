import { HackathonMatch } from "@/components/HackathonMatch";
import { Heart } from "lucide-react";

export function Match() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur p-4 border-b md:border-none">
        <h1 className="text-xl font-bold text-foreground md:hidden">Find Teammates</h1>
      </div>

      <div className="px-4 space-y-6 pb-20 md:pb-4">
        {/* Hackathon Matching */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-accent" />
            <h2 className="text-lg font-semibold text-foreground">Find Teammates</h2>
          </div>
          <HackathonMatch />
        </div>
      </div>
    </div>
  );
}