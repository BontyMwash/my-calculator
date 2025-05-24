import { ReactNode } from 'react';
import {
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface ChartProps {
  type: 'bar' | 'line';
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: (string | number)[];
      backgroundColor?: string;
      borderColor?: string;
      tension?: number;
      fill?: boolean;
      borderWidth?: number;
    }[];
  };
  options?: {
    responsive?: boolean;
    maintainAspectRatio?: boolean;
    indexAxis?: 'x' | 'y';
    scales?: {
      x?: {
        beginAtZero?: boolean;
        max?: number;
        title?: {
          display?: boolean;
          text?: string;
        };
      };
      y?: {
        beginAtZero?: boolean;
        max?: number;
        title?: {
          display?: boolean;
          text?: string;
        };
      };
    };
  };
}

export function Chart({ type, data, options }: ChartProps) {
  // Transform the data to the format recharts expects
  const chartData = data.labels.map((label, index) => {
    const dataPoint: { [key: string]: any } = { name: label };
    
    data.datasets.forEach((dataset) => {
      dataPoint[dataset.label] = dataset.data[index];
    });
    
    return dataPoint;
  });

  // Horizontal bar chart if specified in options
  const isHorizontal = options?.indexAxis === 'y';

  if (type === 'bar') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={chartData}
          layout={isHorizontal ? 'vertical' : 'horizontal'}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {isHorizontal ? (
            <>
              <YAxis dataKey="name" type="category" />
              <XAxis type="number" domain={[0, options?.scales?.x?.max || 'auto']} />
            </>
          ) : (
            <>
              <XAxis dataKey="name" />
              <YAxis domain={[0, options?.scales?.y?.max || 'auto']} />
            </>
          )}
          <Tooltip />
          <Legend />
          {data.datasets.map((dataset, i) => (
            <Bar
              key={i}
              dataKey={dataset.label}
              fill={dataset.backgroundColor || '#8884d8'}
              stroke={dataset.borderColor}
              strokeWidth={dataset.borderWidth}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  }

  if (type === 'line') {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={chartData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, options?.scales?.y?.max || 'auto']} />
          <Tooltip />
          <Legend />
          {data.datasets.map((dataset, i) => (
            <Line
              key={i}
              type="monotone"
              dataKey={dataset.label}
              stroke={dataset.borderColor || dataset.backgroundColor || '#8884d8'}
              fill={dataset.fill ? dataset.backgroundColor : undefined}
              strokeWidth={dataset.borderWidth || 2}
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }

  return null;
}