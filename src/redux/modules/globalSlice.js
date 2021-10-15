import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {

  sidebar: {
    sidebarOpen: true,

    sidebarNewsOpen: false,
    sidebarRewardOpen: false,
    sidebar360Open: false,
    sidebarConnectOpen: false,
    sidebarAdminOpen: false,
  }
}



export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    toggleSidebar: (state, action) => {
      state.sidebar.sidebarOpen = action.payload;
    },
    toggleNewsSidebar: (state, action) => {
      state.sidebar.sidebarNewsOpen = action.payload;
    },
    toggleRewardSidebar: (state, action) => {
      state.sidebar.sidebarRewardOpen = action.payload;
    },
    toggle360Sidebar: (state, action) => {
      state.sidebar.sidebar360Open = action.payload;
    },
    toggleConnectSidebar: (state, action) => {
      state.sidebar.sidebarConnectOpen = action.payload;
    },
    toggleAdminSidebar: (state, action) => {
      state.sidebar.sidebarAdminOpen = action.payload;
    },

  },

})

// Action creators are generated for each case reducer function
export const { toggleSidebar, toggleNewsSidebar, toggleRewardSidebar, toggle360Sidebar, toggleConnectSidebar, toggleAdminSidebar } = globalSlice.actions

export default globalSlice.reducer

