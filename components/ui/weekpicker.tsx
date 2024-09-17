import { useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown } from 'lucide-react';

interface DatePickerProps {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function WeekPicker({ date, setDate }: DatePickerProps) {
	const datePickerRef = useRef<DatePicker | null>(null);
	const handleDivClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

	return (
		<>
			<div className="z-50 w-full justify-between rounded-md border border-muted-foreground cursor-pointer flex" onClick={handleDivClick}>
                <DatePicker
                    ref={datePickerRef}
                    selected={date}
                    onChange={(date) => setDate(date || undefined)}
                    dateFormat="I/R"
                    locale="en-GB"
                    className="w-full  text-left m-2 p-0 font-normal border-none"
                    showWeekNumbers
                    showWeekPicker
                    placeholderText="Minggu"
					popperPlacement="bottom-end"
					popperClassName='rasta-stripes'		
                />
				<ChevronDown className="h-4 w-4 m-3 opacity-50" />
			</div>
		</>
	);
}