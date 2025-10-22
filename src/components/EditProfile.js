import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    // const [title1, setTitle1] = useState('');
    // const [link1, setLink1] = useState('');
    // const [title2, setTitle2] = useState('');
    // const [link2, setLink2] = useState('');
    // const [title3, setTitle3] = useState('');
    // const [link3, setLink3] = useState('');
    const [links, setLinks] = useState([{ title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }]);
    const navigate = useNavigate();

    useEffect(() => {
        //Get token from local storage
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/login');
            return;
        }

        //Fetch user profile data
        fetch('http://localhost:3001/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setName(data.name);
                setBio(data.bio);
                setLinks(data.links.length > 0 ? data.links : [{ title: '', url: '' }, { title: '', url: '' }, { title: '', url: '' }]);
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
        fetch('http://localhost:3001/edit-profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, bio, links: links })
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
            <div>
                <h1>Add Links</h1>
                <div>
                    <h3>Link 1</h3>
                    <input type="text" value={links[0].title} onChange={e => {
                        const newLinks = [...links];
                        newLinks[0].title = e.target.value;
                        setLinks(newLinks);
                    }} />
                    <input type="text" value={links[0].url} onChange={e => {
                        const newLinks = [...links];
                        newLinks[0].url = e.target.value;
                        setLinks(newLinks);
                    }} />
                </div>
                <div>
                    <h3>Link 2</h3>
                    <input type="text" value={links[1].title} onChange={e => {
                        const newLinks = [...links];
                        newLinks[1].title = e.target.value;
                        setLinks(newLinks);
                    }} />
                    <input type="text" value={links[1].url} onChange={e => {
                        const newLinks = [...links];
                        newLinks[1].url = e.target.value;
                        setLinks(newLinks);
                    }} />
                </div>
                <div>
                    <h3>Link 3</h3>
                    <input type="text" value={links[2].title} onChange={e => {
                        const newLinks = [...links];
                        newLinks[2].title = e.target.value;
                        setLinks(newLinks);
                    }} />
                    <input type="text" value={links[2].url} onChange={e => {
                        const newLinks = [...links];
                        newLinks[2].url = e.target.value;
                        setLinks(newLinks);
                    }} />
                </div>
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
}

export default EditProfile;