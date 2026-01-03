export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
}

export interface EmployeeAttendance {
  employee: Employee;
  todayStatus: 'present' | 'absent' | 'half-day' | 'leave' | 'not-checked-in';
  checkIn: string | null;
  checkOut: string | null;
  workingHours: number | null;
}
