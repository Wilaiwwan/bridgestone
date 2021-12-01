import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebar: {
    sidebarOpen: true,

    sidebarNewsOpen: true,
    sidebarRewardOpen: true,
    sidebar360Open: true,
    sidebarConnectOpen: true,
    sidebarPointOpen: true,
    sidebarReportOpen: true,
    sidebarAdminOpen: false,
  },
};

export const globalSlice = createSlice({
  name: "global",
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
    togglePointSidebar: (state, action) => {
      state.sidebar.sidebarPointOpen = action.payload;
    },
    toggleReportSidebar: (state, action) => {
      state.sidebar.sidebarReportOpen = action.payload;
    },
    toggleAdminSidebar: (state, action) => {
      state.sidebar.sidebarAdminOpen = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleSidebar,
  toggleNewsSidebar,
  toggleRewardSidebar,
  toggle360Sidebar,
  toggleConnectSidebar,
  togglePointSidebar,
  toggleReportSidebar,
  toggleAdminSidebar,
} = globalSlice.actions;

export default globalSlice.reducer;
