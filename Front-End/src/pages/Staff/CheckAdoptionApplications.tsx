import React, { useState, useEffect } from 'react';
import StaffPetDetailsModal from './staffPetDetailsModal';
import AdopterDetailsModal from './AdopterDetailsModal'; 
import './CheckAdoptionApplications.css';
import { httpRequest } from '../../HttpProxy';

interface AdoptionRequest {
  adoptionId: number;
  petId: number;
  userId: number;
  adoptionDate: string;
  status: 'reject' | 'accept' | 'pending';
}

const CheckAdoptionApplications: React.FC = () => {
  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const Staff_MemberID = 1; // Hardcoded shelter ID
    const fetchData = async () => {
      try {
        const response = await httpRequest('get', `/api/adoptions/get_adoptions_by_staffId?staffId=${Staff_MemberID}`);
        if (response.status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data: AdoptionRequest[] = response.data;
        setRequests(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (adoptionId: number, newStatus: string) => {
    if (newStatus === 'reject' || newStatus === 'accept' || newStatus === 'pending') {
      setRequests(requests.map(request => 
        request.adoptionId === adoptionId ? { ...request, status: newStatus as 'reject' | 'accept' | 'pending' } : request
      ));
    }
  };

  const handleSubmit = async () => {
    try {
      let allRequestsProcessed = true;
  
      for (const request of requests) {
        const response = await httpRequest('put', `/api/adoptions/change_adoption_status?id=${request.adoptionId}&status=${request.status}`);
        if (response.status !== 200) {
          console.error('Failed to update status for request:', request.adoptionId);
          allRequestsProcessed = false;
          break; // Stop processing further if any request fails
        }
      }
  
      if (allRequestsProcessed) {
        setUpdateMessage('All requests updated successfully!');
      } else {
        setUpdateMessage('Failed to update some requests. Please check the logs.');
      }
      setTimeout(() => setUpdateMessage(''), 5000);
    } catch (error) {
      setUpdateMessage('An error occurred. Please try again.');
      setTimeout(() => setUpdateMessage(''), 5000);
      console.error('Error in updating requests:', error);
    }
  };
    // Styles
    const tableStyle = {
      width: '100%',
      borderCollapse: 'collapse' as 'collapse',
      marginTop: '20px',
    };
  
    const thTdStyle = {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'left' as 'left',
    };
  
    const buttonStyle = {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '6px 12px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      
      
      marginTop: 'auto',
    };
  
    const notificationStyle = {
      margin: '20px 0',
      padding: '10px',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb',
      borderRadius: '4px',
    };
    const fullHeightStyle = {
      width: '100vh',
      minheight: '100vh',
      overflowY: 'auto' as 'auto',
      padding: '20px',
    };

    const containerStyle = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      minWidth: '100vw',
      padding: '20px',
      boxSizing: 'border-box' as 'border-box',
    };

  
  

    return (
      <div className="requests-staff" style={containerStyle}>
        
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thTdStyle}>ID</th>
              <th style={thTdStyle}>Pet ID</th>
              <th style={thTdStyle}>User ID</th>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.adoptionId}>
                <td style={thTdStyle}>{request.adoptionId}</td>
                <td style={thTdStyle}>{request.petId}</td>
                <td style={thTdStyle}>{request.userId}</td>
                <td style={thTdStyle}>{new Date(request.adoptionDate).toLocaleDateString()}</td>
                <td style={thTdStyle}>
                  <select 
                    value={request.status} 
                    onChange={(e) => handleStatusChange(request.adoptionId, e.target.value)}
                    style={{ padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                  >
                    <option value="reject">Reject</option>
                    <option value="accept">Accept</option>
                    <option value="pending">Pending</option>
                  </select>
                  
                </td>
                
              </tr>
              
            ))}
          </tbody>
        </table>
        <button style={buttonStyle} onClick={handleSubmit}>Submit Requests</button>
        {updateMessage && <div style={notificationStyle}>{updateMessage}</div>}
      </div>
    );
  };
  

export default CheckAdoptionApplications;
