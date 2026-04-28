import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddMusic.css';

const AddMusic = () => {
    const [title, setTitle] = useState('');
    const [songFile, setSongFile] = useState(null);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const user = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!user || user.role !== 'artist') {
            setMessage('Only artists can upload music.');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('song', songFile);
        if (thumbnailFile) {
            formData.append('thumbnail', thumbnailFile);
        }

        try {
            const response = await fetch('http://localhost:3000/api/music/upload', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Music uploaded successfully!');
                setTimeout(() => navigate('/'), 2000);
            } else {
                setMessage(data.message || 'Upload failed.');
            }
        } catch (error) {
            setMessage('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-music-page">
            <div className="add-music-container">
                <h1>Add New Music</h1>
                <p>Upload your tracks from Pixabay or your computer.</p>
                
                <form onSubmit={handleUpload}>
                    <div className="form-group">
                        <label>Song Title</label>
                        <input 
                            type="text" 
                            placeholder="Enter song title" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Audio File (MP3)</label>
                        <input 
                            type="file" 
                            accept="audio/*" 
                            onChange={(e) => setSongFile(e.target.files[0])} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label>Thumbnail Image (Optional)</label>
                        <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => setThumbnailFile(e.target.files[0])} 
                        />
                    </div>

                    <button type="submit" className="upload-btn" disabled={loading}>
                        {loading ? 'Uploading...' : 'Upload Music'}
                    </button>
                </form>
                {message && <p className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>{message}</p>}
            </div>
        </div>
    );
};

export default AddMusic;
