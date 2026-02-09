import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ArrowLeft, Calendar, TrendingUp, Clock, Target, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart,
  Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
} from "recharts";

// Mock data
const dailyData = [
  { time: "8 AM", score: 70, neck: 65, spine: 75, shoulders: 72 },
  { time: "9 AM", score: 78, neck: 72, spine: 80, shoulders: 80 },
  { time: "10 AM", score: 82, neck: 80, spine: 85, shoulders: 78 },
  { time: "11 AM", score: 68, neck: 55, spine: 72, shoulders: 74 },
  { time: "12 PM", score: 75, neck: 70, spine: 78, shoulders: 76 },
  { time: "1 PM", score: 85, neck: 82, spine: 88, shoulders: 84 },
  { time: "2 PM", score: 72, neck: 60, spine: 76, shoulders: 78 },
  { time: "3 PM", score: 80, neck: 75, spine: 82, shoulders: 82 },
  { time: "4 PM", score: 76, neck: 68, spine: 80, shoulders: 78 },
  { time: "5 PM", score: 88, neck: 85, spine: 90, shoulders: 86 },
];

const weeklyData = [
  { day: "Mon", score: 72, avgNeck: 68, avgSpine: 75, avgShoulders: 70, sessions: 3, duration: 6.2 },
  { day: "Tue", score: 78, avgNeck: 74, avgSpine: 80, avgShoulders: 78, sessions: 4, duration: 7.1 },
  { day: "Wed", score: 65, avgNeck: 58, avgSpine: 68, avgShoulders: 66, sessions: 2, duration: 4.5 },
  { day: "Thu", score: 80, avgNeck: 76, avgSpine: 82, avgShoulders: 80, sessions: 4, duration: 7.8 },
  { day: "Fri", score: 85, avgNeck: 82, avgSpine: 88, avgShoulders: 84, sessions: 5, duration: 8.0 },
  { day: "Sat", score: 76, avgNeck: 70, avgSpine: 78, avgShoulders: 78, sessions: 2, duration: 3.5 },
  { day: "Sun", score: 82, avgNeck: 78, avgSpine: 85, avgShoulders: 80, sessions: 3, duration: 5.2 },
];

const monthlyData = [
  { week: "Week 1", score: 68, improvement: 0 },
  { week: "Week 2", score: 72, improvement: 5.9 },
  { week: "Week 3", score: 75, improvement: 4.2 },
  { week: "Week 4", score: 80, improvement: 6.7 },
];

const radarData = [
  { metric: "Spine", current: 85, previous: 72 },
  { metric: "Neck", current: 78, previous: 65 },
  { metric: "Shoulders", current: 82, previous: 70 },
  { metric: "Head Pos.", current: 76, previous: 60 },
  { metric: "Balance", current: 80, previous: 68 },
];

const sessionLog = [
  { date: "Today", time: "8:00 AM – 12:30 PM", duration: "4h 30m", avgScore: 78, alerts: 5, status: "good" as const },
  { date: "Today", time: "1:15 PM – 5:00 PM", duration: "3h 45m", avgScore: 82, alerts: 3, status: "good" as const },
  { date: "Yesterday", time: "9:00 AM – 1:00 PM", duration: "4h 00m", avgScore: 71, alerts: 8, status: "fair" as const },
  { date: "Yesterday", time: "2:00 PM – 6:00 PM", duration: "4h 00m", avgScore: 85, alerts: 2, status: "good" as const },
  { date: "Feb 7", time: "8:30 AM – 12:00 PM", duration: "3h 30m", avgScore: 65, alerts: 12, status: "poor" as const },
  { date: "Feb 7", time: "1:00 PM – 4:30 PM", duration: "3h 30m", avgScore: 74, alerts: 6, status: "fair" as const },
  { date: "Feb 6", time: "9:00 AM – 5:00 PM", duration: "8h 00m", avgScore: 80, alerts: 7, status: "good" as const },
];

const tooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  fontSize: "12px",
};

const History = () => {
  const [tab, setTab] = useState("daily");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              <span className="font-bold text-foreground">PostureAI</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Posture History</h1>
          <p className="text-sm text-muted-foreground">Track your posture trends and improvement over time</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <SummaryCard icon={Target} label="Avg. Score This Week" value="77" change="+8%" positive />
          <SummaryCard icon={TrendingUp} label="Best Day" value="Friday" change="Score: 85" positive />
          <SummaryCard icon={Clock} label="Total Monitored" value="42h 15m" change="This week" />
          <SummaryCard icon={Award} label="Streak" value="5 days" change="Personal best!" positive />
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList>
            <TabsTrigger value="daily">Today</TabsTrigger>
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
          </TabsList>

          {/* Daily */}
          <TabsContent value="daily" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="shadow-soft lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-base">Today's Posture Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={dailyData}>
                      <defs>
                        <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--primary))" fill="url(#scoreGrad)" strokeWidth={2.5} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">Body Area Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="hsl(var(--border))" />
                      <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar name="Current" dataKey="current" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
                      <Radar name="Last Week" dataKey="previous" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.05} strokeWidth={1.5} strokeDasharray="4 4" />
                      <Tooltip contentStyle={tooltipStyle} />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Breakdown chart */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Detailed Metrics Throughout the Day</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="time" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="neck" stroke="hsl(var(--warning))" strokeWidth={2} dot={false} name="Neck" />
                    <Line type="monotone" dataKey="spine" stroke="hsl(var(--success))" strokeWidth={2} dot={false} name="Spine" />
                    <Line type="monotone" dataKey="shoulders" stroke="hsl(var(--info))" strokeWidth={2} dot={false} name="Shoulders" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 flex items-center justify-center gap-6">
                  <LegendDot color="hsl(var(--warning))" label="Neck" />
                  <LegendDot color="hsl(var(--success))" label="Spine" />
                  <LegendDot color="hsl(var(--info))" label="Shoulders" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Weekly */}
          <TabsContent value="weekly" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">Weekly Score Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={weeklyData} barSize={32}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="score" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">Session Duration (hours)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={weeklyData}>
                      <defs>
                        <linearGradient id="durationGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="duration" stroke="hsl(var(--info))" fill="url(#durationGrad)" strokeWidth={2.5} name="Hours" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Weekly breakdown */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-base">Average Metrics by Day</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                    <XAxis dataKey="day" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Line type="monotone" dataKey="avgNeck" stroke="hsl(var(--warning))" strokeWidth={2} name="Neck" />
                    <Line type="monotone" dataKey="avgSpine" stroke="hsl(var(--success))" strokeWidth={2} name="Spine" />
                    <Line type="monotone" dataKey="avgShoulders" stroke="hsl(var(--info))" strokeWidth={2} name="Shoulders" />
                  </LineChart>
                </ResponsiveContainer>
                <div className="mt-3 flex items-center justify-center gap-6">
                  <LegendDot color="hsl(var(--warning))" label="Neck" />
                  <LegendDot color="hsl(var(--success))" label="Spine" />
                  <LegendDot color="hsl(var(--info))" label="Shoulders" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Monthly */}
          <TabsContent value="monthly" className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">Monthly Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="monthGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Area type="monotone" dataKey="score" stroke="hsl(var(--success))" fill="url(#monthGrad)" strokeWidth={2.5} name="Score" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="text-base">Week-over-Week Improvement %</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={monthlyData} barSize={40}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} unit="%" />
                      <Tooltip contentStyle={tooltipStyle} />
                      <Bar dataKey="improvement" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} name="Improvement" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Session Log */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4 text-primary" />
                Session Log
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessionLog.map((s, i) => (
                  <div key={i} className="flex items-center gap-4 rounded-lg border border-border p-4">
                    <div className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                      s.status === "good" ? "bg-success" : s.status === "fair" ? "bg-warning" : "bg-destructive"
                    }`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{s.date} · {s.time}</p>
                      <p className="text-xs text-muted-foreground">Duration: {s.duration} · {s.alerts} alerts</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">{s.avgScore}</p>
                      <p className="text-xs text-muted-foreground">avg score</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

const SummaryCard = ({ icon: Icon, label, value, change, positive }: {
  icon: React.ElementType; label: string; value: string; change: string; positive?: boolean;
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
          <p className={`text-xs ${positive ? "text-success" : "text-muted-foreground"}`}>{change}</p>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const LegendDot = ({ color, label }: { color: string; label: string }) => (
  <div className="flex items-center gap-1.5">
    <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
    <span className="text-xs text-muted-foreground">{label}</span>
  </div>
);

export default History;
