import React, { useContext } from "react";
import { userAuthContext } from "../context/userAuthContext";
import { Mail, User } from "lucide-react";
import "../index.css"; 

const ProfilePage = () => {
  const { user, loading } = useContext(userAuthContext);

  if (loading) {
    return <div className="profile-loading">Loading...</div>;
  }

  return (
    <div className="profile-root">
      <div className="profile-container">
        <div className="profile-card">
          <div className="profile-header">
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">Your profile information</p>
          </div>
          {/* avatar upload section */}
          <div className="profile-avatar-section">
            <div className="profile-avatar-wrapper">
              <img
                src="/userProfilePic.jpg"
                alt="Profile"
                className="profile-avatar-img"
              />
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-info-row">
              <div className="profile-info-label">
                <User className="profile-icon" />
                Full Name
              </div>
              <p className="profile-info-value">{user?.fullName}</p>
            </div>
            <div className="profile-info-row">
              <div className="profile-info-label">
                <Mail className="profile-icon" />
                Email Address
              </div>
              <p className="profile-info-value">{user?.email}</p>
            </div>
          </div>
          <div className="profile-account-section">
            <h2 className="profile-account-title">Account Information</h2>
            <div className="profile-account-info">
              <div className="profile-account-row">
                <span>Member Since</span>
                <span>{user?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="profile-account-row">
                <span>Account Status</span>
                <span className="profile-status-active">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
