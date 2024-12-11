import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Backend API URL

export const updatePassword = async (token, oldPassword, newPassword) => {
  const response = await axios.put(
    `${API_URL}/resetPassword`, // Endpoint to update the password
    { oldPassword, newPassword },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Sending token for authentication
      },
    }
  );
  return response.data; // Return success message or data if needed
};
