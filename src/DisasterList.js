import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DisasterList() {
  const [disasters, setDisasters] = useState([]);

  useEffect(() => {
    async function fetchDisasters() {
      try {
        const res = await axios.get('http://localhost:5000/disasters');
        setDisasters(res.data);
      } catch (err) {
        console.error('Error fetching disasters:', err.response?.data || err.message);
      }
    }
    fetchDisasters();
  }, []);

  const handleAddress = async (id) => {
    try {
      await axios.put(`http://localhost:5000/respond/${id}`);
      alert('Disaster marked as addressed');
      // Refresh disasters after updating status
      const res = await axios.get('http://localhost:5000/disasters');
      setDisasters(res.data);
    } catch (err) {
      console.error('Error updating disaster:', err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Reported Disasters</h2>
      {disasters.length === 0 ? (
        <p>No disasters reported yet.</p>
      ) : (
        disasters.map((d) => (
          <div key={d._id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <p><strong>Location:</strong> {d.location}</p>
            <p><strong>Description:</strong> {d.description}</p>
            <p><strong>Coordinates:</strong> {d.latitude}, {d.longitude}</p>
            <p><strong>Status:</strong> {d.status}</p>
            {d.status === 'Pending' && (
              <button onClick={() => handleAddress(d._id)}>Mark as Addressed</button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default DisasterList;
