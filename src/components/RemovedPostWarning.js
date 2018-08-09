import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import postPropType from '../utils';
import TimeSpinner from './TimeSpinner';

const Button = styled.button`
  font-size: 0.8rem;
  padding: 8px;
  margin: auto 5px;
  border-radius: 5px;
  border: 0;
  background: #ffc773;
  cursor: pointer;
  ${({ cancel }) => cancel
    && css`
      background: #ffe3b9;
    `};
`;

const RemovedPostWarning = ({
  post, className, confirmDelete, cancelDelete, remainingSeconds,
}) => (
  <div className={className}>
    Post by <b>{post.name}</b> is about to be deleted. Are you sure?
    <Button onClick={confirmDelete}>Delete</Button>
    <Button onClick={cancelDelete} cancel>
      Cancel
    </Button>
    <TimeSpinner remainingSeconds={remainingSeconds} />
  </div>
);

RemovedPostWarning.propTypes = {
  post: postPropType,
  className: PropTypes.string.isRequired,
  confirmDelete: PropTypes.func.isRequired,
  cancelDelete: PropTypes.func.isRequired,
  remainingSeconds: PropTypes.number,
};

const StyledWarning = styled(RemovedPostWarning)`
  background: #ff9800;
  color: white;
  padding: 10px;
  font-size: 1rem;
  margin: 5px 50px 10px;
  border-radius: 5px;
`;

const mapStateToProps = ({ remainingSeconds }) => ({ remainingSeconds });

export default connect(
  mapStateToProps,
  null,
)(StyledWarning);
