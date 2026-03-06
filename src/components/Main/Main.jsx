import React, { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const AFFIRMATIONS = [
    "I am capable of achieving my goals today.",
    "Every breath I take fills me with peace.",
    "I choose to focus on what I can control.",
    "My mind is clear, and my focus is sharp.",
    "I am resilient and can handle any challenge."
];

const Main = () => {
    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
    const [theme, setTheme] = useState('light');
    const [showBreathing, setShowBreathing] = useState(false);
    const [affirmation, setAffirmation] = useState(AFFIRMATIONS[0]);
    
    // Focus Timer State
    const [timerActive, setTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(25 * 60);

    useEffect(() => {
        // Randomize affirmation on load
        setAffirmation(AFFIRMATIONS[Math.floor(Math.random() * AFFIRMATIONS.length)]);
    }, []);

    useEffect(() => {
        let interval = null;
        if (timerActive && timeLeft > 0) {
            interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else if (timeLeft === 0) {
            setTimerActive(false);
            onSent("My 25-minute Pomodoro focus session is done! Give me a quick 5-minute break suggestion.");
        }
        return () => clearInterval(interval);
    }, [timerActive, timeLeft, onSent]);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    const handleMoodClick = (mood) => {
        onSent(`I am feeling ${mood} today. Can you give me a personalized meditation or advice?`);
    };

    const handleSOS = () => {
        onSent("I am having a panic attack or intense anxiety right now. I need immediate calming advice and guidance.");
    };

    const toggleBreathing = () => setShowBreathing(!showBreathing);

    const toggleTimer = () => setTimerActive(!timerActive);
    const resetTimer = () => { setTimerActive(false); setTimeLeft(25 * 60); };
    
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    return (
        <div className='main'>
            <div className="nav">
                <button id="theme-toggle" className="theme-toggle" onClick={toggleTheme}>
                    <span className="theme-emoji">☀️</span>
                    <span className="theme-emoji moon">🌙</span>
                </button>
                <div className="app-title">
                    BreathEase<span className="medical-dot"></span>
                </div>
                <img src={assets.user_icon} alt="User Icon" />
            </div>
            
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p><span>Your Daily Space</span></p>
                            <p className="affirmation-text">"{affirmation}"</p>
                        </div>

                        <div className="dashboard-top-row">
                            <div className="mood-tracker compact-card">
                                <p className="mood-title">How are you feeling today?</p>
                                <div className="mood-emojis">
                                    <button onClick={() => handleMoodClick("distressed")} className="emoji-btn">😭</button>
                                    <button onClick={() => handleMoodClick("sad")} className="emoji-btn">😔</button>
                                    <button onClick={() => handleMoodClick("neutral")} className="emoji-btn">😐</button>
                                    <button onClick={() => handleMoodClick("good")} className="emoji-btn">🙂</button>
                                    <button onClick={() => handleMoodClick("excellent")} className="emoji-btn">🤩</button>
                                </div>
                            </div>
                            
                            <div className="focus-timer compact-card">
                                <p className="timer-title">Pomodoro Focus Timer</p>
                                <div className="timer-display">{formatTime(timeLeft)}</div>
                                <div className="timer-controls">
                                    <button onClick={toggleTimer} className={`timer-btn ${timerActive ? 'pause' : 'start'}`}>
                                        {timerActive ? 'Pause' : 'Start Focus'}
                                    </button>
                                    <button onClick={resetTimer} className="timer-btn reset">Reset</button>
                                </div>
                            </div>
                        </div>

                        <div className="sos-container">
                            <button onClick={handleSOS} className="sos-btn">
                                🆘 Panic Relief
                            </button>
                        </div>

                        {showBreathing ? (
                            <div className="breathing-exercise">
                                <button onClick={toggleBreathing} className="close-breathing">×</button>
                                <h3>4-4-4 Breathing Exercise</h3>
                                <div className="breathing-circle-container">
                                    <div className="breathing-circle"></div>
                                </div>
                                <p className="breathing-instruction">Inhale for 4s, Hold for 4s, Exhale for 4s</p>
                            </div>
                        ) : (
                            <div className="cards">
                                <div className="card" onClick={() => onSent("Give me a 5-minute guided meditation specifically for students before an exam.")}>
                                    <p>Student: Exam Meditation</p>
                                    <img src={assets.compass_icon} alt="Compass" />
                                </div>
                                <div className="card" onClick={() => onSent("I am a teacher. Give me a 5-minute desk stretch and burnout prevention guide.")}>
                                    <p>Teacher: Desk Stretches</p>
                                    <img src={assets.history_icon} alt="Wellness" />
                                </div>
                                <div className="card" onClick={toggleBreathing}>
                                    <p>General: Start Box Breathing</p>
                                    <img src={assets.bulb_icon} alt="Bulb" />
                                </div>
                                <div className="card" onClick={() => onSent("What are best practices for sleep hygiene to ensure deep rest?")}>
                                    <p>Wellness: Deep Sleep Plan</p>
                                    <img src={assets.code_icon} alt="Sleep" />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className='result'>
                        <div className="result-title">
                            <img src={assets.user_icon} alt="User" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.gemini_icon} alt="AI Response" />
                            {loading ? (
                                <div className='loader'>
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && input ? onSent(input) : null} value={input} type="text" placeholder='Type your health query...' />
                        <img src={assets.gallery_icon} alt="Gallery" />
                        <img src={assets.mic_icon} alt="Mic" />
                        <img onClick={() => input ? onSent(input) : null} src={assets.send_icon} alt="Send" />
                    </div>
                    <p className="bottom-info">
                        BreathEase is your universal health tool. Always seek a medical professional for clinical advice.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
