import { User, Calendar } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface AttendanceHeaderProps {
  employeeName: string;
  employeeId: string;
}

export function AttendanceHeader({ employeeName, employeeId }: AttendanceHeaderProps) {
  const initials = employeeName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="bg-card border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarFallback className="bg-primary text-primary-foreground font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                {employeeName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Employee ID: {employeeId}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-5 w-5" />
            <span className="text-sm">Attendance Tracker</span>
          </div>
        </div>
      </div>
    </header>
  );
}
