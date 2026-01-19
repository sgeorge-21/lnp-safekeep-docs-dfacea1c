import { useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: string) => void;
  onSearch: (query: string) => void;
  onUploadClick: () => void;
}

export function MainLayout({
  children,
  activeView,
  onViewChange,
  onSearch,
  onUploadClick,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header onSearch={onSearch} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          activeView={activeView}
          onViewChange={onViewChange}
          onUploadClick={onUploadClick}
        />
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  );
}
