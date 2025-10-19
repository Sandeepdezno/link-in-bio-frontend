import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";

// const handleLogin = (event) =>{

// }


function Home() {
    const navigate = useNavigate();
    const handleRegister = () => {
        navigate('/signup');
    };
    const handleLogin = () => {
        console.log('Login Clicked');
        navigate('/login');
    };
    return (
        <div className="home-main-body">
            <div className="home-container">
                <header className="header-elements">
                    <h1 className="welcome-title">Welcome</h1>
                    <p className="welcome-subtitle">Link in Bio Project</p>
                </header>
                <div className="button-group">
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    <button className="btn btn-secondary" onClick={handleRegister}>Register</button>
                </div>
            </div>
        </div>
    );
}

export default Home;