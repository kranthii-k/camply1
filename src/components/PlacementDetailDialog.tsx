import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Star, 
  MessageCircle, 
  ThumbsUp, 
  Building2,
  Clock,
  GraduationCap,
  TrendingUp,
  Heart,
  Reply
} from "lucide-react";

interface PlacementDetailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  placement: any;
}

const mockComments = [
  {
    id: 1,
    author: "Rahul Sharma",
    college: "IIT Delhi",
    timeAgo: "2 hours ago",
    content: "This is incredibly helpful! I had my Google interview last month and the experience was quite similar. The system design round was particularly challenging - they asked me to design a URL shortener service like bit.ly. I spent about 15 minutes discussing the high-level architecture, talking about load balancers, database sharding, and caching strategies. The interviewer was really impressed with my approach to handling scale and fault tolerance. Thanks for sharing your detailed experience, it would have been so useful before my interview!",
    likes: 24,
    avatar: "RS"
  },
  {
    id: 2,
    author: "Priya Patel",
    college: "BITS Pilani",
    timeAgo: "5 hours ago",
    content: "Absolutely agree with your assessment of the coding rounds! I recently appeared for Microsoft and faced similar medium-level problems. One was about finding the lowest common ancestor in a binary tree, and another involved implementing a least recently used (LRU) cache with O(1) operations. The key is to think out loud and explain your approach step by step. Even if you don't get the optimal solution immediately, the interviewers appreciate clear communication and logical thinking. Your tips about preparing different approaches for each problem type are spot on!",
    likes: 18,
    avatar: "PP"
  },
  {
    id: 3,
    author: "Amit Kumar",
    college: "NIT Warangal",
    timeAgo: "8 hours ago",
    content: "I wish I had read this before my Amazon interview! The behavioral questions really caught me off guard, especially the ones about leadership principles. They asked me about a time when I had to deal with a difficult team member during a project. I fumbled a bit because I hadn't prepared specific examples using the STAR method (Situation, Task, Action, Result). Your advice about preparing stories that align with company values is golden. Also, the salary negotiation tips are really valuable - I accepted their first offer without negotiating and later realized I could have asked for more. Thanks for being so transparent about the entire process!",
    likes: 31,
    avatar: "AK"
  },
  {
    id: 4,
    author: "Sneha Reddy",
    college: "VIT Chennai",
    timeAgo: "12 hours ago",
    content: "This post is a treasure trove of information! I'm currently in my final year and preparing for placements. The technical preparation timeline you mentioned (3-4 months of consistent practice) seems reasonable. I've been solving problems on LeetCode and CodeSignal, but I think I need to focus more on system design concepts. Do you have any recommendations for good system design resources? Also, the part about company culture fit is something I never considered seriously before. How do you research a company's culture beyond their website? I'm particularly interested in companies that prioritize work-life balance and continuous learning opportunities.",
    likes: 15,
    avatar: "SR"
  },
  {
    id: 5,
    author: "Vikash Singh",
    college: "DTU Delhi",
    timeAgo: "1 day ago",
    content: "Incredible detail in your experience! I'm currently preparing for placements and this gives me so much clarity about what to expect. The part about the group discussion was particularly insightful. I've always been nervous about speaking in groups, but your tip about listening actively and building on others' points rather than just waiting for your turn to speak is really helpful. Also, the technical interview structure you described matches what my seniors have told me about their experiences at similar companies. I'm curious about the project discussion part - did they dive deep into your code implementation or were they more interested in your problem-solving approach and the impact of your project?",
    likes: 22,
    avatar: "VS"
  }
];

export function PlacementDetailDialog({ open, onOpenChange, placement }: PlacementDetailDialogProps) {
  if (!placement) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            {placement.company} Interview Experience
          </DialogTitle>
        </DialogHeader>

        <div className="overflow-y-auto flex-1">
          {/* Company Header */}
          <Card className="p-6 mb-6 bg-gradient-card border-2">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg">{placement.company}</h3>
                    <p className="text-muted-foreground">{placement.role}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{placement.package}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{placement.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span>{placement.college}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge className={getDifficultyColor(placement.difficulty)}>
                    {placement.difficulty}
                  </Badge>
                  <Badge variant="outline" className="border-primary/50">
                    {placement.type}
                  </Badge>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{placement.upvotes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{placement.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{placement.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Interview Experience Content */}
          <Card className="p-6 mb-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Interview Experience
            </h4>
            
            <div className="prose prose-gray max-w-none">
              <div className="space-y-4 text-foreground">
                <div>
                  <h5 className="font-semibold text-primary">Application Process:</h5>
                  <p>Applied through campus placements in August 2024. The selection process consisted of an online test, followed by technical interviews and HR round. The entire process took about 3 weeks from application to final offer.</p>
                </div>

                <div>
                  <h5 className="font-semibold text-primary">Online Assessment:</h5>
                  <p>The online test had 3 coding questions and 20 MCQs covering data structures, algorithms, and company-specific domain knowledge. Time limit was 90 minutes. Questions ranged from medium to hard difficulty level.</p>
                </div>

                <div>
                  <h5 className="font-semibold text-primary">Technical Interview Rounds:</h5>
                  <p><strong>Round 1:</strong> Focused on data structures and algorithms. Asked to implement a binary search tree and solve a dynamic programming problem. Duration: 45 minutes.</p>
                  <p><strong>Round 2:</strong> System design round where I had to design a scalable chat application. Discussed database design, caching strategies, and microservices architecture. Duration: 60 minutes.</p>
                  <p><strong>Round 3:</strong> Project discussion and behavioral questions. Deep dive into my final year project and questions about teamwork, leadership, and problem-solving scenarios.</p>
                </div>

                <div>
                  <h5 className="font-semibold text-primary">Key Tips:</h5>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Practice coding problems daily for at least 2-3 months before placements</li>
                    <li>Focus on understanding concepts rather than memorizing solutions</li>
                    <li>Prepare STAR format answers for behavioral questions</li>
                    <li>Research the company thoroughly and align your answers with their values</li>
                    <li>Practice explaining your thought process clearly during coding</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-semibold text-primary">Questions Asked:</h5>
                  <p><strong>Coding:</strong> Implement LRU Cache, Find longest palindromic substring, Design rate limiter</p>
                  <p><strong>System Design:</strong> Design WhatsApp-like messaging system with focus on scalability and real-time features</p>
                  <p><strong>Behavioral:</strong> Tell me about a challenging project, How do you handle conflicts in team, Why this company?</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Author Info */}
          <Card className="p-4 mb-6 bg-accent/5">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <div className="w-full h-full bg-gradient-accent rounded-full flex items-center justify-center text-white font-semibold">
                  {placement.author.charAt(0)}
                </div>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">{placement.author}</p>
                <p className="text-sm text-muted-foreground">{placement.college} • {placement.time}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-2">
                  <ThumbsUp className="h-4 w-4" />
                  {placement.upvotes}
                </Button>
                <Button size="sm" variant="outline" className="gap-2">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Comments Section */}
          <Card className="p-6">
            <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              Comments ({mockComments.length})
            </h4>

            <div className="space-y-6">
              {mockComments.map((comment) => (
                <div key={comment.id} className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 mt-1">
                      <div className="w-full h-full bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {comment.avatar}
                      </div>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{comment.author}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{comment.college}</span>
                        <span className="text-sm text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm leading-relaxed">{comment.content}</p>
                      <div className="flex items-center gap-4">
                        <Button size="sm" variant="ghost" className="gap-2 h-8 px-2">
                          <ThumbsUp className="h-3 w-3" />
                          {comment.likes}
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-2 h-8 px-2">
                          <Reply className="h-3 w-3" />
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                  {comment.id < mockComments.length && <Separator className="mt-4" />}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}