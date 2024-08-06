// src/components/ProtectedComponent.jsx

import React, { useEffect, useState } from 'react';
import { apiCall } from '../utils/api';

const ProtectedComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await apiCall('http://localhost:8080/protected-route');
        setData(result);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Protected Data</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>Loading...</p>}
    </div>
  );
};

export default ProtectedComponent;
