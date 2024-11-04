import React, { useEffect, useState } from 'react';

const FlipClockCountdown = ({ countdown }) => {
    const formatTime = (time) => {
        const seconds = String(time).padStart(2, '0');
        return `${seconds}`;
    };

    const [time, setTime] = useState(formatTime(countdown));

    useEffect(() => {
        setTime(formatTime(countdown));
    }, [countdown]);

    return (
        <div className="flex space-x-2 text-white text-6xl font-mono font-bold">
            {time.split('').map((char, index) => (
                <div
                    key={index}
                    className="bg-black rounded-lg shadow-lg w-20 h-28 flex items-center justify-center transform transition-transform"
                >
                    {char}
                </div>
            ))}
        </div>
    );
};

export default FlipClockCountdown;
