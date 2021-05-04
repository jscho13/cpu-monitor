import React from 'react';
import styled from 'styled-components';

const SystemStatus = ({isHighLoad}) => {
  return (
    <CpuText>CPU Status&nbsp;
      { isHighLoad ? (
        <CpuStatus isHighLoad={isHighLoad}>HIGH LOAD</CpuStatus>
      ) : (
        <CpuStatus isHighLoad={isHighLoad}>OK</CpuStatus>
      ) }
    </CpuText>
  )
}

const CpuText = styled.h1``;

const CpuStatus = styled.span`
  color: ${props => props.isHighLoad ? '#eb364b' : '#41c464' };
`;

export default SystemStatus;
