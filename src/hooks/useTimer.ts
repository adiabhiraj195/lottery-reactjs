import { useRef, useState, useEffect } from "react";

const useTimer = (initialTime: number) => {

    // const CountdownTimer = () => {
    // Initial time in seconds (1 hour)
    // const initialTime = 60 * 60;
    const [timeRemaining, setTimeRemaining] = useState(initialTime);

    // useEffect(() => {
    function CountdownTimer() {
        const timerInterval = setInterval(() => {
            setTimeRemaining((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timerInterval);
                    // Perform actions when the timer reaches zero
                    console.log('Countdown complete!');
                    return 0;
                } else {
                    return prevTime - 1;
                }
            });
        }, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timerInterval)
    }
    // }, []); // The empty dependency array ensures the effect runs only once on mount

    // Convert seconds to hours, minutes, and seconds
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;
    // }

    return {
        CountdownTimer,
        hours,
        minutes,
        seconds
    }

}
export default useTimer;