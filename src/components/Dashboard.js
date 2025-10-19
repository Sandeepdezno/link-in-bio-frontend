import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [userProfile, setUserProfile] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        //Get token from local storage
        const token = localStorage.getItem('authToken');

        if (!token) {
            navigate('/login');
            return;
        }

        //get details of user using token
        fetch('http://localhost:3001/')
            .then(response => response.json())
            .then(data => setUserProfile(data))
            .catch(error => {
                console.error('Error fetching Profile:', error);
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    }

    const handleEditProfile = () => {
        navigate('/edit-profile');
    }

    if (!userProfile) {
        return <div>Loading Dashboard...</div>;

    }

    return (
        <div className="dashboard-body">
            <div className="container">

                <div className="header">
                    <h1>Profile Dashboard</h1>
                    <p>Manage your personal information</p>
                </div>


                <div className="profile-card">

                    <div className="profile-header">
                        <div className="profile-image">
                            👤
                        </div>
                        <h2 className="profile-name">{userProfile.name}</h2>
                        <p className="profile-title">{userProfile.bio}</p>
                        <div className="status-badge">
                            <div className="status-dot"></div>
                            Active
                        </div>
                    </div>


                    <div className="profile-content">
                        <div className="content-grid">

                            <div>
                                <h3 className="section-title">
                                    <div className="section-icon blue-icon"></div>
                                    Personal Information
                                </h3>

                                <div>
                                    <div className="info-item">
                                        <div className="info-label">Full Name</div>
                                        <div className="info-value">{userProfile.name}</div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Email Address</div>
                                        <div className="info-value">
                                            <div className="info-icon"></div>
                                            {userProfile.email}
                                        </div>
                                    </div>

                                    <div className="info-item">
                                        <div className="info-label">Bio</div>
                                        <div className="info-value">{userProfile.bio}.</div>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <h3 className="section-title">
                                    <div className="section-icon purple-icon"></div>
                                    Links & Social
                                </h3>

                                <div>
                                    {userProfile.links && userProfile.links.map((link, index) => (
                                        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
                                            <div className="social-content">
                                                <div className="social-text">
                                                    <h4>{link.title}</h4>
                                                    <p>{link.url}</p>
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>




                        <div className="action-buttons" onClick={handleEditProfile}>
                            <button className="btn btn-blue">
                                <div className="btn-icon"></div>
                                Edit Profile
                            </button>
                            <button className="btn btn-red" onClick={handleLogout}>
                                <div className="btn-icon"></div>
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Dashboard;