'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ChevronDown } from 'lucide-react';

interface DatePickerProps {
	date: Date | undefined;
	setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

export function DatePicker({ date, setDate }: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					className={cn(
						'w-[100px] justify-between text-left p-0 m-0 font-normal border-none',
						!date && 'text-black',
					)}>
					{date ? format(date, 'MMMM yyyy') : <span>Bulan</span>}
					<ChevronDown className="h-4 w-4 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent align="start" className=" w-auto p-0">
				<Calendar
					mode="single"
					captionLayout="dropdown-buttons"
					selected={date}
					onSelect={(selected : any) =>
						setDate(selected ? new Date(selected) : undefined)
					}
					fromYear={1960}
					toYear={2030}
				/>
			</PopoverContent>
		</Popover>
	);
}
