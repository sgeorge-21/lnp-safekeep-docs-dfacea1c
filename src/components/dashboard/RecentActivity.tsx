import { FileText, Upload, Eye, Edit, Trash2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Activity {
  id: string;
  type: "upload" | "view" | "edit" | "delete" | "approve";
  user: string;
  document: string;
  time: string;
  department: string;
}

const activities: Activity[] = [
  {
    id: "1",
    type: "upload",
    user: "Officer John Doe",
    document: "Case Report #2024-0156",
    time: "5 minutes ago",
    department: "Criminal Investigation",
  },
  {
    id: "2",
    type: "approve",
    user: "Superintendent Smith",
    document: "Policy Update v2.1",
    time: "1 hour ago",
    department: "Administration",
  },
  {
    id: "3",
    type: "view",
    user: "Inspector Williams",
    document: "Training Manual 2024",
    time: "2 hours ago",
    department: "Training",
  },
  {
    id: "4",
    type: "edit",
    user: "Officer Jane Doe",
    document: "Evidence Log #E-2024-089",
    time: "3 hours ago",
    department: "Criminal Investigation",
  },
  {
    id: "5",
    type: "upload",
    user: "Sergeant Brown",
    document: "Traffic Incident Report",
    time: "4 hours ago",
    department: "Traffic Division",
  },
];

const activityIcons = {
  upload: Upload,
  view: Eye,
  edit: Edit,
  delete: Trash2,
  approve: CheckCircle,
};

const activityColors = {
  upload: "bg-info/10 text-info",
  view: "bg-muted text-muted-foreground",
  edit: "bg-warning/10 text-warning",
  delete: "bg-destructive/10 text-destructive",
  approve: "bg-success/10 text-success",
};

const activityLabels = {
  upload: "uploaded",
  view: "viewed",
  edit: "edited",
  delete: "deleted",
  approve: "approved",
};

export function RecentActivity() {
  return (
    <div className="bg-card rounded-lg border border-border shadow-card animate-fade-in">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-semibold text-card-foreground">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">Latest document actions</p>
      </div>
      <div className="divide-y divide-border">
        {activities.map((activity) => {
          const Icon = activityIcons[activity.type];
          return (
            <div
              key={activity.id}
              className="p-4 flex items-start gap-3 hover:bg-muted/50 transition-colors"
            >
              <div
                className={cn(
                  "p-2 rounded-lg flex-shrink-0",
                  activityColors[activity.type]
                )}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-card-foreground">
                  <span className="font-medium">{activity.user}</span>{" "}
                  {activityLabels[activity.type]}{" "}
                  <span className="font-medium">{activity.document}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                  <span className="text-xs text-muted-foreground">•</span>
                  <span className="text-xs text-muted-foreground">{activity.department}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-3 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 font-medium py-1">
          View All Activity
        </button>
      </div>
    </div>
  );
}
