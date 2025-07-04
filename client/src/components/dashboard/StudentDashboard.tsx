import { Calendar, CheckCircle, Clock, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import StatCard from "./StatCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Mock data for the attendance chart
const attendanceData = [
  { name: "Week 1", attendance: 80 },
  { name: "Week 2", attendance: 100 },
  { name: "Week 3", attendance: 85 },
  { name: "Week 4", attendance: 95 },
  { name: "Week 5", attendance: 90 },
  { name: "Week 6", attendance: 100 },
];

const StudentDashboard = () => {
  const { user } = useAuth();
  
  // Mock attendance stats
  const attendanceRate = 90;
  const totalClasses = 120;
  const attendedClasses = 108;
  const lateArrivals = 6;
  const absences = totalClasses - attendedClasses;

  // Get user initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold">Student Dashboard</h1>
      
      <Card className="overflow-hidden card-hover">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <Avatar className="h-24 w-24 border-2 border-primary">
              <AvatarImage 
                src={user?.avatar} 
                alt={user?.name || "Student"} 
              />
              <AvatarFallback className="text-2xl">
                {user?.name ? getInitials(user.name) : "S"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-semibold">{user?.name}</h2>
              <p className="text-muted-foreground">Student ID: STU-{user?.id}</p>
              
              <div className="mt-4 flex flex-col md:max-w-md">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Attendance Rate</span>
                  <span className="text-sm font-medium">{attendanceRate}%</span>
                </div>
                <Progress value={attendanceRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  Attended {attendedClasses} out of {totalClasses} classes
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          title="Classes Attended"
          value={attendedClasses}
          icon={<CheckCircle className="h-5 w-5 text-primary" />}
          description={`Out of ${totalClasses} classes`}
        />
        <StatCard
          title="Late Arrivals"
          value={lateArrivals}
          icon={<Clock className="h-5 w-5 text-purple-400" />}
          description="Consider improving punctuality"
        />
        <StatCard
          title="Absences"
          value={absences}
          icon={<X className="h-5 w-5 text-red-500" />}
          description={`${Math.round((absences/totalClasses)*100)}% of total classes`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Attendance Trend</CardTitle>
            <CardDescription>Last 6 weeks</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
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
                <YAxis domain={[0, 100]} />
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
                  stroke="#8b5cf6"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle>Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "10:00 AM", class: "Advanced Data Structures", room: "Room 302" },
                { time: "01:30 PM", class: "Web Development", room: "Lab 201" },
                { time: "03:15 PM", class: "Computer Networks", room: "Room 105" },
                { time: "05:00 PM", class: "Machine Learning", room: "Lab 405" },
              ].map((cls, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 border-b border-border last:border-0 pb-3 last:pb-0"
                >
                  <div className="bg-secondary rounded-md p-2 h-12 w-12 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{cls.class}</h4>
                    <div className="flex text-sm text-muted-foreground">
                      <span>{cls.time}</span>
                      <span className="mx-2">•</span>
                      <span>{cls.room}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
