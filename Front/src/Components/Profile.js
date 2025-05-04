import React, { useState, useEffect } from 'react';
import AuthService from "../Services/auth.service";
import axios from 'axios';
import '../Styles/Profile.css';

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [photoUrl, setPhotoUrl] = useState(currentUser.photoUrl || null);
    const [personalizedPlan, setPersonalizedPlan] = useState(null);
    const [isPhotoUploading, setIsPhotoUploading] = useState(false);
    const [photoFile, setPhotoFile] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);

    useEffect(() => {
        async function fetchPersonalizedPlan() {
            try {
                const response = await axios.get(`/api/save-recommendations/${currentUser.id}`);
                setPersonalizedPlan(response.data);
            } catch (error) {
                console.error('Error fetching personalized plan:', error);
            }
        }
        fetchPersonalizedPlan();
    }, [currentUser.id]);

    const handlePhotoUpload = () => {
        setIsPhotoUploading(true);
        setTimeout(() => {
            setIsPhotoUploading(false);
            setPhotoUrl('https://example.com/uploaded-photo.jpg'); // Replace with the actual uploaded photo URL
        }, 2000);
    };

    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhotoFile(file);

        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPhotoPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPhotoPreview(null);
        }
    };

    return (
        <div className="profile-container">
            <header className="profile-header">
                <div className="profile-photo">
                    {photoUrl || photoPreview ? (
                        <img src={photoPreview || photoUrl} alt="Profile Photo" />
                    ) : (
                        <div className="photo-placeholder">
                            <i className="fas fa-user-circle"></i>
                        </div>
                    )}
                    <div className="photo-upload">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            disabled={isPhotoUploading}
                        />
                        <button
                            className="photo-upload-btn"
                            onClick={handlePhotoUpload}
                            disabled={isPhotoUploading || !photoFile}
                        >
                            {isPhotoUploading ? 'Uploading...' : 'Upload Photo'}
                        </button>
                    </div>
                </div>
                <div className="profile-info">
                    <h1>{currentUser.username}</h1>
                    <p>Member since {new Date(currentUser.createdAt).toLocaleDateString()}</p>
                </div>
            </header>

            <section className="profile-details">
                <div className="details-section">
                    <h2>Account Details</h2>
                    <p>
                        <strong>Id:</strong> {currentUser.id}
                    </p>
                    <p>
                        <strong>Email:</strong> {currentUser.email}
                    </p>
                    <p>
                        <strong>Authorities:</strong>
                        <ul>
                            {currentUser.roles && currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
                        </ul>
                    </p>
                </div>

                <div className="details-section">
                    <h2>Personalized Plan</h2>
                    {personalizedPlan ? (
                        <ul>
                            <li>
                                <h3>Dietary Suggestions</h3>
                                <p>{personalizedPlan.dietRecommendations}</p>
                            </li>
                            <li>
                                <h3>Exercise Routines</h3>
                                <p>{personalizedPlan.exerciseRecommendations}</p>
                            </li>
                            <li>
                                <h3>Lifestyle Recommendations</h3>
                                <p>{personalizedPlan.generalTips}</p>
                            </li>
                        </ul>
                    ) : (
                        <p>Loading personalized plan...</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Profile;
