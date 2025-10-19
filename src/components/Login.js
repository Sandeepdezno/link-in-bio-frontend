import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        console.log('Logong in user:', email);

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ email, password }),
            });
            console.log('Login info sent...');
            const data = await response.json();
            if (response.ok) {
                setMessage('Login Success')
                console.log('Logged in', data);
                //Save Token Locally
                localStorage.setItem('authToken', data.token);
                //Goto dashboard
                navigate('/dashboard');
            }
            else {
                setMessage('Login Failed');
                console.log('Login Failed: ', data);
            }
        }
        catch (error) {
            setMessage('An Error occured');
            console.log('An Error Occured:', error);
        }
    }


    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <h1 className="form-title">Login</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="submit-btn">Login</button>
                </form>
                {message && <p style={{ marginTop: '15px' }}>{message}</p>}
            </div>
        </div>
    );
}

export default Login;