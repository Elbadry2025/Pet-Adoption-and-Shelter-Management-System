
// Function to get the token from local storage
export const getToken = (): string | null => {
    return localStorage.getItem('token');
  };
  
  // Function to get the role from local storage
  export const getRole = (): string | null => {
    return localStorage.getItem('role');
  };
  
  // Function to get the userId from local storage
  export const getUserId = (): number | null => {
    const userId = localStorage.getItem('userId');
    return userId ? parseInt(userId) : null;
  };
  