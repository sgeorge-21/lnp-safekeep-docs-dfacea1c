import { useState } from "react";
import { Grid, List, Filter, SortDesc, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DocumentCard, Document } from "./DocumentCard";
import { DocumentRow } from "./DocumentRow";
import { cn } from "@/lib/utils";

// Sample documents data
const sampleDocuments: Document[] = [
  {
    id: "1",
    title: "Case Report #2024-0156",
    type: "pdf",
    department: "Criminal Investigation",
    owner: "Officer John Doe",
    modified: "5 min ago",
    size: "2.4 MB",
    status: "approved",
    isStarred: true,
    isConfidential: true,
    version: "2.1",
  },
  {
    id: "2",
    title: "Policy Update - Use of Force Guidelines",
    type: "docx",
    department: "Administration",
    owner: "Superintendent Smith",
    modified: "1 hour ago",
    size: "1.2 MB",
    status: "review",
    version: "3.0",
  },
  {
    id: "3",
    title: "Training Schedule Q1 2024",
    type: "xlsx",
    department: "Training",
    owner: "Inspector Williams",
    modified: "2 hours ago",
    size: "856 KB",
    status: "approved",
  },
  {
    id: "4",
    title: "Evidence Photos - Case #2024-0089",
    type: "image",
    department: "Criminal Investigation",
    owner: "Officer Jane Doe",
    modified: "3 hours ago",
    size: "15.2 MB",
    status: "draft",
    isConfidential: true,
  },
  {
    id: "5",
    title: "Traffic Incident Report - January 2024",
    type: "pdf",
    department: "Traffic Division",
    owner: "Sergeant Brown",
    modified: "4 hours ago",
    size: "3.8 MB",
    status: "approved",
    isStarred: true,
  },
  {
    id: "6",
    title: "Community Outreach Program Plan",
    type: "docx",
    department: "Community Policing",
    owner: "Officer Davis",
    modified: "1 day ago",
    size: "2.1 MB",
    status: "draft",
  },
  {
    id: "7",
    title: "Budget Allocation Report 2024",
    type: "xlsx",
    department: "Administration",
    owner: "Chief Johnson",
    modified: "2 days ago",
    size: "1.5 MB",
    status: "archived",
    isConfidential: true,
  },
  {
    id: "8",
    title: "Officer Performance Evaluation Template",
    type: "docx",
    department: "Administration",
    owner: "HR Manager",
    modified: "3 days ago",
    size: "890 KB",
    status: "approved",
    version: "1.2",
  },
];

interface DocumentListProps {
  searchQuery?: string;
}

export function DocumentList({ searchQuery }: DocumentListProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("modified");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);

  const filteredDocuments = sampleDocuments.filter((doc) => {
    const matchesSearch =
      !searchQuery ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = !filterStatus || doc.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" />
                Filter
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setFilterStatus(null)}>
                All Documents
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("draft")}>
                Draft
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("review")}>
                Under Review
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("approved")}>
                Approved
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFilterStatus("archived")}>
                Archived
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Sort */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <SortDesc className="w-4 h-4" />
                Sort
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy("modified")}>
                Last Modified
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("name")}>
                Name
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("size")}>
                Size
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("type")}>
                Type
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {filterStatus && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterStatus(null)}
              className="text-muted-foreground"
            >
              Clear filter
            </Button>
          )}
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 bg-muted p-1 rounded-md">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("grid")}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "secondary" : "ghost"}
            size="icon"
            className="h-8 w-8"
            onClick={() => setViewMode("list")}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground">
        Showing {filteredDocuments.length} of {sampleDocuments.length} documents
      </p>

      {/* Documents */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredDocuments.map((doc) => (
            <DocumentCard key={doc.id} document={doc} />
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-muted/50 text-xs font-medium text-muted-foreground uppercase tracking-wider">
            <div className="col-span-5">Document</div>
            <div className="col-span-2">Department</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Modified</div>
            <div className="col-span-1">Size</div>
          </div>
          {filteredDocuments.map((doc) => (
            <DocumentRow key={doc.id} document={doc} />
          ))}
        </div>
      )}
    </div>
  );
}
