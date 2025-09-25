import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Plus, Search, Star, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockTeamMembers = [
  { id: 1, name: "Alex Chen", role: "Frontend Developer", skills: ["React", "TypeScript", "UI/UX"], rating: 4.8, projects: 12 },
  { id: 2, name: "Sarah Kumar", role: "Backend Developer", skills: ["Node.js", "Python", "Database"], rating: 4.9, projects: 8 },
  { id: 3, name: "Mike Torres", role: "Designer", skills: ["Figma", "Photoshop", "Branding"], rating: 4.7, projects: 15 },
  { id: 4, name: "Emma Wilson", role: "Data Scientist", skills: ["Python", "ML", "Analytics"], rating: 4.6, projects: 6 },
  { id: 5, name: "James Park", role: "DevOps Engineer", skills: ["AWS", "Docker", "CI/CD"], rating: 4.8, projects: 10 },
];

interface TeamMember {
  name: string;
  role: string;
}

interface CreateTeamDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTeamDialog({ open, onOpenChange }: CreateTeamDialogProps) {
  const { toast } = useToast();
  const [teamName, setTeamName] = useState("");
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" },
    { name: "", role: "" }
  ]);
  const [showMatches, setShowMatches] = useState(false);
  const [selectedMemberIndex, setSelectedMemberIndex] = useState<number | null>(null);

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const newMembers = [...members];
    newMembers[index] = { ...newMembers[index], [field]: value };
    setMembers(newMembers);
  };

  const handleAddMember = (index: number) => {
    toast({
      title: "Add Member",
      description: `Adding member to position ${index + 1}...`,
    });
  };

  const handleFindMember = (index: number) => {
    setSelectedMemberIndex(index);
    setShowMatches(true);
  };

  const handleSelectMember = (memberData: any) => {
    if (selectedMemberIndex !== null) {
      updateMember(selectedMemberIndex, "name", memberData.name);
      updateMember(selectedMemberIndex, "role", memberData.role);
      setShowMatches(false);
      setSelectedMemberIndex(null);
      toast({
        title: "Member Added",
        description: `${memberData.name} has been added to your team!`,
      });
    }
  };

  const handleCreateTeam = () => {
    if (!teamName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a team name",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Team Created!",
      description: `Team "${teamName}" has been created successfully.`,
    });
    onOpenChange(false);
    setTeamName("");
    setMembers([
      { name: "", role: "" },
      { name: "", role: "" },
      { name: "", role: "" },
      { name: "", role: "" }
    ]);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Team Name */}
          <div className="space-y-2">
            <Label htmlFor="team-name">Team Name</Label>
            <Input
              id="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              placeholder="Enter team name"
            />
          </div>

          {/* Team Members */}
          <div className="space-y-4">
            <Label>Team Members</Label>
            {members.map((member, index) => (
              <div key={index} className="space-y-2 p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">
                    Member {index + 1}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleAddMember(index)}
                      className="h-6 w-6 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleFindMember(index)}
                      className="h-6 w-6 p-0"
                    >
                      <Search className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <Input
                  value={member.name}
                  onChange={(e) => updateMember(index, "name", e.target.value)}
                  placeholder="Member name"
                  className="text-sm"
                />
                <Input
                  value={member.role}
                  onChange={(e) => updateMember(index, "role", e.target.value)}
                  placeholder="Role"
                  className="text-sm"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateTeam}>
              Create Team
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>

    {/* Team Member Matches Dialog */}
    <Dialog open={showMatches} onOpenChange={setShowMatches}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Find Team Member</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Browse potential team members and find the perfect match for your project.
          </p>
          
          {mockTeamMembers.map((member) => (
            <div key={member.id} className="p-4 border rounded-lg hover:shadow-md transition-all">
              <div className="flex items-start gap-3">
                <Avatar className="h-12 w-12 bg-gradient-primary" />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-foreground">{member.name}</h4>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{member.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {member.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {member.projects} projects completed
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="h-7 text-xs"
                      >
                        <MessageCircle className="h-3 w-3 mr-1" />
                        Message
                      </Button>
                      <Button 
                        size="sm"
                        className="h-7 text-xs"
                        onClick={() => handleSelectMember(member)}
                      >
                        Add to Team
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
}