import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrustBadge } from "@/components/TrustBadge";
import { ChevronUp, ChevronDown, MessageCircle, Share } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface PostCardProps {
  id: string;
  username: string;
  trustLevel: "bronze" | "silver" | "gold" | "platinum";
  timeAgo: string;
  content: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  category: "query" | "solution" | "job" | "discussion";
  className?: string;
  mockComments?: string[];
}

const categoryColors = {
  query: "bg-blue-100 text-blue-800",
  solution: "bg-green-100 text-green-800", 
  job: "bg-purple-100 text-purple-800",
  discussion: "bg-orange-100 text-orange-800"
};

export function PostCard({ 
  username, 
  trustLevel, 
  timeAgo, 
  content, 
  upvotes, 
  downvotes, 
  comments, 
  category,
  className,
  mockComments = []
}: PostCardProps) {
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [currentDownvotes, setCurrentDownvotes] = useState(downvotes);
  const [currentComments, setCurrentComments] = useState(comments);
  const [showComments, setShowComments] = useState(false);
  const { toast } = useToast();

  const handleVote = (type: "up" | "down") => {
    if (userVote === type) {
      // Remove vote
      if (type === "up") {
        setCurrentUpvotes(prev => prev - 1);
      } else {
        setCurrentDownvotes(prev => prev - 1);
      }
      setUserVote(null);
    } else {
      // Change or add vote
      if (userVote === "up" && type === "down") {
        setCurrentUpvotes(prev => prev - 1);
        setCurrentDownvotes(prev => prev + 1);
      } else if (userVote === "down" && type === "up") {
        setCurrentDownvotes(prev => prev - 1);
        setCurrentUpvotes(prev => prev + 1);
      } else {
        if (type === "up") {
          setCurrentUpvotes(prev => prev + 1);
        } else {
          setCurrentDownvotes(prev => prev + 1);
        }
      }
      setUserVote(type);
    }
  };

  return (
    <Card className={cn("p-6 hover:shadow-medium transition-all duration-300 animate-fade-in", className)}>
      <div className="flex gap-4">
        {/* Voting Section */}
        <div className="flex flex-col items-center gap-2 pt-1">
          <Button
            variant="upvote"
            size="icon"
            onClick={() => handleVote("up")}
            className={cn(
              "h-8 w-8",
              userVote === "up" && "text-accent bg-accent/20"
            )}
          >
            <ChevronUp className="h-4 w-4" />
          </Button>
          <span className="text-sm font-medium text-foreground">
            {currentUpvotes - currentDownvotes}
          </span>
          <Button
            variant="downvote"
            size="icon"
            onClick={() => handleVote("down")}
            className={cn(
              "h-8 w-8",
              userVote === "down" && "text-destructive bg-destructive/20"
            )}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{username}</span>
                <TrustBadge level={trustLevel} />
              </div>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">{timeAgo}</span>
            </div>
            <span className={cn("px-2 py-1 rounded-full text-xs font-medium", categoryColors[category])}>
              {category}
            </span>
          </div>

          {/* Content */}
          <p className="text-foreground leading-relaxed">{content}</p>

          {/* Actions */}
          <div className="flex items-center gap-4 pt-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => setShowComments(!showComments)}
            >
              <MessageCircle className="h-4 w-4" />
              {currentComments} comments
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground"
              onClick={() => {
                navigator.clipboard.writeText(content);
                toast({
                  title: "Shared!",
                  description: "Post content copied to clipboard",
                });
              }}
            >
              <Share className="h-4 w-4" />
              Share
            </Button>
          </div>

          {/* Comments Section */}
          {showComments && mockComments.length > 0 && (
            <div className="mt-4 pt-4 border-t space-y-3">
              {mockComments.map((comment, index) => (
                <div key={index} className="bg-muted/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-xs font-semibold">
                      {comment.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium">@anonymous_user_{index + 1}</span>
                    <span className="text-xs text-muted-foreground">• {Math.floor(Math.random() * 12) + 1}h ago</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed">{comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}