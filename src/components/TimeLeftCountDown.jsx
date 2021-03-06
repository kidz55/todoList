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
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    // eslint-disable-next-line consistent-return
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft]);

  const getTimeLeft = useMemo(
    () => {
      if (timeLeft <= 0) {
        return 'expired';
      }
      const duration = moment.duration(timeLeft, 'seconds');
      let timeLeftFormat = '';
      if (duration.days() > 0) timeLeftFormat += `${duration.days()}d:`;
      if (duration.hours() > 0) timeLeftFormat += `${duration.hours()}h:`;
      if (duration.minutes() > 0) timeLeftFormat += `${duration.minutes()}m:`;
      if (duration.seconds() > 0) timeLeftFormat += `${duration.seconds()}s`;
      return timeLeftFormat;
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
