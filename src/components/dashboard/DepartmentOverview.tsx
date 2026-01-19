import { Building2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Department {
  name: string;
  documents: number;
  storage: number;
  color: string;
}

const departments: Department[] = [
  { name: "Criminal Investigation", documents: 342, storage: 45, color: "bg-navy" },
  { name: "Administration", documents: 215, storage: 28, color: "bg-gold" },
  { name: "Traffic Division", documents: 189, storage: 22, color: "bg-info" },
  { name: "Community Policing", documents: 134, storage: 15, color: "bg-success" },
  { name: "Training", documents: 98, storage: 12, color: "bg-warning" },
];

export function DepartmentOverview() {
  const totalDocuments = departments.reduce((sum, d) => sum + d.documents, 0);

  return (
    <div className="bg-card rounded-lg border border-border shadow-card animate-fade-in">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Department Overview</h3>
        <p className="text-sm text-muted-foreground">Document distribution by department</p>
      </div>
      <div className="p-4 space-y-4">
        {departments.map((dept) => {
          const percentage = Math.round((dept.documents / totalDocuments) * 100);
          return (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${dept.color}`} />
                  <span className="text-card-foreground font-medium">{dept.name}</span>
                </div>
                <span className="text-muted-foreground">{dept.documents} docs</span>
              </div>
              <Progress value={percentage} className="h-2" />
            </div>
          );
        })}
      </div>
      <div className="p-4 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Total Documents</span>
          <span className="font-semibold text-card-foreground">{totalDocuments}</span>
        </div>
      </div>
    </div>
  );
}
