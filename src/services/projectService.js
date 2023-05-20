import axios from "axios";

export const getProjectById = async (projectId) => {
  try {
    const response = await axios.get(`/api/v1/projects/${projectId}`);
    console.log(response);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const postNewItem = async (projectId, newItem) => {
  try {
    const response = await axios.post(`/api/v1/projects/${projectId}/items`, newItem);
    console.log(response);
    return response.data;
  } catch (error) {
    throw error;
  }
};