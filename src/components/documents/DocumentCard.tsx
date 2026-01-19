import {
  FileText,
  FileImage,
  FileSpreadsheet,
  File,
  MoreVertical,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  Lock,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface Document {
  id: string;
  title: string;
  type: "pdf" | "docx" | "xlsx" | "image" | "other";
  department: string;
  owner: string;
  modified: string;
  size: string;
  status: "draft" | "review" | "approved" | "archived";
  isStarred?: boolean;
  isConfidential?: boolean;
  version?: string;
}

const fileIcons = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileSpreadsheet,
  image: FileImage,
  other: File,
};

const fileColors = {
  pdf: "bg-destructive/10 text-destructive",
  docx: "bg-info/10 text-info",
  xlsx: "bg-success/10 text-success",
  image: "bg-warning/10 text-warning",
  other: "bg-muted text-muted-foreground",
};

const statusColors = {
  draft: "bg-muted text-muted-foreground",
  review: "bg-warning/10 text-warning border-warning/30",
  approved: "bg-success/10 text-success border-success/30",
  archived: "bg-secondary text-secondary-foreground",
};

const statusLabels = {
  draft: "Draft",
  review: "Under Review",
  approved: "Approved",
  archived: "Archived",
};

interface DocumentCardProps {
  document: Document;
  onView?: (doc: Document) => void;
  onEdit?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
  onDownload?: (doc: Document) => void;
  onStar?: (doc: Document) => void;
}

export function DocumentCard({
  document,
  onView,
  onEdit,
  onDelete,
  onDownload,
  onStar,
}: DocumentCardProps) {
  const Icon = fileIcons[document.type];

  return (
    <div className="bg-card rounded-lg border border-border shadow-card hover:shadow-card-hover transition-all group animate-fade-in">
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* File Icon */}
          <div className={cn("p-3 rounded-lg flex-shrink-0", fileColors[document.type])}>
            <Icon className="w-6 h-6" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <h4 className="font-medium text-card-foreground truncate">{document.title}</h4>
                {document.isConfidential && (
                  <Lock className="w-4 h-4 text-destructive flex-shrink-0" />
                )}
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView?.(document)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit?.(document)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDownload?.(document)}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onStar?.(document)}>
                    <Star className={cn("w-4 h-4 mr-2", document.isStarred && "fill-gold text-gold")} />
                    {document.isStarred ? "Unstar" : "Star"}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => onDelete?.(document)}
                    className="text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground mt-1">{document.department}</p>

            <div className="flex items-center gap-2 mt-3 flex-wrap">
              <Badge variant="outline" className={statusColors[document.status]}>
                {statusLabels[document.status]}
              </Badge>
              {document.version && (
                <Badge variant="secondary" className="text-xs">
                  v{document.version}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{document.modified}</span>
          </div>
          <span>{document.size}</span>
        </div>
      </div>
    </div>
  );
}
