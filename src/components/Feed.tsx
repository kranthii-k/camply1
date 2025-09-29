import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/PostCard";
import { Filter, Plus } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const mockPosts = [
  {
    id: "1",
    username: "@dev_student_2024",
    trustLevel: "silver" as const,
    timeAgo: "2h ago",
    content: "Can anyone help me understand how to implement OAuth 2.0 in a React app? I'm getting confused with the flow and token management. Any good resources or step-by-step guides?",
    upvotes: 23,
    downvotes: 2,
    comments: 8,
    category: "query" as const,
    mockComments: [
      "I struggled with the same thing! Try the Auth0 documentation, it has great examples for React. The key is understanding the authorization code flow and how to handle the callback properly.",
      "OAuth can be tricky at first. I recommend starting with a library like react-oauth2-pkce-client instead of implementing from scratch. It handles all the security aspects for you.",
      "Check out this amazing blog post by Auth0 about OAuth 2.0 with React. It covers the entire flow with code examples: auth0.com/blog/complete-guide-to-react-user-authentication"
    ]
  },
  {
    id: "2", 
    username: "@system_architect_pro",
    trustLevel: "platinum" as const,
    timeAgo: "4h ago",
    content: "Here's a complete guide to microservices architecture that helped me land my FAANG internship. Key points: API Gateway, Service Discovery, Circuit Breakers, and proper monitoring. DM for detailed breakdown!",
    upvotes: 156,
    downvotes: 4,
    comments: 34,
    category: "solution" as const,
    mockComments: [
      "This is gold! I've been struggling with microservices design patterns. The API Gateway pattern you mentioned is exactly what our team needs. Could you share more about how you implemented service discovery?",
      "Fantastic breakdown! The circuit breaker pattern saved our production system during high traffic. Hystrix is great for this, but have you tried resilience4j? It's more modern and has better Spring Boot integration.",
      "As someone who just started learning about distributed systems, this is incredibly helpful. The monitoring aspect you mentioned - are you using Prometheus + Grafana stack? Any specific metrics you recommend tracking?"
    ]
  },
  {
    id: "3",
    username: "@startup_hunter",
    trustLevel: "gold" as const,
    timeAgo: "6h ago", 
    content: "Looking for a referral at Meta or Google for SWE New Grad 2025. Have solid projects including a distributed chat app and ML recommendation system. GPA: 3.8/4.0. Can share resume!",
    upvotes: 45,
    downvotes: 1,
    comments: 12,
    category: "job" as const,
    mockComments: [
      "I can help with Google referral! I'm a current SWE there. Your projects sound impressive. DM me your resume and I'll take a look. The hiring process is quite competitive but your background looks strong.",
      "Meta referrals are available through their career portal now. However, having an internal referral definitely helps. Make sure your resume highlights the distributed systems aspect of your chat app - that's very relevant to Meta's infrastructure."
    ]
  },
  {
    id: "4",
    username: "@ml_enthusiast",
    trustLevel: "gold" as const,
    timeAgo: "8h ago",
    content: "Just finished implementing a neural network from scratch in Python! The math behind backpropagation finally clicked. Happy to share my notes and code walkthrough with anyone interested in ML fundamentals.",
    upvotes: 89,
    downvotes: 3,
    comments: 18,
    category: "solution" as const,
    mockComments: [
      "This is amazing! I've been struggling with understanding backpropagation for weeks. Would love to see your implementation. Did you use any specific resources to understand the math behind it?"
    ]
  },
  {
    id: "5",
    username: "@hackathon_queen",
    trustLevel: "silver" as const,
    timeAgo: "12h ago",
    content: "Team won 1st place at Stanford TreeHacks! Our project was an AI-powered study planner that adapts to your learning style. Looking to turn this into a startup - need a business co-founder!",
    upvotes: 234,
    downvotes: 8,
    comments: 67,
    category: "discussion" as const,
    mockComments: [
      "Congratulations! The AI study planner sounds revolutionary. I have an MBA background and experience in ed-tech startups. Would love to discuss the business model and market potential.",
      "Incredible project! As someone who struggles with personalized study plans, this could be a game-changer. What AI/ML techniques did you use for the adaptation algorithm?"
    ]
  },
  {
    id: "6",
    username: "@frontend_wizard",
    trustLevel: "gold" as const,
    timeAgo: "14h ago",
    content: "Created a React component library with 50+ components and TypeScript support. Includes dark mode, animations, and accessibility features. Open source and ready for production use! 🚀",
    upvotes: 178,
    downvotes: 2,
    comments: 45,
    category: "solution" as const
  },
  {
    id: "7",
    username: "@crypto_student",
    trustLevel: "bronze" as const,
    timeAgo: "16h ago",
    content: "Has anyone worked with blockchain development? I'm trying to understand smart contracts and Web3 integration. Looking for study buddies or mentorship opportunities.",
    upvotes: 34,
    downvotes: 5,
    comments: 28,
    category: "query" as const
  },
  {
    id: "8",
    username: "@data_scientist_pro",
    trustLevel: "platinum" as const,
    timeAgo: "18h ago",
    content: "Sharing my journey from CS student to Data Scientist at Netflix. Key skills: Python, SQL, Machine Learning, Statistics. Happy to review resumes and provide career guidance!",
    upvotes: 298,
    downvotes: 6,
    comments: 89,
    category: "discussion" as const
  },
  {
    id: "9",
    username: "@mobile_dev_ninja",
    trustLevel: "silver" as const,
    timeAgo: "20h ago",
    content: "Built a cross-platform mobile app using React Native for my final year project. Features include real-time chat, push notifications, and offline sync. Tech stack: RN, Firebase, Redux.",
    upvotes: 67,
    downvotes: 1,
    comments: 23,
    category: "solution" as const
  },
  {
    id: "10",
    username: "@intern_seeker_2025",
    trustLevel: "bronze" as const,
    timeAgo: "1d ago",
    content: "Amazon SDE Intern interview next week! Any tips for the coding rounds? I've been practicing on LeetCode but feeling nervous about the behavioral questions. What should I expect?",
    upvotes: 156,
    downvotes: 3,
    comments: 78,
    category: "job" as const
  },
  {
    id: "11",
    username: "@ai_researcher",
    trustLevel: "platinum" as const,
    timeAgo: "1d ago",
    content: "Published my first research paper on computer vision! 'Efficient Object Detection using Transformer Architecture' - accepted at CVPR 2024. DM if you want to discuss the methodology or collaborate!",
    upvotes: 445,
    downvotes: 12,
    comments: 134,
    category: "discussion" as const
  },
  {
    id: "12",
    username: "@cloud_architect",
    trustLevel: "gold" as const,
    timeAgo: "1d ago",
    content: "Deployed my first serverless application on AWS! Used Lambda, API Gateway, DynamoDB, and S3. Cost optimization was tricky but managed to keep it under $5/month. Architecture diagram in comments!",
    upvotes: 123,
    downvotes: 4,
    comments: 56,
    category: "solution" as const
  }
];

export function Feed() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [posts, setPosts] = useState(mockPosts);
  const { toast } = useToast();

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
    toast({
      title: "Filter Applied",
      description: `Showing ${filter === "all" ? "all posts" : filter} posts`,
    });
  };

  const handleCreatePost = () => {
    toast({
      title: "Create Post",
      description: "Post creation feature opened!",
    });
  };

  const filteredPosts = activeFilter === "all" 
    ? posts 
    : posts.filter(post => {
        if (activeFilter === "queries") return post.category === "query";
        if (activeFilter === "solutions") return post.category === "solution";
        if (activeFilter === "jobs") return post.category === "job";
        if (activeFilter === "discussions") return post.category === "discussion";
        return true;
      });

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur p-4 border-b md:border-none">
        <h1 className="text-xl font-bold text-foreground md:hidden">Camply</h1>
        <div className="flex items-center gap-2 ml-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={() => toast({ title: "Filter", description: "Filter options opened!" })}
          >
            <Filter className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="md:hidden"
            onClick={handleCreatePost}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filter Tabs - Desktop */}
      <div className="hidden md:flex items-center gap-2 px-4">
        <Button 
          variant={activeFilter === "all" ? "default" : "outline"} 
          size="sm"
          onClick={() => handleFilterClick("all")}
        >
          All
        </Button>
        <Button 
          variant={activeFilter === "queries" ? "default" : "outline"} 
          size="sm"
          onClick={() => handleFilterClick("queries")}
        >
          Queries
        </Button>
        <Button 
          variant={activeFilter === "solutions" ? "default" : "outline"} 
          size="sm"
          onClick={() => handleFilterClick("solutions")}
        >
          Solutions
        </Button>
        <Button 
          variant={activeFilter === "jobs" ? "default" : "outline"} 
          size="sm"
          onClick={() => handleFilterClick("jobs")}
        >
          Jobs
        </Button>
        <Button 
          variant={activeFilter === "discussions" ? "default" : "outline"} 
          size="sm"
          onClick={() => handleFilterClick("discussions")}
        >
          Discussions
        </Button>
      </div>

      {/* Posts */}
      <div className="space-y-4 px-4 pb-20 md:pb-4">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} {...post} mockComments={post.mockComments} />
        ))}
      </div>
    </div>
  );
}