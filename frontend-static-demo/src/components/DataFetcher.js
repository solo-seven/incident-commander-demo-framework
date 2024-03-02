import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const dataUri = process.env.REACT_APP_DATA_URI || 'http://localhost:8080'
  useEffect(() => {
    fetch(dataUri + '/info')
      .then(response => {
        if(!response.ok) {
          throw new Error('Network response was not set');
        }
        return response.json();
      })
      .then(json => {
        setData(json);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError(error)
        setIsLoading(false);
      });
  }, []);

  if(isLoading) {
    return <div>Loading...</div>;
  }

  if(error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Data Fetched</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default DataFetcher;