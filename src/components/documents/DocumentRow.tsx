import {
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  MoreVertical,
  Lock,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Document } from "./DocumentCard";

const fileIcons = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileSpreadsheet,
  image: FileImage,
  other: File,
};

const fileColors = {
  pdf: "text-destructive",
  docx: "text-info",
  xlsx: "text-success",
  image: "text-warning",
  other: "text-muted-foreground",
};

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-warning/10 text-warning",
  approved: "bg-success/10 text-success",
  archived: "bg-secondary text-secondary-foreground",
};

const statusLabels = {
  draft: "Draft",
  review: "Under Review",
  approved: "Approved",
  archived: "Archived",
};

interface DocumentRowProps {
  document: Document;
}

export function DocumentRow({ document }: DocumentRowProps) {
  const Icon = fileIcons[document.type];

  return (
    <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-border last:border-0 hover:bg-muted/30 transition-colors items-center">
      {/* Document */}
      <div className="col-span-5 flex items-center gap-3">
        <Icon className={cn("w-5 h-5 flex-shrink-0", fileColors[document.type])} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-card-foreground truncate">
              {document.title}
            </span>
            {document.isStarred && (
              <Star className="w-4 h-4 text-gold fill-gold flex-shrink-0" />
            )}
            {document.isConfidential && (
              <Lock className="w-4 h-4 text-destructive flex-shrink-0" />
            )}
          </div>
          <span className="text-xs text-muted-foreground">{document.owner}</span>
        </div>
      </div>

      {/* Department */}
      <div className="col-span-2 text-sm text-muted-foreground truncate">
        {document.department}
      </div>

      {/* Status */}
      <div className="col-span-2">
        <Badge variant="outline" className={cn("text-xs", statusColors[document.status])}>
          {statusLabels[document.status]}
        </Badge>
      </div>

      {/* Modified */}
      <div className="col-span-2 text-sm text-muted-foreground">
        {document.modified}
      </div>

      {/* Size */}
      <div className="col-span-1 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{document.size}</span>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
