import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ArrowLeft, Bell, Camera, CameraOff, CheckCircle2, AlertTriangle, XCircle, TrendingUp, Clock, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PostureScoreRing from "@/components/dashboard/PostureScoreRing";
import SessionHistory from "@/components/dashboard/SessionHistory";
import AlertsFeed from "@/components/dashboard/AlertsFeed";
import ErgonomicTips from "@/components/dashboard/ErgonomicTips";

const Dashboard = () => {
  const [monitoring, setMonitoring] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">PostureAI</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant={monitoring ? "destructive" : "default"}
              size="sm"
              className="gap-2"
              onClick={() => setMonitoring(!monitoring)}
            >
              {monitoring ? <CameraOff className="h-4 w-4" /> : <Camera className="h-4 w-4" />}
              {monitoring ? "Stop" : "Start Monitoring"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Monitor your posture and track improvements</p>
        </motion.div>

        {/* Status Banner */}
        {monitoring && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mb-6 flex items-center gap-3 rounded-lg border border-success/30 bg-success/10 px-4 py-3"
          >
            <div className="h-2 w-2 animate-pulse rounded-full bg-success" />
            <span className="text-sm font-medium text-foreground">Posture monitoring active — AI is analyzing your position</span>
          </motion.div>
        )}

        {/* Stats Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Gauge} label="Posture Score" value="82/100" trend="+5 from yesterday" positive />
          <StatCard icon={Clock} label="Today's Session" value="3h 24m" trend="2 breaks taken" />
          <StatCard icon={Bell} label="Alerts Today" value="7" trend="3 fewer than avg" positive />
          <StatCard icon={TrendingUp} label="Weekly Trend" value="+12%" trend="Consistent improvement" positive />
        </div>

        {/* Main Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <PostureScoreRing />
            <SessionHistory />
          </div>
          <div className="space-y-6">
            <AlertsFeed />
            <ErgonomicTips />
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, positive }: {
  icon: React.ElementType; label: string; value: string; trend: string; positive?: boolean;
}) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
    <Card className="shadow-soft">
      <CardContent className="flex items-start gap-4 p-5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold text-foreground">{value}</p>
          <p className={`text-xs ${positive ? "text-success" : "text-muted-foreground"}`}>{trend}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default Dashboard;
