import React, { useState } from 'react';

const UltimatePassword: React.FC = () => {
    const [min, setMin] = useState(1);
    const [max, setMax] = useState(100);
    const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);  // 隨機生成答案
    const [guess, setGuess] = useState<number | ''>('');  // 玩家輸入的猜測
    const [message, setMessage] = useState('');  // 提示訊息

    // 處理玩家的猜測
    const handleGuess = () => {
        const numGuess = Number(guess);
        if (isNaN(numGuess)) {
            setMessage('請輸入有效的數字。');
            return;
        }

        if (numGuess < min || numGuess > max) {
            setMessage(`請猜一個介於 ${min} 和 ${max} 之間的數字。`);
        } else if (numGuess > answer) {
            setMax(numGuess - 1);
            setMessage('太高了！');
        } else if (numGuess < answer) {
            setMin(numGuess + 1);
            setMessage('太低了！');
        } else {
            setMessage('恭喜！你猜對了！');
        }

        setGuess('');  // 清空猜測
    };

    // 重啟遊戲
    const resetGame = () => {
        setMin(1);
        setMax(100);
        setAnswer(Math.floor(Math.random() * 100) + 1);  // 重新生成答案
        setGuess('');  // 清空猜測
        setMessage('');  // 清空提示
    };

    return (
        <div>
            
            <p>猜一個介於 {min} 和 {max} 之間的數字</p>
            <input
                type="number"
                value={guess}
                onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[0-9\b]+$/.test(value)) {
                        setGuess(value);
                    }
                }}
            />
            <button onClick={handleGuess}>猜測</button>
            <button onClick={resetGame}>重新開始</button>
            <p>{message}</p>
        </div>
    );
};

export default UltimatePassword;
