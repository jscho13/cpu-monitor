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
  Legend,
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
				width={500}
				height={300}
				data={chartData}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<XAxis dataKey="time" />
				<YAxis />
				<Tooltip />
				<Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
				<ReferenceLine y={1} stroke="#FFFFFF" />
				<Brush dataKey="time" height={30} stroke="#8884d8" />
				<Bar dataKey="cpuLoad" />
				{ chartData.map((entry, index) => {
						const fillColor = entry.cpuLoad >= 0.15 ? "#ff0000" : "#8884d8";
						return <Cell key={`cell-${index}`} fill={fillColor} />;
					})
				}
			</BarChart>
		</ResponsiveContainer>
	);
}


export default Chart;
