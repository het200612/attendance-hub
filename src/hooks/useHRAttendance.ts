import { useState, useCallback, useMemo } from "react";
import { Employee, EmployeeAttendance } from "@/types/employee";
import { AttendanceRecord, AttendanceStatus } from "@/types/attendance";

// Mock employees data
const MOCK_EMPLOYEES: Employee[] = [
  { id: "EMP-001", name: "John Doe", email: "john@company.com", department: "Engineering", position: "Software Developer" },
  { id: "EMP-002", name: "Jane Smith", email: "jane@company.com", department: "Engineering", position: "Senior Developer" },
  { id: "EMP-003", name: "Mike Johnson", email: "mike@company.com", department: "Design", position: "UI/UX Designer" },
  { id: "EMP-004", name: "Sarah Williams", email: "sarah@company.com", department: "Marketing", position: "Marketing Manager" },
  { id: "EMP-005", name: "David Brown", email: "david@company.com", department: "Engineering", position: "DevOps Engineer" },
  { id: "EMP-006", name: "Emily Davis", email: "emily@company.com", department: "HR", position: "HR Specialist" },
  { id: "EMP-007", name: "Robert Wilson", email: "robert@company.com", department: "Finance", position: "Accountant" },
  { id: "EMP-008", name: "Lisa Anderson", email: "lisa@company.com", department: "Design", position: "Graphic Designer" },
];

// Generate mock attendance for all employees
const generateAllEmployeesAttendance = (): EmployeeAttendance[] => {
  const statuses: Array<'present' | 'absent' | 'half-day' | 'leave' | 'not-checked-in'> = [
    'present', 'present', 'present', 'present', 'half-day', 'leave', 'absent', 'not-checked-in'
  ];

  return MOCK_EMPLOYEES.map((employee) => {
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    
    let checkIn = null;
    let checkOut = null;
    let workingHours = null;

    if (status === 'present') {
      checkIn = "09:00 AM";
      checkOut = "06:00 PM";
      workingHours = 9;
    } else if (status === 'half-day') {
      checkIn = "09:00 AM";
      checkOut = "01:00 PM";
      workingHours = 4;
    } else if (status === 'not-checked-in') {
      checkIn = null;
      checkOut = null;
    }

    return {
      employee,
      todayStatus: status,
      checkIn,
      checkOut,
      workingHours,
    };
  });
};

// Generate historical attendance records for all employees
const generateHistoricalRecords = (): Record<string, AttendanceRecord[]> => {
  const allRecords: Record<string, AttendanceRecord[]> = {};
  const today = new Date();

  MOCK_EMPLOYEES.forEach((employee) => {
    const records: AttendanceRecord[] = [];
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      
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
        id: `${employee.id}-record-${i}`,
        date: date.toISOString().split("T")[0],
        checkIn,
        checkOut,
        status,
        workingHours,
      });
    }
    
    allRecords[employee.id] = records.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  });

  return allRecords;
};

export function useHRAttendance() {
  const [todayAttendance] = useState<EmployeeAttendance[]>(generateAllEmployeesAttendance);
  const [historicalRecords] = useState<Record<string, AttendanceRecord[]>>(generateHistoricalRecords);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");

  const departments = useMemo(() => {
    return ["all", ...new Set(MOCK_EMPLOYEES.map((emp) => emp.department))];
  }, []);

  const filteredAttendance = useMemo(() => {
    return todayAttendance.filter((item) => {
      const matchesSearch = item.employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.employee.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDepartment = departmentFilter === "all" || item.employee.department === departmentFilter;
      return matchesSearch && matchesDepartment;
    });
  }, [todayAttendance, searchQuery, departmentFilter]);

  const attendanceStats = useMemo(() => {
    const total = todayAttendance.length;
    const present = todayAttendance.filter((a) => a.todayStatus === 'present').length;
    const absent = todayAttendance.filter((a) => a.todayStatus === 'absent').length;
    const halfDay = todayAttendance.filter((a) => a.todayStatus === 'half-day').length;
    const onLeave = todayAttendance.filter((a) => a.todayStatus === 'leave').length;
    const notCheckedIn = todayAttendance.filter((a) => a.todayStatus === 'not-checked-in').length;

    return { total, present, absent, halfDay, onLeave, notCheckedIn };
  }, [todayAttendance]);

  const getEmployeeRecords = useCallback((employeeId: string) => {
    return historicalRecords[employeeId] || [];
  }, [historicalRecords]);

  return {
    todayAttendance: filteredAttendance,
    allEmployees: MOCK_EMPLOYEES,
    departments,
    selectedDate,
    setSelectedDate,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    attendanceStats,
    getEmployeeRecords,
  };
}
