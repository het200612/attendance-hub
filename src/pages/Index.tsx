import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AttendanceHeader } from "@/components/attendance/AttendanceHeader";
import { CheckInOutCard } from "@/components/attendance/CheckInOutCard";
import { DailyView } from "@/components/attendance/DailyView";
import { WeeklyView } from "@/components/attendance/WeeklyView";
import { useAttendance } from "@/hooks/useAttendance";

// Mock employee data - in production, this would come from auth context
const MOCK_EMPLOYEE = {
  name: "John Doe",
  id: "EMP-2024-001",
};

const Index = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const {
    records,
    todayAttendance,
    isLoading,
    checkIn,
    checkOut,
    weeklyRecords,
    weekStart,
  } = useAttendance();

  return (
    <div className="min-h-screen bg-background">
      <AttendanceHeader
        employeeName={MOCK_EMPLOYEE.name}
        employeeId={MOCK_EMPLOYEE.id}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Check In/Out Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-1"
          >
            <CheckInOutCard
              todayAttendance={todayAttendance}
              onCheckIn={checkIn}
              onCheckOut={checkOut}
              isLoading={isLoading}
            />
          </motion.div>

          {/* Attendance Views */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="daily">Daily View</TabsTrigger>
                <TabsTrigger value="weekly">Weekly View</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="mt-0">
                <DailyView records={records.slice(0, 10)} />
              </TabsContent>

              <TabsContent value="weekly" className="mt-0">
                <WeeklyView records={weeklyRecords} weekStart={weekStart} />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
