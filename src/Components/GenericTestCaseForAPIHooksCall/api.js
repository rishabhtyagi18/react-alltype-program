// src/api/apiClient.js

// src/api/apiClient.js
export const getData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('API Error');
    }
    return await response.json();
  };  

// You can add putData, deleteData similarly
