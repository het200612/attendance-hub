import { motion } from "framer-motion";
import { Users, UserCheck, UserX, Clock, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AttendanceStats {
  total: number;
  present: number;
  absent: number;
  halfDay: number;
  onLeave: number;
  notCheckedIn: number;
}

interface AttendanceStatsCardsProps {
  stats: AttendanceStats;
}

export function AttendanceStatsCards({ stats }: AttendanceStatsCardsProps) {
  const statCards = [
    {
      title: "Total Employees",
      value: stats.total,
      icon: Users,
      color: "bg-primary/10 text-primary",
    },
    {
      title: "Present",
      value: stats.present,
      icon: UserCheck,
      color: "bg-success/10 text-success",
    },
    {
      title: "Absent",
      value: stats.absent,
      icon: UserX,
      color: "bg-destructive/10 text-destructive",
    },
    {
      title: "Half Day",
      value: stats.halfDay,
      icon: Clock,
      color: "bg-warning/10 text-warning",
    },
    {
      title: "On Leave",
      value: stats.onLeave,
      icon: Calendar,
      color: "bg-leave/10 text-leave",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {statCards.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="border-border/50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
