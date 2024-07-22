import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ChevronDown } from 'lucide-react';

interface DatePickerProps {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export default function MonthPicker({ date, setDate }: DatePickerProps) {
	return (
		<>
			<div className="flex items-start">
				<DatePicker
					selected={date}
					onChange={(date) => date && setDate(date)}
					dateFormat="MM/yyyy"
					showMonthYearPicker
					className="w-[100px] justify-between text-left mt-2 p-0 m-0 font-normal border-none"
					showFullMonthYearPicker
					placeholderText="Bulan"
					popperPlacement="bottom-end"
				/>
				<ChevronDown className="h-4 w-4 mt-3 opacity-50" />
			</div>
		</>
	);
}