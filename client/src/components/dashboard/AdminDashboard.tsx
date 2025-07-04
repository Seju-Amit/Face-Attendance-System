import { Calendar, CheckCircle, Clock, Users } from "lucide-react";
import StatCard from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from "recharts";

// Mock data for charts
const attendanceData = [
  { name: "Mon", present: 120, absent: 20, late: 10 },
  { name: "Tue", present: 110, absent: 25, late: 15 },
  { name: "Wed", present: 125, absent: 15, late: 10 },
  { name: "Thu", present: 130, absent: 10, late: 10 },
  { name: "Fri", present: 100, absent: 35, late: 15 },
];

const trendData = [
  { name: "Week 1", attendance: 88 },
  { name: "Week 2", attendance: 92 },
  { name: "Week 3", attendance: 89 },
  { name: "Week 4", attendance: 94 },
];

const AdminDashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={758}
          icon={<Users className="h-5 w-5 text-primary" />}
          description="Total registered students"
        />
        <StatCard
          title="Today's Attendance"
          value="92%"
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          trend={5}
          trendDirection="up"
        />
        <StatCard
          title="Late Arrivals"
          value={24}
          icon={<Clock className="h-5 w-5 text-primary" />}
          trend={3}
          trendDirection="down"
        />
        <StatCard
          title="Upcoming Events"
          value={5}
          icon={<Calendar className="h-5 w-5 text-primary" />}
          description="Within next 7 days"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Weekly Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={attendanceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Bar dataKey="present" name="Present" fill="var(--present-color, #e11d48)" />
                <Bar dataKey="absent" name="Absent" fill="var(--absent-color, #dc2626)" />
                <Bar dataKey="late" name="Late" fill="var(--late-color, #9f1239)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={trendData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis domain={[80, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="attendance"
                  name="Attendance %"
                  stroke="var(--trend-color, #e11d48)"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
