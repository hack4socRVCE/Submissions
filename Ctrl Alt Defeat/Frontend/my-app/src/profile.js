import React from 'react';
import Routerz from './navbar';
import "./css/profile.css"

function Profile() {
	return (
        <div>
        <Routerz/>
		<br></br>
        <br></br>
        <div class="profile-container">
        <div class="profile-picture">
            <img src="" alt="Profile Picture"/>
        </div>
        <div class="profile-details">
            <h2>John Doe</h2>
            <p><strong>Email:</strong> johndoe@example.com</p>
            <p><strong>Location:</strong> New York, USA</p>
            <p><strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et libero eu dolor tempus aliquet.</p>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 User Profile Page</p>
    </footer>
        </div>
	);
}

export default Profile;