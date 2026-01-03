import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TodayAttendance } from "@/types/attendance";
import { StatusBadge } from "./StatusBadge";

interface CheckInOutCardProps {
  todayAttendance: TodayAttendance;
  onCheckIn: () => void;
  onCheckOut: () => void;
  isLoading?: boolean;
}

export function CheckInOutCard({
  todayAttendance,
  onCheckIn,
  onCheckOut,
  isLoading,
}: CheckInOutCardProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Today's Attendance
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <motion.div
            key={currentTime.getSeconds()}
            initial={{ opacity: 0.5, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl font-bold text-foreground mb-1"
          >
            {formatTime(currentTime)}
          </motion.div>
          <p className="text-muted-foreground">{formatDate(currentTime)}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Check In</p>
            <p className="text-lg font-semibold">
              {todayAttendance.checkInTime || "--:--"}
            </p>
          </div>
          <div className="bg-secondary rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground mb-1">Check Out</p>
            <p className="text-lg font-semibold">
              {todayAttendance.checkOutTime || "--:--"}
            </p>
          </div>
        </div>

        {todayAttendance.status && (
          <div className="flex justify-center mb-6">
            <StatusBadge status={todayAttendance.status} />
          </div>
        )}

        <AnimatePresence mode="wait">
          {!todayAttendance.isCheckedIn ? (
            <motion.div
              key="check-in"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                onClick={onCheckIn}
                disabled={isLoading}
                className="w-full h-12 text-lg gap-2"
                size="lg"
              >
                <LogIn className="h-5 w-5" />
                Check In
              </Button>
            </motion.div>
          ) : !todayAttendance.checkOutTime ? (
            <motion.div
              key="check-out"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button
                onClick={onCheckOut}
                disabled={isLoading}
                variant="outline"
                className="w-full h-12 text-lg gap-2 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                size="lg"
              >
                <LogOut className="h-5 w-5" />
                Check Out
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="completed"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-success/10 text-success rounded-lg p-4 text-center font-medium"
            >
              ✓ Attendance completed for today
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
