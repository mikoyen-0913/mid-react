import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import TicTacToePage from './pages/TicTacToePage';
import UltimatePasswordPage from './pages/UltimatePasswordPage';

const App: React.FC = () => {
    return (
        <Router basename="/mid-react-game-web">
            <div style={styles.container}>
                {/* 頁面頂部導航列 */}
                <nav style={styles.nav}>
                    <Link to="/" style={styles.link}>首頁</Link>
                    <Link to="/tic-tac-toe" style={styles.link}>圈圈叉叉</Link>
                    <Link to="/ultimate-password" style={styles.link}>終極密碼</Link>
                </nav>

                {/* 主內容區域 */}
                <main style={styles.main}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/tic-tac-toe" element={<TicTacToePage />} />
                        <Route path="/ultimate-password" element={<UltimatePasswordPage />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

const styles = {
    container: {
        margin: 0,
        padding: 0,
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f4f4',
    },
    nav: {
        backgroundColor: '#333',
        color: 'white',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        position: 'fixed',
        top: 0,
        width: '100%',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1000,
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1rem',
        transition: 'color 0.3s ease',
    },
    main: {
        marginTop: '60px', // 防止內容被導航列擋住
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 60px)',
        padding: '20px',
    },
    pageContainer: {
        textAlign: 'center',
        width: '100%',
        maxWidth: '1200px',
    },
    button: {
        padding: '10px 20px',
        fontSize: '1rem',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    buttonHover: {
        backgroundColor: '#555',
    },
    board: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gap: '10px',
        justifyContent: 'center',
    },
    square: {
        width: '100px',
        height: '100px',
        fontSize: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3b3b3b',
        border: '1px solid #000',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    squareHover: {
        backgroundColor: '#c1c1c1',
    },
};

export default App;
