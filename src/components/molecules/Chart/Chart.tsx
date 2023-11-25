import { FC, memo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartProps {
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

export const Chart: FC<ChartProps> = memo(({ chartData }) => (
  <Bar className="mb-8 bt-2" data={chartData} />
));
