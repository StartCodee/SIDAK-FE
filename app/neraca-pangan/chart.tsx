'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const chartConfig = {
	neraca: {
		label: 'Neraca Pangan',
		color: '#40A0FC', // Changed color for neraca pangan
	},
	kebutuhan: {
		label: 'Kebutuhan',
		color: '#50E7A6', // Changed color for kebutuhan
	},
	ketersediaan: {
		label: 'Ketersediaan',
		color: '#FEBC4B', // Changed color for ketersediaan
	},
} satisfies ChartConfig;

interface MapProps {
	cardContents: any[];
}

export default function Chart({ cardContents }: MapProps) {
	return (
		<>
			<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
				<BarChart accessibilityLayer data={cardContents}>
					<CartesianGrid vertical={false} />
					<XAxis
						dataKey="city"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => {
							const words = value.split(' ');
							return words.length > 1 ? words[1] : '';
						}}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<ChartLegend content={<ChartLegendContent />} />
					<Bar
						dataKey="neraca"
						fill="var(--color-neraca)"
						radius={4}
					/>
					<Bar dataKey="kebutuhan" fill="var(--color-kebutuhan)" radius={4} />
					<Bar
						dataKey="ketersediaan"
						fill="var(--color-ketersediaan)"
						radius={4}
					/>
				</BarChart>
			</ChartContainer>
		</>
	);
}
