import { DocumentList } from "@/components/documents/DocumentList";

interface DocumentsViewProps {
  searchQuery: string;
}

export function DocumentsView({ searchQuery }: DocumentsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">All Documents</h1>
        <p className="text-muted-foreground">
          Browse and manage all documents in the system
        </p>
      </div>

      <DocumentList searchQuery={searchQuery} />
    </div>
  );
}
