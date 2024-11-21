import { DateRange as OwnDateRange } from "@web/types";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@repo/ui/components/popover";
import { cn } from "@repo/ui/lib/utils";

function FechasFilters({
  dateRange,
  setDateRange,
}: {
  dateRange: OwnDateRange;
  setDateRange: (range: OwnDateRange) => void;
}) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: dateRange.start,
    to: dateRange.end,
  });

  useEffect(() => {
    if (date?.from && date?.to) {
      setDateRange({
        start: date.from,
        end: date.to,
      });
    }
  }, [date, setDateRange]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          id="date"
          variant={"outline"}
          className={cn("w-[250px] justify-start text-left font-normal", !date && "text-muted-foreground")}
        >
          <CalendarIcon />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, "dd/MM/yyyy")} - {format(date.to, "dd/MM/yyyy")}
              </>
            ) : (
              format(date.from, "dd/MM/yyyy")
            )
          ) : (
            <span>Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={date?.from}
          selected={date}
          onSelect={setDate}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}

export default FechasFilters;
