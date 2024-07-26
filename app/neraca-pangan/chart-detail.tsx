'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { ChartConfig, ChartContainer } from '@/components/ui/chart';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ChartLegend, ChartLegendContent } from '@/components/ui/chart';

const chartConfig = {
	neraca: {
		label: 'Neraca Pangan',
		color: '#40A0FC',
	},
	kebutuhan: {
		label: 'Kebutuhan',
		color: '#50E7A6',
	},
	ketersediaan: {
		label: 'Ketersediaan',
		color: '#FEBC4B',
	},
} satisfies ChartConfig;

interface MapProps {
	type: 'bulanan' | 'tahunan' | 'triwulan';
	data: any;
}

const processData = (data: any, type: any) => {
	const result = [];

	if (type === 'bulanan') {
		for (const period in data.bulanan) {
			const average_price_kebutuhan = parseFloat(data.bulanan[period]['kebutuhan']);
			const average_price_ketersediaan = parseFloat(data.bulanan[period]['ketersediaan']);
			const average_price_neraca = parseFloat(data.bulanan[period]['neraca']);

			result.push({
				periode: period,
				kebutuhan: average_price_kebutuhan, // Sesuaikan nilai kebutuhan
				ketersediaan: average_price_ketersediaan, // Sesuaikan nilai ketersediaan
				neraca: average_price_neraca, // Sesuaikan nilai neraca
			});
		}
	} else if (type === 'tahunan') {
		for (const period in data.tahunan) {
			const average_price_kebutuhan = parseFloat(data.bulanan[period]['kebutuhan']);
			const average_price_ketersediaan = parseFloat(data.bulanan[period]['ketersediaan']);
			const average_price_neraca = parseFloat(data.bulanan[period]['neraca']);

			result.push({
				periode: period,
				kebutuhan: average_price_kebutuhan, // Sesuaikan nilai kebutuhan
				ketersediaan: average_price_ketersediaan, // Sesuaikan nilai ketersediaan
				neraca: average_price_neraca, // Sesuaikan nilai neraca
			});
		}
	} else if (type === 'triwulan') {
		for (const period in data.triwulan) {
			const average_price_kebutuhan = parseFloat(data.bulanan[period]['kebutuhan']);
			const average_price_ketersediaan = parseFloat(data.bulanan[period]['ketersediaan']);
			const average_price_neraca = parseFloat(data.bulanan[period]['neraca']);

			result.push({
				periode: period,
				kebutuhan: average_price_kebutuhan, // Sesuaikan nilai kebutuhan
				ketersediaan: average_price_ketersediaan, // Sesuaikan nilai ketersediaan
				neraca: average_price_neraca, // Sesuaikan nilai neraca
			});
		}
	}

	return result;
};


export default function Chart({ type, data }: MapProps) {


	const processedData = processData(data, type);

	return (
		<>
			<ChartContainer config={chartConfig} className="w-full">
				<BarChart data={processedData} width={500} height={300}>
					<CartesianGrid vertical={false} />
					<XAxis dataKey="periode" tickLine={false} tickMargin={10} axisLine={false} />
					<YAxis />
					<Tooltip content={<ChartTooltipContent />} />
					<Legend content={<ChartLegendContent />} />
					<Bar dataKey="neraca" fill={chartConfig.neraca.color} radius={4} />
					<Bar dataKey="kebutuhan" fill={chartConfig.kebutuhan.color} radius={4} />
					<Bar dataKey="ketersediaan" fill={chartConfig.ketersediaan.color} radius={4} />
				</BarChart>
			</ChartContainer>
		</>
	);
}
