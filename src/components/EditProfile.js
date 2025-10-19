import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //Get token from local storage
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/login');
            return;
        }

        //Fetch user profile data
        fetch('http://localhost:3001/', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setBio(data.bio);
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
            });
    }, [navigate]);

    const handleSave = () => {
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/login');
            return;
        }

        //Update user profile
        fetch('http://localhost:3001/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, bio })
        })
            .then(response => {
                if (response.ok) {
                    navigate('/dashboard');
                } else {
                    throw new Error('Failed to update profile');
                }
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    }

    return (
        <div className="edit-profile">
            <h1>Edit Profile</h1>
            <div>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
            </div>
            <div>
                <label>
                    Bio:
                    <input type="text" value={bio} onChange={e => setBio(e.target.value)} />
                </label>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditProfile;