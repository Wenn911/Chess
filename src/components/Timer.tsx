import React, { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors';
import { Player } from '../models/Player'

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setblackTime] = useState(300);
    const [whiteTime, setwhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current) {
            clearInterval(timer.current);
        }
        const cb = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
        timer.current = setInterval(cb, 1000)
    }

    function decrementBlackTimer() {
        setblackTime(prev => prev - 1);
    }

    function decrementWhiteTimer() {
        setwhiteTime(prev => prev - 1)
    }

    function handleRestart() {
        setblackTime(300)
        setwhiteTime(300)
        restart()
    }

  return (
    <div>
        <div>
            <button onClick={handleRestart}>Restart Game</button>
        </div>
        <h2>Черные - {blackTime}</h2>
        <h2>Белые - {whiteTime}</h2>
    </div>
  )
}

export default Timer