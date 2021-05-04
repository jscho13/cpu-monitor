import React, { useState, useEffect } from 'react';
import SystemStatus from './components/SystemStatus';
import Metrics from './components/Metrics';
import Chart from './components/Chart';
import styled from 'styled-components';

const initalState = () => {
  let initialTimes = [];
  for (let i=0; i<60; i++) {
    initialTimes.push(0); 
  }

  return initialTimes;
}

const App = () => {
  const [cpuLoad, setCpuLoad] = useState(-1);
  const [loadHistory, setLoadHistory] = useState(initalState());
  const [isHighLoad, setIsHighLoad] = useState(false);

  const [highLoadCounter, setHighLoadCounter] = useState(0);
  const [highLoads, setHighLoads] = useState([]);
  const [normalLoadCounter, setNormalLoadCounter] = useState(0);
  const [normalLoads, setNormalLoads] = useState([]);

  useEffect(() => {
    // To emulate high stress: https://cpux.net/cpu-stress-test-online
    // and set 15 threads at 50%
    const fetchLoad = () => {
      fetch('/load')
      .then(response => { return response.json() })
      .then(jsonData => {
        const data = jsonData.toFixed(4);
        const newHistory = loadHistory;
        newHistory.unshift(data);
        newHistory.pop();
        setLoadHistory(newHistory);

        setCpuLoad(data);
      })
      .catch(err => { console.log(err) });
    }

    // Fetches cpu load on first render so we don't have an empty chart
    if (cpuLoad === -1) fetchLoad();

    const poll = setInterval(() => fetchLoad(), 5000);
    return () => clearInterval(poll);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const thresholdPassed = cpuLoad >= 1;
    const currentTime = new Date().toLocaleString("en-US", {timeZone: "America/New_York"});

    const newHLCount = thresholdPassed ? highLoadCounter+1 : 0;
    setHighLoadCounter(newHLCount);
    // should be 12, setting it to 3 for testing purposes
    if (newHLCount >= 3 && !isHighLoad) { 
      setIsHighLoad(true);
      setHighLoads([...highLoads, { time: currentTime }]);
    }

    const newNLCount = !thresholdPassed ? normalLoadCounter+1 : 0;
    setNormalLoadCounter(newNLCount);
    if (newNLCount >= 3 && isHighLoad) {
      setIsHighLoad(false);
      setNormalLoads([...normalLoads, { time: currentTime }]);
    }
    // eslint-disable-next-line
  }, [cpuLoad]);

  return (
    <AppContainer>
      <MetricsContainer> 
        <SystemStatus isHighLoad={isHighLoad} />
        <Metrics
          cpuLoad={cpuLoad}
          highLoads={highLoads}
          normalLoads={normalLoads}
        />
      </MetricsContainer> 
      <ChartContainer> 
        <Chart loadHistory={loadHistory} />
      </ChartContainer> 
    </AppContainer>
  );
}

const AppContainer = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: row;
  justify-content: flex-start;
  color: white;
  background-color: #282c34;

  @media (max-width: 768px) {
    flex-flow: column;
  }
`;

const MetricsContainer = styled.div`
  flex: 40;
  margin: 20px;

  @media (max-width: 768px) {
    flex: 100;
  }
`;

const ChartContainer = styled.div`
  flex: 60;
  margin: 20px;

  @media (max-width: 768px) {
    flex: 100;
  }
`;

export default App;
