import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard({ token, onLogout }) {
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/transports`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTransports(response.data);
    } catch (err) {
      setError('Failed to load transports');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Transport Dashboard</h1>
        <button onClick={onLogout} className="logout-btn">Logout</button>
      </header>

      <div className="dashboard-content">
        <div className="map-section">
          <div className="map-placeholder">
            <p>🗺️ Map View</p>
            <p style={{ fontSize: '12px', marginTop: '10px' }}>Real-time tracking coming soon</p>
          </div>
        </div>

        <div className="list-section">
          <h2>Active Transports</h2>
          
          {loading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          
          {!loading && transports.length === 0 && (
            <div className="empty-state">
              <p>📦 No transports yet</p>
              <p>Create your first transport to get started</p>
            </div>
          )}

          {!loading && transports.length > 0 && (
            <div className="transports-list">
              {transports.map((transport) => (
                <div key={transport.id} className="transport-card">
                  <div className="transport-header">
                    <span className={`status status-${transport.status}`}>
                      {transport.status}
                    </span>
                  </div>
                  <div className="transport-body">
                    <p><strong>From:</strong> {transport.from_location}</p>
                    <p><strong>To:</strong> {transport.to_location}</p>
                    <p><strong>Driver:</strong> #{transport.driver_id}</p>
                    <p><strong>ETA:</strong> {transport.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
