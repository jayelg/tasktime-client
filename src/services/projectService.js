import axios from "axios";

export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`/api/v1/projects/${projectId}`, {
      retry: 3, 
      retryDelay: 1000, 
      shouldRetry: (error) => true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const postNewItem = async (projectId, newItem) => {
  try {
    const response = await axios.post(`/api/v1/projects/${projectId}/items`, newItem, {
      retry: 3, 
      retryDelay: 1000, 
      shouldRetry: (error) => true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchItem = async (projectId, data) => {
  const { itemId, property, value } = data;
  try {
    const response = await axios.patch(`/api/v1/projects/${projectId}/items/${itemId}`, {[property]: value}, {
      retry: 3, 
      retryDelay: 1000, 
      shouldRetry: (error) => true,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItemfromServer = async (projectId, itemId) => {
  try {
    await axios.delete(`/api/v1/projects/${projectId}/items/${itemId}`, {
      retry: 3, 
      retryDelay: 1000, 
      shouldRetry: (error) => true,
    });
    return true;
  } catch (error) {
    throw error;
  }
};