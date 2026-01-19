import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardView } from "@/components/views/DashboardView";
import { DocumentsView } from "@/components/views/DocumentsView";
import { AuditLog } from "@/components/audit/AuditLog";
import { UploadModal } from "@/components/documents/UploadModal";

const Index = () => {
  const [activeView, setActiveView] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <DashboardView />;
      case "documents":
      case "recent":
      case "starred":
      case "trash":
      case "search":
        return <DocumentsView searchQuery={searchQuery} />;
      case "audit":
        return <AuditLog />;
      case "users":
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-foreground">User Management</h1>
              <p className="text-muted-foreground">
                Manage users, roles, and permissions
              </p>
            </div>
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">
                User management features require backend integration.
              </p>
            </div>
          </div>
        );
      case "settings":
        return (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">
                Configure system settings and preferences
              </p>
            </div>
            <div className="bg-card rounded-lg border border-border p-8 text-center">
              <p className="text-muted-foreground">
                Settings configuration coming soon.
              </p>
            </div>
          </div>
        );
      default:
        return <DashboardView />;
    }
  };

  return (
    <>
      <MainLayout
        activeView={activeView}
        onViewChange={setActiveView}
        onSearch={setSearchQuery}
        onUploadClick={() => setUploadModalOpen(true)}
      >
        {renderView()}
      </MainLayout>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  );
};

export default Index;
