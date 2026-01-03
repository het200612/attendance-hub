import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EmployeeAttendance } from "@/types/employee";

interface EmployeeAttendanceTableProps {
  attendance: EmployeeAttendance[];
  onViewEmployee: (employeeId: string) => void;
}

const getStatusBadge = (status: EmployeeAttendance['todayStatus']) => {
  const statusConfig = {
    present: { label: "Present", className: "bg-success/10 text-success border-success/20" },
    absent: { label: "Absent", className: "bg-destructive/10 text-destructive border-destructive/20" },
    "half-day": { label: "Half Day", className: "bg-warning/10 text-warning border-warning/20" },
    leave: { label: "On Leave", className: "bg-leave/10 text-leave border-leave/20" },
    "not-checked-in": { label: "Not Checked In", className: "bg-muted text-muted-foreground border-muted" },
  };

  const config = statusConfig[status];
  return (
    <Badge variant="outline" className={config.className}>
      {config.label}
    </Badge>
  );
};

export function EmployeeAttendanceTable({ attendance, onViewEmployee }: EmployeeAttendanceTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Attendance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Employee ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Check In</TableHead>
                  <TableHead>Check Out</TableHead>
                  <TableHead>Working Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                      No employees found
                    </TableCell>
                  </TableRow>
                ) : (
                  attendance.map((item, index) => (
                    <motion.tr
                      key={item.employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">{item.employee.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.employee.name}</p>
                          <p className="text-xs text-muted-foreground">{item.employee.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.employee.department}</TableCell>
                      <TableCell>{item.checkIn || "-"}</TableCell>
                      <TableCell>{item.checkOut || "-"}</TableCell>
                      <TableCell>
                        {item.workingHours ? `${item.workingHours}h` : "-"}
                      </TableCell>
                      <TableCell>{getStatusBadge(item.todayStatus)}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onViewEmployee(item.employee.id)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
