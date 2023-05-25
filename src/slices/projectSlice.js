import { createSlice } from "@reduxjs/toolkit";
import { getProjectById, postNewItem, deleteItemfromServer, patchItem } from "../services/projectService";

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
        ...projectData || [],
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
    setItemProperty: (state, action) => {
      const { itemId, property, value } = action.payload;
      const itemIndex = state.data.items.findIndex((item) => item._id === itemId);
      if (itemIndex !== -1) {
        state.data.items[itemIndex][property] = value;
      }
    },
    addItem: (state, action) => {
      state.data.items.push(action.payload);
    },
    updateItem: (state, action) => {
      const { itemId, data } = action.payload;
      const itemIndex = state.data.items.findIndex((item) => item._id === itemId);
      if (itemIndex !== -1) {
        state.data.items[itemIndex] = data;
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload.toString();
      state.data.items = state.data.items.filter(item => item._id.toString() !== itemId);
    }
  },
});

export const {
  setProject,
  clearProject,
  setLoading,
  setError,
  setItemProperty,
  addItem,
  updateItem,
  removeItem,
  
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

export const addItemToProject = (newItem) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    const projectId = getState().project.data._id;
    // create placeholder item for quick render
    dispatch(addItem(newItem));
    // post and recieve proper item from api
    const response = await postNewItem(projectId, newItem);
    // isRendered property bypasses transition animation for seamless replacement of placeholder item
    response.data.isRendered = true;
    response.data.isNew = true;
    dispatch(updateItem({
      itemId: newItem._id,
      data: response.data}));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateItemProperty = (data) => async ( dispatch, getState ) => {
  try {
    dispatch(setLoading(true));
    const projectId = getState().project.data._id;
    dispatch(setItemProperty(projectId, data));
    if (data.property !== "isRendered") {
      console.log(data);
      console.log(await patchItem(projectId, data));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateItemPosition = (destinationItemId, sourceItemId, index) => async ( dispatch, getState ) => {
  try {
    // todo
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteItem = (itemId) => async (dispatch, getState) => {
  try {
    dispatch(setLoading(true));
    dispatch(removeItem(itemId));
    const projectId = getState().project.data._id;
    await deleteItemfromServer(projectId, itemId);
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export default projectSlice.reducer;