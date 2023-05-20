import { createSlice } from "@reduxjs/toolkit";
import { getProjectById, postNewItem } from "../services/projectService";

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
        items: projectData.items || [],
      };
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
    setisNew: (state, action) => {
      state.data.items[action.payload] = false;
    },
    addItem: (state, action) => {
      state.data.items.push(action.payload);
    },
  },
});

export const {
  setProject,
  clearProject,
  setLoading,
  setError,
  addItem,
} = projectSlice.actions;

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

// this will be unreponsive on a server delay
// opportunity to update store first then update again.
export const addItemToProject = (newItem) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const projectId = getState().project.data._id;
    const response = await postNewItem(projectId, newItem);
    const updatedItem = { ...response.data, isNew: true };
    dispatch(addItem(updatedItem));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateItemProperty = (newItem) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const projectId = getState().project.data._id;
    const response = await postNewItem(projectId, newItem);
    const updatedItem = { ...response.data, isNew: true };
    dispatch(addItem(updatedItem));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default projectSlice.reducer;