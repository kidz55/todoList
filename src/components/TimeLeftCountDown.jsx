import React, { useState, useEffect, useMemo } from 'react';
import propTypes from 'prop-types';
import moment from 'moment';

const TimeLeftCountDown = ({ deadLine, onCountdownOver }) => {
  const [timeLeft, setTimeLeft] = useState(moment(deadLine).diff(moment(), 'seconds'));

  useEffect(() => {
    const deadLineDate = moment(deadLine);
    if (deadLineDate.diff(moment(), 'seconds') > 0) setTimeLeft(deadLineDate.diff(moment(), 'seconds'));
  }, [deadLine]);

  useEffect(() => {
    if (!timeLeft) {
      onCountdownOver();
      console.log('to');
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const getTimeLeft = useMemo(
    () => {
      if (timeLeft <= 0) {
        return 'expired';
      }
      const duration = moment.duration(timeLeft, 'seconds');
      return `${duration.days()}d:${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`;
    },
    [timeLeft],
  );

  return (
    <small>
      { timeLeft > 0 ? `Time left: ${getTimeLeft}` : 'Expired'}
    </small>
  );
};

TimeLeftCountDown.propTypes = {
  deadLine: propTypes.string.isRequired,
  onCountdownOver: propTypes.func.isRequired,
};

export default TimeLeftCountDown;
