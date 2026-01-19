import { useState } from "react";
import {
  FileText,
  Upload,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  Download,
  User,
  Filter,
  Calendar,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AuditEntry {
  id: string;
  action: "upload" | "view" | "edit" | "delete" | "approve" | "download";
  user: string;
  role: string;
  document: string;
  department: string;
  timestamp: string;
  ip: string;
}

const auditData: AuditEntry[] = [
  {
    id: "1",
    action: "upload",
    user: "Officer John Doe",
    role: "Staff",
    document: "Case Report #2024-0156",
    department: "Criminal Investigation",
    timestamp: "2024-01-15 10:32:45",
    ip: "192.168.1.45",
  },
  {
    id: "2",
    action: "approve",
    user: "Superintendent Smith",
    role: "Manager",
    document: "Policy Update v2.1",
    department: "Administration",
    timestamp: "2024-01-15 09:15:22",
    ip: "192.168.1.12",
  },
  {
    id: "3",
    action: "view",
    user: "Inspector Williams",
    role: "Staff",
    document: "Training Manual 2024",
    department: "Training",
    timestamp: "2024-01-15 08:45:11",
    ip: "192.168.1.78",
  },
  {
    id: "4",
    action: "edit",
    user: "Officer Jane Doe",
    role: "Staff",
    document: "Evidence Log #E-2024-089",
    department: "Criminal Investigation",
    timestamp: "2024-01-15 07:22:33",
    ip: "192.168.1.56",
  },
  {
    id: "5",
    action: "download",
    user: "Sergeant Brown",
    role: "Staff",
    document: "Traffic Incident Report",
    department: "Traffic Division",
    timestamp: "2024-01-14 16:45:00",
    ip: "192.168.1.89",
  },
  {
    id: "6",
    action: "delete",
    user: "Admin User",
    role: "Admin",
    document: "Duplicate File #123",
    department: "Administration",
    timestamp: "2024-01-14 14:30:00",
    ip: "192.168.1.1",
  },
  {
    id: "7",
    action: "upload",
    user: "Officer Davis",
    role: "Staff",
    document: "Community Outreach Report",
    department: "Community Policing",
    timestamp: "2024-01-14 11:20:15",
    ip: "192.168.1.67",
  },
  {
    id: "8",
    action: "view",
    user: "Chief Johnson",
    role: "Admin",
    document: "Budget Allocation 2024",
    department: "Administration",
    timestamp: "2024-01-14 09:00:00",
    ip: "192.168.1.2",
  },
];

const actionIcons = {
  upload: Upload,
  view: Eye,
  edit: Edit,
  delete: Trash2,
  approve: CheckCircle,
  download: Download,
};

const actionColors = {
  upload: "bg-info/10 text-info",
  view: "bg-muted text-muted-foreground",
  edit: "bg-warning/10 text-warning",
  delete: "bg-destructive/10 text-destructive",
  approve: "bg-success/10 text-success",
  download: "bg-primary/10 text-primary",
};

const actionLabels = {
  upload: "Uploaded",
  view: "Viewed",
  edit: "Edited",
  delete: "Deleted",
  approve: "Approved",
  download: "Downloaded",
};

export function AuditLog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterAction, setFilterAction] = useState<string | null>(null);

  const filteredData = auditData.filter((entry) => {
    const matchesSearch =
      !searchQuery ||
      entry.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.document.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterAction || entry.action === filterAction;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground">Audit Trail</h2>
        <p className="text-muted-foreground">
          Complete log of all document activities and system actions
        </p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex-1 min-w-[300px]">
          <Input
            placeholder="Search by user or document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="w-4 h-4" />
              Action Type
              <ChevronDown className="w-3 h-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Filter by Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setFilterAction(null)}>
              All Actions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAction("upload")}>
              Uploads
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAction("view")}>
              Views
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAction("edit")}>
              Edits
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAction("download")}>
              Downloads
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterAction("delete")}>
              Deletions
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          Date Range
        </Button>

        <Button variant="outline">Export Log</Button>
      </div>

      {/* Results */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredData.length} entries
      </p>

      {/* Table */}
      <div className="bg-card rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Action
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Document
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Department
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  IP Address
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((entry) => {
                const Icon = actionIcons[entry.action];
                return (
                  <tr
                    key={entry.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "p-1.5 rounded",
                            actionColors[entry.action]
                          )}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">
                          {actionLabels[entry.action]}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-card-foreground">
                            {entry.user}
                          </p>
                          <Badge variant="secondary" className="text-xs">
                            {entry.role}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-card-foreground">
                          {entry.document}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {entry.department}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {entry.timestamp}
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono">
                      {entry.ip}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
