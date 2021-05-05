import React from 'react';
import {
  BarChart,
  Bar,
  Brush,
  Cell,
  ReferenceLine,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const Chart = ({ loadHistory }) => {
  const chartData = loadHistory.map((l, idx) => {
    return {
      time: idx*10,
      cpuLoad: l
    }
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="time" />
        <YAxis type="number" domain={[0, 2]} />
        <Tooltip />
        <ReferenceLine y={1} stroke="#FFFFFF" />
        <Brush dataKey="time" height={30} stroke="#632ca6" />
        <Bar dataKey="cpuLoad">
        { chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.cpuLoad >= 1 ? '#eb364b' : '#41c464' }/>
          ))
        }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
