import { useState } from "react";
import { motion } from "framer-motion";
import { HRHeader } from "@/components/hr/HRHeader";
import { AttendanceStatsCards } from "@/components/hr/AttendanceStatsCards";
import { AttendanceFilters } from "@/components/hr/AttendanceFilters";
import { EmployeeAttendanceTable } from "@/components/hr/EmployeeAttendanceTable";
import { EmployeeAttendanceModal } from "@/components/hr/EmployeeAttendanceModal";
import { useHRAttendance } from "@/hooks/useHRAttendance";

const HRAttendance = () => {
  const {
    todayAttendance,
    allEmployees,
    departments,
    searchQuery,
    setSearchQuery,
    departmentFilter,
    setDepartmentFilter,
    attendanceStats,
    getEmployeeRecords,
  } = useHRAttendance();

  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewEmployee = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEmployeeId(null);
  };

  const selectedEmployee = allEmployees.find((e) => e.id === selectedEmployeeId) || null;
  const selectedEmployeeRecords = selectedEmployeeId 
    ? getEmployeeRecords(selectedEmployeeId) 
    : [];

  return (
    <div className="min-h-screen bg-background">
      <HRHeader />

      <main className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <AttendanceStatsCards stats={attendanceStats} />

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <AttendanceFilters
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              departmentFilter={departmentFilter}
              onDepartmentChange={setDepartmentFilter}
              departments={departments}
            />
          </motion.div>

          {/* Employee Attendance Table */}
          <EmployeeAttendanceTable
            attendance={todayAttendance}
            onViewEmployee={handleViewEmployee}
          />
        </div>
      </main>

      {/* Employee Details Modal */}
      <EmployeeAttendanceModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        employee={selectedEmployee}
        records={selectedEmployeeRecords}
      />
    </div>
  );
};

export default HRAttendance;
