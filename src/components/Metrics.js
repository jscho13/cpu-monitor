import React from 'react';

const Metrics = ({cpuLoad, highLoads, normalLoads}) => {
	const timeFragment = (times) => {
		return times.map((item) => {
			return (
				<li>
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
      <hr />
      <div>Heavy Load Flags: {highLoads.length}</div>
			<div>Heavy Load Times</div>
			<ul>{ highLoadTimes }</ul>
      <hr />
      <div>Heavy Load Recoveries: {normalLoads.length}</div>
			<div>Heavy Load Recovery Times</div>
			<ul>{ normalLoadTimes }</ul>
    </div>
  )
}

export default Metrics;
