import axios from "axios";

export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`/api/v1/projects/${projectId}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const postNewItem = async (projectId, newItem) => {
  try {
    const response = await axios.post(`/api/v1/projects/${projectId}/items`, newItem);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchItem = async (projectId, itemId, data) => {
  try {
    const response = await axios.patch(`/api/v1/projects/${projectId}/items/${itemId}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteItemfromServer = async (projectId, itemId) => {
  try {
    await axios.delete(`/api/v1/projects/${projectId}/items/${itemId}`);
    return true;
  } catch (error) {
    throw error;
  }
};