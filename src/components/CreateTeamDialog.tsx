import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
    toast({
      title: "Find Member",
      description: `Searching for member for position ${index + 1}...`,
    });
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
  );
}