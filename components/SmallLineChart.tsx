import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SmallLineChart = ({ data } : any) => {
    const labels = data.map((_ : any, index : any) => `Day ${index + 1}`);
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Last 7 Days Prices',
                data: data,
                fill: false,
                borderColor: '#76bf70',
                tension: 0.1,
                pointRadius: 2,  // Smaller point radius
                pointHoverRadius: 3,  // Smaller point radius on hover
            },
        ],
    };

    const options = {
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        elements: {
            point: {
                radius: 2,  // Even smaller point radius
            }
        }
    };

    return (
        <div style={{ width: '40px', height: '25px' }}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default SmallLineChart;
