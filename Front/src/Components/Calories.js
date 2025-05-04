import React, { useState } from 'react';
import axios from 'axios';

import '../Styles/calories.css'

const AiwithImage = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [responseAI, setResponse] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        if (event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result); // Update preview state
            reader.readAsDataURL(event.target.files[0]);
        } else {
            setImagePreview(null); // Clear preview if no image
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const responseAI = await axios.post('/api/predict', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setResponse(responseAI.data.answer);
        } catch (error) {
            console.error(error);
            setResponse('Error loading response');
        }
    };

    return (
        <div className="cal-container">
            <input type="file" id="imageInput" accept="image/*" onChange={handleFileChange} />
            <button onClick={handleSubmit} disabled={!selectedFile}>
                Submit
            </button>
            {imagePreview && <img src={imagePreview} alt="Selected Image Preview" className ='image-preview' />}
            <div id="responseText">{responseAI}</div>
        </div>
    );
};

export default AiwithImage;
