import React, { useState } from "react";

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [profilePictureUrl, setProfilePictureUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Registering with: ', { email, password, name, bio, profilePictureUrl });
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name, email, bio, profilePictureUrl, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Registered Successfuly');
                console.log('Registration Successful :', data);
            }
            else {
                setMessage('Failed to Register');
                console.log('Registration Failed: ', data);
            }
        }
        catch (error) {
            setMessage('An Error Occured');
            console.error('An error occured: ', error);
        }

    };

    return (
        <div className="container">
            <div className="form-container">
                <div className="form-header">
                    <h1 className="form-title">Register a New Account</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Bio</label>
                        <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Profile Picture URL</label>
                        <input type="text" value={profilePictureUrl} onChange={(e) => setProfilePictureUrl(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit" className="submit-btn">Register</button>
                </form>
                {message && <p style={{ marginTop: '20px' }}>{message}</p>}
            </div>
        </div>
    );
}

export default Register;