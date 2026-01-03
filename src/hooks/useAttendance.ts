import { useState, useCallback } from "react";
import { AttendanceRecord, TodayAttendance, AttendanceStatus } from "@/types/attendance";

// Mock data for demonstration - replace with actual API calls
const generateMockRecords = (): AttendanceRecord[] => {
  const records: AttendanceRecord[] = [];
  const today = new Date();
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Skip weekends
    if (date.getDay() === 0 || date.getDay() === 6) continue;
    
    const statuses: AttendanceStatus[] = ["present", "present", "present", "half-day", "leave", "absent"];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let checkIn = null;
    let checkOut = null;
    let workingHours = null;
    
    if (status === "present") {
      checkIn = "09:00 AM";
      checkOut = "06:00 PM";
      workingHours = 9;
    } else if (status === "half-day") {
      checkIn = "09:00 AM";
      checkOut = "01:00 PM";
      workingHours = 4;
    }
    
    records.push({
      id: `record-${i}`,
      date: date.toISOString().split("T")[0],
      checkIn,
      checkOut,
      status,
      workingHours,
    });
  }
  
  return records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(generateMockRecords);
  const [isLoading, setIsLoading] = useState(false);
  
  const [todayAttendance, setTodayAttendance] = useState<TodayAttendance>({
    isCheckedIn: false,
    checkInTime: null,
    checkOutTime: null,
    status: null,
  });

  const formatCurrentTime = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const checkIn = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const checkInTime = formatCurrentTime();
    setTodayAttendance({
      isCheckedIn: true,
      checkInTime,
      checkOutTime: null,
      status: "present",
    });
    setIsLoading(false);
  }, []);

  const checkOut = useCallback(async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    
    const checkOutTime = formatCurrentTime();
    const checkInHour = parseInt(todayAttendance.checkInTime?.split(":")[0] || "9");
    const checkOutHour = new Date().getHours();
    const workingHours = checkOutHour - checkInHour;
    
    const status: AttendanceStatus = workingHours >= 6 ? "present" : "half-day";
    
    setTodayAttendance((prev) => ({
      ...prev,
      checkOutTime,
      status,
    }));
    
    // Add to records
    const newRecord: AttendanceRecord = {
      id: `record-${Date.now()}`,
      date: new Date().toISOString().split("T")[0],
      checkIn: todayAttendance.checkInTime,
      checkOut: checkOutTime,
      status,
      workingHours,
    };
    
    setRecords((prev) => [newRecord, ...prev]);
    setIsLoading(false);
  }, [todayAttendance.checkInTime]);

  const getWeekStart = () => {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(today.setDate(diff));
  };

  const getWeeklyRecords = useCallback(() => {
    const weekStart = getWeekStart();
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    return records.filter((record) => {
      const recordDate = new Date(record.date);
      return recordDate >= weekStart && recordDate <= weekEnd;
    });
  }, [records]);

  return {
    records,
    todayAttendance,
    isLoading,
    checkIn,
    checkOut,
    weeklyRecords: getWeeklyRecords(),
    weekStart: getWeekStart(),
  };
}
