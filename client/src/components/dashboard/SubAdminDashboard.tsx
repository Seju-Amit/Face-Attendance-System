import { Camera, Calendar, CheckCircle, Users } from "lucide-react";
import StatCard from "./StatCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

// Mock data for the pie chart
const attendanceData = [
  { name: "Present", value: 125, color: "#8b5cf6" },
  { name: "Absent", value: 15, color: "#ef4444" },
  { name: "Late", value: 10, color: "#a855f7" },
];

const SubAdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Sub-Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Classes Today"
          value={8}
          icon={<Calendar className="h-5 w-5 text-primary" />}
          description="3 remaining"
        />
        <StatCard
          title="Students Present"
          value="125"
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          description="Out of 150 students"
        />
        <StatCard
          title="Attendance Rate"
          value="83.3%"
          icon={<Users className="h-5 w-5 text-primary" />}
          trend={2}
          trendDirection="up"
        />
        <Card className="stats-card border bg-primary text-primary-foreground card-hover">
          <div className="flex flex-col items-center justify-center h-full">
            <Camera className="h-8 w-8 mb-2" />
            <h3 className="text-xl font-semibold mb-1">Take Attendance</h3>
            <Button variant="secondary" size="sm" className="mt-2">
              Open Camera
            </Button>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Today's Attendance</CardTitle>
            <CardDescription>
              Class: Advanced Computer Science (10:00 AM)
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={attendanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {attendanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value} Students`, ""]}
                    contentStyle={{
                      backgroundColor: "var(--card)",
                      borderColor: "var(--border)",
                      borderRadius: "var(--radius)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "11:32 AM", action: "Attendance marked for Web Development class" },
                { time: "10:15 AM", action: "Student ID #1234 marked as late" },
                { time: "09:45 AM", action: "Attendance report generated for CS101" },
                { time: "09:00 AM", action: "Started attendance for Advanced Computer Science" },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 border-b border-border last:border-0 pb-3 last:pb-0"
                >
                  <div className="min-w-[80px] text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                  <div className="text-sm">{activity.action}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SubAdminDashboard;
