import React, { useState } from 'react';
import '../styling/Settings.css';

const SettingsViewMock = () => {
  const [user, setUser] = useState({
    username: "AdminUser",
    email: "admin@sprintsight.io",
    notifications: true
  });

  return (
    <div className="settings-container">
      <header className="page-header">
        <div className="header-left-info">
          <p className="page-subtitle">Configure App</p>
          <h1 className="page-title">Settings</h1>
        </div>
      </header>

      <section className="settings-section">
        <h3>User Profile</h3>
        <div className="settings-grid">
          <div className="form-group">
            <label>Display Name</label>
            <input type="text" className="modal-input" value={user.username} readOnly />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" className="modal-input" value={user.email} readOnly />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h3>Preferences</h3>
        <div className="settings-grid">
          <div className="setting-item">
            <div className="setting-info">
              <h4>Email Notifications</h4>
              <p>Receive updates when stories are moved to 'Done'</p>
            </div>
            <input type="checkbox" checked={user.notifications} readOnly />
          </div>
        </div>
      </section>

      <section className="settings-section">
        <h3 style={{color: '#ef4444'}}>Danger Zone</h3>
        <div className="setting-item">
          <div className="setting-info">
            <h4>Sign Out</h4>
            <p>End your current session on this device.</p>
          </div>
          <button className="danger-btn" onClick={() => {
            localStorage.removeItem('sprintSightToken');
            window.location.href = '/';
          }}>Logout</button>
        </div>
      </section>
    </div>
  );
};

export default SettingsViewMock;