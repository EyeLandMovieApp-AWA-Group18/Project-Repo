const resetPassword = async (oldPassword, newPassword) => {
    const response = await axios.put('/api/auth/reset-password', { oldPassword, newPassword });
    return response.data;
};
