import { createSlice } from "@reduxjs/toolkit";
import { getProjectById } from "../services/projectService";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProject: (state, action) => {
       const projectData = action.payload;
       state.data = {
        ...projectData,
        items: projectData.items || [] // avoiding error while debugging 
       }
    },
    clearProject: (state) => {
      state.data = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProject, clearProject, setLoading, setError } = projectSlice.actions;

export const fetchProject = (projectId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const projectData = await getProjectById(projectId);
    dispatch(setProject(projectData));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default projectSlice.reducer;