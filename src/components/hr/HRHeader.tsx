import { format } from "date-fns";
import { Users, CalendarDays } from "lucide-react";

export function HRHeader() {
  const today = new Date();

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                HR Attendance Management
              </h1>
              <p className="text-sm text-muted-foreground">
                View and manage all employee attendance
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{format(today, "EEEE, MMMM d, yyyy")}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
