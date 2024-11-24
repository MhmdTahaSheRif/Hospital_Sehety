import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // import Link for routing

const Location = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    // Handle getting the user's location
    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    window.location.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
                },
                (err) => {
                    setError("Failed to retrieve location.");
                    console.error(err);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div>
            {/* This Link will trigger the geolocation logic */}
            <Link 
                to="#"
                onClick={(e) => {
                    e.preventDefault();  // Prevent the default routing behavior
                    handleGetLocation();  // Trigger geolocation when clicked
                }}
                className="btn btn-primary"
            >
                <i className="fa fa-map-marker" aria-hidden="true"></i>
                <span>Location</span>
            </Link>

            {/* Error message if location retrieval fails */}
            {error && <p>{error}</p>}

            {/* Display the location coordinates if available */}
            {location && <p>Your location: {location.latitude}, {location.longitude}</p>}
        </div>
    );
};

export default Location;
