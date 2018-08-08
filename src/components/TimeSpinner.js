import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import styles from '../styles/TimeSpinner.css';
import { CANCEL_TIME } from '../utils';

const SVGCirlcle = styled.svg`
  position: absolute;
  top: -20px;
  left: -20px;
  width: 50px;
  height: 50px;
  transform: rotateY(-180deg) rotateZ(-90deg);

  @keyframes countdown {
    from {
      stroke-dashoffset: 0px;
    }
    to {
      stroke-dashoffset: 113px;
    }
  }

  & circle {
    stroke-dasharray: 113px;
    stroke-dashoffset: 0px;
    stroke-linecap: round;
    stroke-width: 2px;
    stroke: white;
    fill: none;
    animation: countdown ${CANCEL_TIME}s linear infinite forwards;
  }
`;

const TimeSpinner = ({ remainingSeconds }) => (
  <span className={styles.countdown}>
    <span className={styles.countdownNumber}>
      {remainingSeconds < 10 && 0}
      {remainingSeconds}
    </span>
    <SVGCirlcle>
      <circle r="20" cx="20" cy="20" />
    </SVGCirlcle>
  </span>
);

TimeSpinner.propTypes = {
  remainingSeconds: PropTypes.number,
};

export default TimeSpinner;
