import {
  FileText,
  Upload,
  Users,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { DepartmentOverview } from "@/components/dashboard/DepartmentOverview";
import { StorageChart } from "@/components/dashboard/StorageChart";

export function DashboardView() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back, Admin</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your documents today
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today's Date</p>
          <p className="font-semibold text-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Documents"
          value="1,247"
          change="+12% from last month"
          changeType="positive"
          icon={FileText}
          variant="primary"
        />
        <StatCard
          title="Uploaded Today"
          value="23"
          change="+5 since yesterday"
          changeType="positive"
          icon={Upload}
        />
        <StatCard
          title="Active Users"
          value="156"
          change="Currently online"
          changeType="neutral"
          icon={Users}
        />
        <StatCard
          title="Pending Reviews"
          value="12"
          change="Requires attention"
          changeType="negative"
          icon={Clock}
          variant="accent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity - Takes 2 columns */}
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>

        {/* Storage Chart */}
        <div>
          <StorageChart />
        </div>
      </div>

      {/* Department Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DepartmentOverview />

        {/* Quick Actions */}
        <div className="bg-card rounded-lg border border-border shadow-card p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-card-foreground mb-4">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors text-left group">
              <Upload className="w-8 h-8 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-card-foreground">Upload Document</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add new files to the system
              </p>
            </button>
            <button className="p-4 rounded-lg bg-gold/5 hover:bg-gold/10 transition-colors text-left group">
              <Shield className="w-8 h-8 text-gold mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-card-foreground">Security Scan</p>
              <p className="text-xs text-muted-foreground mt-1">
                Check system integrity
              </p>
            </button>
            <button className="p-4 rounded-lg bg-info/5 hover:bg-info/10 transition-colors text-left group">
              <Users className="w-8 h-8 text-info mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-card-foreground">Manage Users</p>
              <p className="text-xs text-muted-foreground mt-1">
                Add or modify access
              </p>
            </button>
            <button className="p-4 rounded-lg bg-success/5 hover:bg-success/10 transition-colors text-left group">
              <TrendingUp className="w-8 h-8 text-success mb-2 group-hover:scale-110 transition-transform" />
              <p className="font-medium text-card-foreground">View Reports</p>
              <p className="text-xs text-muted-foreground mt-1">
                Analytics & insights
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
