import React from 'react';
import styled from 'styled-components';
import UIButton from '@material-ui/core/Button';

const StyledButton = styled(UIButton)`
  && {
    color: white;
    background: #3f51b5;
  }
`;

const Button = ({ children, onClick }) => {
  return (
    <StyledButton variant="contained" onMouseDown={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;
