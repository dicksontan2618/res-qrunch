// Import necessary libraries
import React from 'react';
import Link from 'next/link';

// Create a functional component for the Profile Page
const ProfilePage = () => {
  return (
    <div>

      {/* User Profile Section */}
      <div className="profile-section">
        {/* Profile Picture */}
        <img src="user-profile-image.jpg" alt="User Profile" />

        {/* Username */}
        <h2>Username</h2>
      </div>

      <div className="profile-button-section">
        <Link href="/favourites">
            <button>Favourites</button>
        </Link>
        <Link href="/address">
            <button>Address</button>
        </Link>
        <Link href="/bank-card">
            <button>Bank Card</button>
        </Link>
      </div>

      <div className="profile-subsection">
        {/* Language Option */}
        <div id="language-selection">
          <label htmlFor="language">Language:</label>
          <select id="language">
            <option value="english">English</option>
            <option value="chinese">Chinese</option>
            {/* Add more language options as needed */}
          </select>
        </div>

        <Link href="/help">
          <button>Help (FAQ)</button>
        </Link>

        {/* For a toggle button effect, you might want to use a label and an input element */}
        <label htmlFor="light-mode">
          <button>
            Light Mode: <input type="checkbox" id="light-mode" />
          </button>
        </label>

        <Link href="/logout">
          <button>Log Out</button>
        </Link>
        
      </div>
    </div>
  );
};

export default ProfilePage;
