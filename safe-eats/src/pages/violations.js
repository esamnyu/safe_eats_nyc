import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ViolationsPage = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViolations = async () => {
      try {
        const response = await axios.get('http://localhost:3000/violations');
        setViolations(response.data.violations);
      } catch (error) {
        console.error('Error fetching violations from backend: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchViolations();
  }, []);

  return (
    <div>
      <h1>Common Violations</h1>
      <p>
        Learn about common violations and how to comply with food safety
        regulations.
      </p>

      {loading ? (
        <p>Loading violations...</p>
      ) : (
        <ul>
          {violations.length > 0 ? (
            violations.map((violation) => (
              <li key={violation.id}>{violation.name}</li>
            ))
          ) : (
            <p>No violations found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default ViolationsPage;
