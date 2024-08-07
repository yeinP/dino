import { useState, useEffect } from 'react';

function useCodeTimer(initialTime, onTimeEnd) {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;

    if (isCounting && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCounting(false);
      if (onTimeEnd) {
        onTimeEnd();
      }
    }

    return () => clearInterval(timer);
  }, [timeLeft, isCounting]);

  const startTimer = () => {
      setTimeLeft(initialTime);
      setIsCounting(true);
  };

  const resetTimer = () => {
    setTimeLeft(initialTime);
    setIsCounting(false);
  };

  return {
    timeLeft,
    isCounting,
    startTimer,
    resetTimer,
  };
}

export default useCodeTimer;
