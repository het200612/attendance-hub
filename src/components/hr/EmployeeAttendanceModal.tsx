import { format } from "date-fns";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/attendance/StatusBadge";
import { AttendanceRecord } from "@/types/attendance";
import { Employee } from "@/types/employee";

interface EmployeeAttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  employee: Employee | null;
  records: AttendanceRecord[];
}

export function EmployeeAttendanceModal({
  isOpen,
  onClose,
  employee,
  records,
}: EmployeeAttendanceModalProps) {
  if (!employee) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div>
              <span className="text-xl">{employee.name}</span>
              <p className="text-sm font-normal text-muted-foreground mt-1">
                {employee.id} • {employee.department} • {employee.position}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] mt-4">
          <div className="space-y-3">
            {records.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No attendance records found
              </p>
            ) : (
              records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50"
                >
                  <div>
                    <p className="font-medium">
                      {format(new Date(record.date), "EEEE, MMM d, yyyy")}
                    </p>
                    <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                      <span>In: {record.checkIn || "-"}</span>
                      <span>Out: {record.checkOut || "-"}</span>
                      <span>
                        Hours: {record.workingHours ? `${record.workingHours}h` : "-"}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={record.status} />
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
