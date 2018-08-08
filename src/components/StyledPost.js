import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const StyledPost = ({ children, className }) => <div className={className}>{children}</div>;

StyledPost.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  className: PropTypes.string.isRequired,
};

export default styled(StyledPost)`
  background: lightgray;
  border: 2px solid black;
  border-radius: 5px;
  padding: 10px;

  ${({ removed }) => removed
    && css`
      border: 2px solid red;
    `};
`;
