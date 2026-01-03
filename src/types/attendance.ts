export type AttendanceStatus = 'present' | 'absent' | 'half-day' | 'leave';

export interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: AttendanceStatus;
  workingHours: number | null;
}

export interface TodayAttendance {
  isCheckedIn: boolean;
  checkInTime: string | null;
  checkOutTime: string | null;
  status: AttendanceStatus | null;
}
