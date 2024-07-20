'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';



const chartData = [
	{ city: 'Kota Palu', ketersediaan: 1000, kebutuhan: 800, neracaPangan: 200 },
	{
		city: 'Kabupaten Boul',
		ketersediaan: 900,
		kebutuhan: 700,
		neracaPangan: 200,
	},
	{
		city: 'Kabupaten Sigi',
		ketersediaan: 1100,
		kebutuhan: 950,
		neracaPangan: 150,
	},
	{
		city: 'Kabupaten Donggala',
		ketersediaan: 1200,
		kebutuhan: 1000,
		neracaPangan: 200,
	},
	{
		city: 'Kabupaten Morowali',
		ketersediaan: 800,
		kebutuhan: 600,
		neracaPangan: 200,
	},
	{
		city: 'Kabupaten Parigi Moutong',
		ketersediaan: 1050,
		kebutuhan: 850,
		neracaPangan: 200,
	},
	{
		city: 'Kabupaten Toli-Toli',
		ketersediaan: 1000,
		kebutuhan: 750,
		neracaPangan: 250,
	},
	{
		city: 'Kabupaten Poso',
		ketersediaan: 950,
		kebutuhan: 700,
		neracaPangan: 250,
	},
	{
		city: 'Kabupaten Banggai',
		ketersediaan: 850,
		kebutuhan: 600,
		neracaPangan: 250,
	},
	{
		city: 'Kabupaten Tojo Una-Una',
		ketersediaan: 980,
		kebutuhan: 780,
		neracaPangan: 200,
	},
	{
		city: 'Kabupaten Banggai Kepulauan',
		ketersediaan: 920,
		kebutuhan: 720,
		neracaPangan: 200,
	},
	{
		city: 'Kabupaten Banggai Kepulauan',
		ketersediaan: 930,
		kebutuhan: 730,
		neracaPangan: 200,
	},
];

const chartConfig = {
	neracaPangan: {
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


export function Chart() {
	return (
		<ChartContainer config={chartConfig} className="min-h-[200px] w-full">
			<BarChart accessibilityLayer data={chartData}>
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
					dataKey="neracaPangan"
					fill="var(--color-neracaPangan)"
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
	);
}
