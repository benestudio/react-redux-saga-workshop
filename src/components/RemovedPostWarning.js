import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import postPropType from '../utils';

const Button = styled.button`
  font-size: 0.8rem;
  padding: 8px;
  margin: auto 5px;
  border-radius: 5px;
  border: 0;
  background: #ffc773;

  ${({ cancel }) => cancel
    && css`
      background: #ffe3b9;
    `};
`;

const RemovedPostWarning = ({
  post, className, undo, cancel,
}) => (
  <div className={className}>
    Post by <b>{post.name}</b> is deleted. Undo changes?
    <Button onClick={undo}>Undo</Button>
    <Button onClick={cancel} cancel>
      Cancel
    </Button>
  </div>
);

RemovedPostWarning.propTypes = {
  post: postPropType,
  className: PropTypes.string.isRequired,
  undo: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

export default styled(RemovedPostWarning)`
  background: #ff9800;
  color: white;
  padding: 10px;
  font-size: 1rem;
  margin: 5px 50px 10px;
  border-radius: 5px;
`;
