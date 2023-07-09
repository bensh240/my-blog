import React, {Component, useState} from 'react';
import './App.css';
import Menu from './components/Menu';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import AboutMePage from './components/pages/AboutMePage';
import NewPostPage from './components/pages/NewPostPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from "./components/pages/LoginPage";
import PostPage from "./components/pages/PostPage";
import IndividualPostPage from "./components/pages/IndividualPostPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import SignUpPage from "./components/pages/SignUpPage";

function App() {
    const [sessionId, setSessionId] = useState(getCookie("session_id"));
    const [isLoggingIn, setIsLoggingIn] = useState(false);


    // Code for getCookie function
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    return (
        <Router>
            <div id="blog">
                <Menu sessionId={sessionId} isLoggingIn={isLoggingIn} setIsLoggingIn={setIsLoggingIn} />
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/about" element={<AboutMePage />} />
                    <Route path="/NewPostPage" element={<NewPostPage />} />
                    <Route path="/PostPage" element={<PostPage />} />
                    <Route path="/LoginPage" element={<LoginPage isLoggingIn={isLoggingIn} setIsLoggingIn={setIsLoggingIn} />} />
                    <Route path="/chosenPost/:postId" element={<IndividualPostPage />} />
                    <Route path="/ForgotPasswordPage" element={<ForgotPasswordPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;