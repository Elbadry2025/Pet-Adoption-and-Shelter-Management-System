import React, { useState, useEffect } from 'react';
import { httpRequest } from '../HttpProxy';
import { getUserId } from '../CurrentSession';
import { useNavigate } from 'react-router';


interface Adoption {
  adoptionId: number;
  petId: number;
  userId: number;
  adoptionDate: string;
  status: string;
}

const UserAdoptionsTable: React.FC = () => {
  const [adoptions, setAdoptions] = useState<Adoption[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const currentUserId = getUserId();

  const gotoAdoptPage = () => {
    navigate('/petdetailsmodal');
  }

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const response = await httpRequest('get', `/api/adoptions/get_adoptions_by_userId?userId=${currentUserId}`);
        if (response.status === 200) {
          setAdoptions(response.data);
          console.log(response);
        } else {
          throw new Error('Failed to fetch adoptions');
        }
      } catch (err) {
        setError('An error occurred while fetching adoptions.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdoptions();
  }, []);

  // Styles
  const containerStyle: React.CSSProperties = {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    minWidth: '100vw',
    padding: '20px',
    boxSizing: 'border-box',
  };
  
  const tableStyle: React.CSSProperties = {
    width: '100%',
    margin: '0 auto', // Center the table horizontally
    borderCollapse: 'collapse',
  };
  
  const thTdStyle: React.CSSProperties = {
    border: '1px solid #dee2e6',
    padding: '8px',
    textAlign: 'left',
  };
  
  const headerStyle: React.CSSProperties = {
    background: '#6c757d',
    color: '#fff',
    padding: '16px',
    fontSize: '1.5rem',
    textAlign: 'center',
  };

  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>Your Adoptions</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thTdStyle}>Adoption ID</th>
            <th style={thTdStyle}>Pet ID</th>
            <th style={thTdStyle}>User ID</th>
            <th style={thTdStyle}>Adoption Date</th>
            <th style={thTdStyle}>Status</th>
          </tr>
        </thead>
        <tbody>
          {adoptions.map((adoption) => (
            <tr key={adoption.adoptionId}>
              <td style={thTdStyle}>{adoption.adoptionId}</td>
              <td style={thTdStyle}>{adoption.petId}</td>
              <td style={thTdStyle}>{adoption.userId}</td>
              <td style={thTdStyle}>{new Date(adoption.adoptionDate).toLocaleDateString()}</td>
              <td style={thTdStyle}>{adoption.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='btn btn-primary' style={{ margin: '20px' }} onClick={gotoAdoptPage}>Adopt now</button>
    </div>
  );
};

export default UserAdoptionsTable;
