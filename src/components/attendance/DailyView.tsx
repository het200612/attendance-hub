import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceRecord } from "@/types/attendance";
import { StatusBadge } from "./StatusBadge";

interface DailyViewProps {
  records: AttendanceRecord[];
}

export function DailyView({ records }: DailyViewProps) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const formatHours = (hours: number | null) => {
    if (hours === null) return "-";
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    return `${h}h ${m}m`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Daily Attendance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {records.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No attendance records found
            </p>
          ) : (
            records.map((record, index) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="text-center min-w-[80px]">
                    <p className="font-semibold">{formatDate(record.date)}</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>In: {record.checkIn || "-"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Out: {record.checkOut || "-"}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground hidden md:block">
                    {formatHours(record.workingHours)}
                  </span>
                  <StatusBadge status={record.status} />
                </div>
              </motion.div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
