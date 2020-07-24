import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.div`
  height: 200px;
  width: 200px;
  background: #3f51b5;
  padding: 10px;
  margin: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 0 2px 4px grey;
`;

const Title = styled.h4`
  color: white;
  text-decoration: none;
`;

const BoardThumbnail = ({ title }) => {
  return (
    <Thumbnail>
      <Title>{title}</Title>
    </Thumbnail>
  );
};

export default BoardThumbnail;
