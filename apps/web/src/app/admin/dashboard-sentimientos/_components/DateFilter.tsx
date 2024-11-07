interface DateFilterProps {
  dateRange: { start: Date | null; end: Date | null };
  setDateRange: (range: { start: Date | null; end: Date | null }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="space-y-4">
      <label className="block font-medium">Fecha</label>
      <input type="date" onChange={(e) => setDateRange({ ...dateRange, start: new Date(e.target.value) })} className="border rounded p-2 w-full" />
      <input type="date" onChange={(e) => setDateRange({ ...dateRange, end: new Date(e.target.value) })} className="border rounded p-2 w-full" />
    </div>
  );
};

export default DateFilter;
