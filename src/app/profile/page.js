// Import necessary libraries
import React from 'react';
import Link from 'next/link';

// Create a functional component for the Profile Page
const ProfilePage = () => {
  return (
    <div>
      <header id="profilePageHeader">
        {/* Upper Taskbar */}
        <div className="upper-taskbar">
          {/* Back Button */}
          <Link href="/home">
            <button>Back</button>
          </Link>

          {/* Settings Button */}
          <Link href="/settings">
            <button>Settings</button>
          </Link>
        </div>
      </header>

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
      </div>

      <div id="bottom-menu">
        <ul>
          <Link className="pageSelection" href="/home">
            Home
          </Link>
        </ul>
        <ul>
          <Link className="pageSelection" href="/shopping-cart">
            Cart
          </Link>
        </ul>
        <ul>
          <Link className="pageSelection" href="/profile">
            Profile
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
