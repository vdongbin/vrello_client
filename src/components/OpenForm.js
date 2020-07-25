import React from 'react';
import Icon from '@material-ui/core/Icon';
import styled from 'styled-components';

const OpenFormButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  height: 36px;
  margin-left: 8px;
  width: 275px;
  padding-left: 10px;
  padding-right: 10px;
  opacity: 0.5;
  color: black;
  background-color: rgba(0, 0, 0, 0.15);
`;

const OpenForm = ({ children, onClick }) => {
  return (
    <OpenFormButton onClick={onClick}>
      <Icon>add</Icon>
      <p style={{ flexShrink: 0 }}>{children}</p>
    </OpenFormButton>
  );
};

export default OpenForm;
