import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { memo } from 'react';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface Chart {
  chartData: ChartData;
}

interface ChartData {
  datasets: Dataset[];
}

interface Dataset {
  label: string;
  data: string[];
  borderWidth: number;
  backgroundColor: string[];
}

function Chart({ chartData }: Chart) {
  return (
    <>
      <Bar
        className="mb-8 bt-2"
        data={chartData}
        options={{
          title: { display: true, text: 'Category', fontSize: 20 },
          legend: { display: true, position: 'right' },
        }}
      />
    </>
  );
}

export default memo(Chart);
