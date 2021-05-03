import React from 'react';

const Metrics = ({cpuLoad, highLoads, normalLoads}) => {
	const timeFragment = (times) => {
		return times.map((item) => {
			return (
				<li>
					<div>Time</div>
					<div>{item.time}</div>
				</li>
			)
		});
	};

	const highLoadTimes = timeFragment(highLoads);
	const normalLoadTimes = timeFragment(normalLoads);

  return (
    <div>
      <div>Current average CPU load: {cpuLoad}</div>
      <div>Number of Heavy Load Flags: {highLoads.length}</div>
			<div>Heavy Load Times</div>
			<ul>{ highLoadTimes }</ul>
      <div>Number of Heavy Load Recoveries: {normalLoads.length}</div>
			<div>Heavy Load Recovery Times</div>
			<ul>{ normalLoadTimes }</ul>
    </div>
  )
}

export default Metrics;
