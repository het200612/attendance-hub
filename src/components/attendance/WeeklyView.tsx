import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";
import { cn } from "@/lib/utils";

interface WeeklyViewProps {
  records: AttendanceRecord[];
  weekStart: Date;
}

const statusColors: Record<AttendanceStatus, string> = {
  present: "bg-success",
  absent: "bg-destructive",
  "half-day": "bg-warning",
  leave: "bg-leave",
};

export function WeeklyView({ records, weekStart }: WeeklyViewProps) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const getWeekDates = () => {
    const dates: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const getRecordForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0];
    return records.find((r) => r.date === dateStr);
  };

  const formatWeekRange = () => {
    const endDate = new Date(weekStart);
    endDate.setDate(weekStart.getDate() + 6);
    return `${weekStart.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${endDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}`;
  };

  const totalWorkingHours = records.reduce(
    (acc, r) => acc + (r.workingHours || 0),
    0
  );

  const presentDays = records.filter((r) => r.status === "present").length;
  const halfDays = records.filter((r) => r.status === "half-day").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Weekly Overview
          </div>
          <span className="text-sm font-normal text-muted-foreground">
            {formatWeekRange()}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Weekly Grid */}
        <div className="grid grid-cols-7 gap-2 mb-6">
          {days.map((day, index) => {
            const date = weekDates[index];
            const record = getRecordForDate(date);
            const isToday =
              date.toDateString() === new Date().toDateString();

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex flex-col items-center p-3 rounded-lg border transition-all",
                  isToday && "ring-2 ring-primary ring-offset-2",
                  record ? "bg-card" : "bg-secondary/30"
                )}
              >
                <span className="text-xs font-medium text-muted-foreground mb-1">
                  {day}
                </span>
                <span className="text-lg font-semibold mb-2">
                  {date.getDate()}
                </span>
                {record ? (
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full",
                      statusColors[record.status]
                    )}
                    title={record.status}
                  />
                ) : (
                  <div className="w-3 h-3 rounded-full bg-muted" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Weekly Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-success/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-success">{presentDays}</p>
            <p className="text-sm text-muted-foreground">Present Days</p>
          </div>
          <div className="bg-warning/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-warning">{halfDays}</p>
            <p className="text-sm text-muted-foreground">Half Days</p>
          </div>
          <div className="bg-primary/10 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {Math.round(totalWorkingHours)}h
            </p>
            <p className="text-sm text-muted-foreground">Total Hours</p>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-6 pt-4 border-t">
          {(["present", "absent", "half-day", "leave"] as const).map(
            (status) => (
              <div key={status} className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full", statusColors[status])} />
                <span className="text-sm capitalize text-muted-foreground">
                  {status}
                </span>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}
