import { useState } from "react";
import {
  Home,
  FileText,
  Folder,
  Search,
  Clock,
  Users,
  Settings,
  Shield,
  ChevronDown,
  ChevronRight,
  Building2,
  Star,
  Trash2,
  Upload,
  BarChart3,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import lnpLogo from "@/assets/lnp-logo.jpg";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  badge?: number;
  onClick?: () => void;
}

function NavItem({ icon: Icon, label, active, badge, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
        active
          ? "bg-sidebar-primary text-sidebar-primary-foreground"
          : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground"
      )}
    >
      <Icon className="w-4 h-4 flex-shrink-0" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="bg-gold text-navy-dark text-xs font-semibold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </button>
  );
}

interface FolderItemProps {
  name: string;
  count: number;
  isOpen?: boolean;
  children?: React.ReactNode;
}

function FolderItem({ name, count, isOpen, children }: FolderItemProps) {
  const [open, setOpen] = useState(isOpen);

  if (!children) {
    return (
      <button className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
        <Folder className="w-4 h-4" />
        <span className="flex-1 text-left">{name}</span>
        <span className="text-xs text-sidebar-foreground/50">{count}</span>
      </button>
    );
  }

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-sm text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors">
        {open ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        <Folder className="w-4 h-4" />
        <span className="flex-1 text-left">{name}</span>
        <span className="text-xs text-sidebar-foreground/50">{count}</span>
      </CollapsibleTrigger>
      <CollapsibleContent className="pl-6 mt-1 space-y-1">
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
  onUploadClick: () => void;
}

export function Sidebar({ activeView, onViewChange, onUploadClick }: SidebarProps) {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src={lnpLogo} 
            alt="Liberia National Police" 
            className="h-12 w-auto object-contain"
          />
        </div>
        <p className="text-xs text-sidebar-foreground/60 mt-2">Document Management System</p>
      </div>

      {/* Upload Button */}
      <div className="p-4">
        <Button
          onClick={onUploadClick}
          className="w-full bg-gold hover:bg-gold-dark text-navy-dark font-semibold gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <ScrollArea className="flex-1 px-3">
        {/* Main Navigation */}
        <nav className="space-y-1">
          <NavItem
            icon={Home}
            label="Dashboard"
            active={activeView === "dashboard"}
            onClick={() => onViewChange("dashboard")}
          />
          <NavItem
            icon={FileText}
            label="All Documents"
            active={activeView === "documents"}
            onClick={() => onViewChange("documents")}
            badge={1247}
          />
          <NavItem
            icon={Search}
            label="Advanced Search"
            active={activeView === "search"}
            onClick={() => onViewChange("search")}
          />
          <NavItem
            icon={Clock}
            label="Recent"
            active={activeView === "recent"}
            onClick={() => onViewChange("recent")}
          />
          <NavItem
            icon={Star}
            label="Starred"
            active={activeView === "starred"}
            onClick={() => onViewChange("starred")}
          />
          <NavItem
            icon={Trash2}
            label="Trash"
            active={activeView === "trash"}
            onClick={() => onViewChange("trash")}
          />
        </nav>

        {/* Departments */}
        <div className="mt-6">
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Departments
          </h3>
          <div className="space-y-1">
            <FolderItem name="Criminal Investigation" count={342} isOpen>
              <FolderItem name="Case Files" count={156} />
              <FolderItem name="Evidence" count={89} />
              <FolderItem name="Reports" count={97} />
            </FolderItem>
            <FolderItem name="Administration" count={215}>
              <FolderItem name="Policies" count={45} />
              <FolderItem name="Procedures" count={78} />
              <FolderItem name="HR Documents" count={92} />
            </FolderItem>
            <FolderItem name="Traffic Division" count={189} />
            <FolderItem name="Community Policing" count={134} />
            <FolderItem name="Training" count={98} />
          </div>
        </div>

        {/* Smart Folders */}
        <div className="mt-6">
          <h3 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50">
            Smart Folders
          </h3>
          <div className="space-y-1">
            <NavItem icon={Clock} label="Modified Today" badge={23} />
            <NavItem icon={Shield} label="Confidential" badge={156} />
            <NavItem icon={Building2} label="Pending Review" badge={12} />
          </div>
        </div>
      </ScrollArea>

      {/* Bottom Navigation */}
      <div className="p-3 border-t border-sidebar-border space-y-1">
        <NavItem
          icon={Users}
          label="User Management"
          active={activeView === "users"}
          onClick={() => onViewChange("users")}
        />
        <NavItem
          icon={BarChart3}
          label="Audit Trail"
          active={activeView === "audit"}
          onClick={() => onViewChange("audit")}
        />
        <NavItem
          icon={Settings}
          label="Settings"
          active={activeView === "settings"}
          onClick={() => onViewChange("settings")}
        />
      </div>
    </aside>
  );
}
