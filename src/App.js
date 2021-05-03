import React, { useState, useEffect } from 'react';
import Chart from './components/Chart';
import Metrics from './components/Metrics';
import styled from 'styled-components';
// import { fetchVitals } from './utils/reportCpuVitals'

const initalState = () => {
  let initialTimes = [];
  for (let i=1; i<=60; i++) {
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
  const [normalLoadCounter, netNormalLoadCounter] = useState(0);
  const [normalLoads, setNormalLoads] = useState([]);

  useEffect(() => {
    const fetchLoad = () => {
      fetch('/load')
      .then(response => { return response.json() })
      .then(data => {
        const newLoad = loadHistory;
        newLoad.unshift(data.toFixed(4));
        newLoad.pop();
        setLoadHistory(newLoad);

        setCpuLoad(data);
      })
      .catch(err => { console.log(err) });
    }

    // Fetches cpu load on first render so we don't have an empty chart
    if (cpuLoad === -1) fetchLoad()

    const poll = setInterval(() => fetchLoad(), 5000);
    return () => clearInterval(poll);
  }, []);

  useEffect(() => {
    // should be 1, setting it to .2 for testing purposes
    const thresholdPassed = cpuLoad >= 0.2;
    // TODO: add a newLoadCounter to see if past normal threshold for 1 minute
    const newHLCount = thresholdPassed ? highLoadCounter+1 : 0;
    setHighLoadCounter(newHLCount);

    // should be 12, setting it to .2 for testing purposes
    if (newHLCount >= 3 && !isHighLoad) { 
      setIsHighLoad(true);
      setHighLoads([...highLoads, { time: new Date().toISOString()}]);
    } else if (newHLCount === 0 && isHighload) {
      setIsHighLoad(false);
      setNormalLoads([...normalLoads, { time: new Date().toISOString()}]);
    }
  }, [cpuLoad]);

  return (
    <AppContainer>
      <MetricsContainer> 
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
  flex: 35;
  margin: 20px;

  @media (max-width: 768px) {
    flex: 100;
  }
`;

const ChartContainer = styled.div`
  flex: 65;
  margin: 20px;

  @media (max-width: 768px) {
    flex: 100;
  }
`;

export default App;
