// /packages/ui/src/components/date-time-picker.tsx
"use client";

import * as React from "react";
import { format, parseISO, isValid, parse } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@repo/ui/lib/utils";
import { Button } from "@repo/ui/components/button";
import { Calendar } from "@repo/ui/components/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/popover";
import { TimePicker } from "./time-picker"; // Asegúrate de que la ruta sea correcta
import { es } from "date-fns/locale";

interface DateTimePickerProps {
  date: string; // Fecha en formato ISO 8601
  setDate: (date: string) => void;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
}

const parseLocalDateTime = (dateTimeString: string): Date | undefined => {
  if (!dateTimeString) return undefined;

  try {
    // Parsear la fecha directamente como ISO 8601
    const parsedDate = parseISO(dateTimeString);
    if (isValid(parsedDate)) {
      return parsedDate;
    }
    // Si no es válido, intentar con un formato personalizado
    const customParsedDate = parse(dateTimeString, "yyyy-MM-dd HH:mm:ss", new Date());
    return isValid(customParsedDate) ? customParsedDate : undefined;
  } catch (error) {
    console.error("Error al parsear la fecha:", error);
    return undefined;
  }
};

const formatLocalDateTime = (date: Date): string => {
  return format(date, "yyyy-MM-dd HH:mm:ss");
};

export function DateTimePicker({
  date,
  setDate,
  label,
  disabled = false,
  placeholder = "Seleccionar fecha y hora",
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date ? parseLocalDateTime(date) : undefined
  );

  /**
   * Maneja la selección de una nueva fecha desde el calendario.
   * Preserva la hora existente si está disponible.
   */
  const handleDateSelect = (newDay: Date | undefined) => {
    if (!newDay) return;
    if (!selectedDate) {
      setSelectedDate(newDay);
      setDate(formatLocalDateTime(newDay));
      return;
    }
    const updatedDate = new Date(
      newDay.getFullYear(),
      newDay.getMonth(),
      newDay.getDate(),
      selectedDate.getHours(),
      selectedDate.getMinutes(),
      selectedDate.getSeconds()
    );
    setSelectedDate(updatedDate);
    setDate(formatLocalDateTime(updatedDate));
  };

  /**
   * Maneja la actualización de la hora desde el selector de tiempo.
   */
  const handleTimeChange = (updatedDate: Date | undefined) => {
    if (!updatedDate) return;
    setSelectedDate(updatedDate);
    setDate(formatLocalDateTime(updatedDate));
  };

  // Actualizar `selectedDate` cuando la prop `date` cambia
  React.useEffect(() => {
    if (date) {
      const newDate = parseLocalDateTime(date);
      if (isValid(newDate)) {
        setSelectedDate(newDate);
      } else {
        console.error("Fecha inválida:", date);
        setSelectedDate(undefined);
      }
    } else {
      setSelectedDate(undefined);
    }
  }, [date]);

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium">{label}</label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            disabled={disabled}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !selectedDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {selectedDate && isValid(selectedDate)
              ? format(selectedDate, "PPP HH:mm:ss", { locale: es })
              : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="flex flex-col">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              initialFocus
            />
            <div className="p-3 border-t border-border">
              <TimePicker setDate={handleTimeChange} date={selectedDate} />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default DateTimePicker;