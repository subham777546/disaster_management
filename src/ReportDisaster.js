import React, { useState } from 'react';
import axios from 'axios';

function ReportDisaster() {
  const [formData, setFormData] = useState({
    location: '',
    description: '',
    latitude: '',
    longitude: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/report', formData);
      alert('Disaster reported successfully');
      setFormData({ location: '', description: '', latitude: '', longitude: '' });
    } catch (err) {
      console.error('Error reporting disaster:', err.response?.data || err.message);
      alert('Error reporting disaster: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div>
      <h2>Report Disaster</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          required
        />
        <button type="submit">Report</button>
      </form>
    </div>
  );
}

export default ReportDisaster;
