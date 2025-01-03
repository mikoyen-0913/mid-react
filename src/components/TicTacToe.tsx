import React, { useState, useEffect } from 'react';

const TicTacToe: React.FC = () => {
    const [board, setBoard] = useState<string[]>(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);  // 玩家 X 先行
    const [isGameOver, setIsGameOver] = useState(false);
    const [mode, setMode] = useState<'single' | 'two'>('single'); // 'single' 單人模式，'two' 雙人模式
    const [gameResult, setGameResult] = useState<string>(''); // 存儲遊戲結果

    // 點擊格子進行下棋
    const handleClick = (index: number) => {
        if (board[index] || calculateWinner(board) || isGameOver) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext); // 交換回合
    };

    // 計算是否有贏家
    const calculateWinner = (squares: string[]): string | null => {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  // 橫向
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  // 垂直
            [0, 4, 8], [2, 4, 6],             // 斜向
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    // 判斷是否平手
    const checkForDraw = (squares: string[]): boolean => {
        return squares.every(cell => cell !== null) && !calculateWinner(squares);
    };

    // 電腦的回合：隨機選擇一個空格
    const computerMove = () => {
        const emptySquares = board.map((value, index) => value === null ? index : null).filter(value => value !== null);
        if (emptySquares.length === 0) return;  // 如果沒有空格，退出
        const randomIndex = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        const newBoard = board.slice();
        newBoard[randomIndex] = 'O';  // 假設電腦為 O
        setBoard(newBoard);
        setIsXNext(true);  // 換回玩家回合

        // 檢查是否有贏家
        const winner = calculateWinner(newBoard);
        if (winner) {
            setGameResult(`贏家: ${winner}`);  // 如果有贏家，顯示贏家訊息
            setIsGameOver(true);  // 遊戲結束
        } else if (checkForDraw(newBoard)) {
            setGameResult('平手！');
            setIsGameOver(true);
        }
    };

    // 監控是否有贏家、平手或遊戲結束
    const winner = calculateWinner(board);
    useEffect(() => {
        if (winner) {
            setGameResult(`贏家: ${winner}`);
            setIsGameOver(true);
        } else if (checkForDraw(board)) {
            setGameResult('平手！');
            setIsGameOver(true);
        }
    }, [board]);

    // 在電腦回合時自動進行下棋
    useEffect(() => {
        if (!isXNext && mode === 'single' && !isGameOver) {
            setTimeout(computerMove, 500);  // 電腦延遲一段時間後自動下棋
        }
    }, [isXNext, board, isGameOver, mode]);

    // 重置遊戲
    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setIsXNext(true);
        setIsGameOver(false);
        setGameResult('');
    };

    // 切換遊戲模式
    const toggleMode = (selectedMode: 'single' | 'two') => {
        setMode(selectedMode);
        setBoard(Array(9).fill(null)); // 重置棋盤
        setIsXNext(true); // 玩家先手
        setIsGameOver(false); // 重置遊戲結束狀態
        setGameResult('');
    };

    return (
        <div>
                <button onClick={() => toggleMode('single')}>單人對電腦</button>
                <button onClick={() => toggleMode('two')}>雙人對戰</button>
            <div className="status">{gameResult || `下一位玩家: ${isXNext ? 'X' : 'O'}`}</div>
            <div className="board">
                {board.map((cell, index) => (
                    <button
                        key={index}
                        onClick={() => handleClick(index)}
                        className="square"
                        disabled={isGameOver || cell !== null}
                    >
                        {cell}
                    </button>
                ))}
            </div>
            <button onClick={resetGame}>重新開始</button>
        </div>
    );
};

export default TicTacToe;
