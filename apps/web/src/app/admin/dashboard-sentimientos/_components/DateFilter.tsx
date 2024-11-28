interface DateFilterProps {
  dateRange: { start: Date | null; end: Date | null };
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ dateRange, setDateRange }) => {
  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
  };

  return (
    <div className="space-y-4">
      <label className="block font-medium">Fecha</label>
      <input
        type="date"
        value={formatDate(dateRange.start)}
        onChange={(e) => setDateRange({ ...dateRange, start: new Date(e.target.value) })}
        className="w-full rounded border p-2"
      />
      <input
        type="date"
        value={formatDate(dateRange.end)}
        onChange={(e) => setDateRange({ ...dateRange, end: new Date(e.target.value) })}
        className="w-full rounded border p-2"
      />
    </div>
  );
};

export default DateFilter;
