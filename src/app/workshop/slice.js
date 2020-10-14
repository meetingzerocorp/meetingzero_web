import { createSlice } from '@reduxjs/toolkit';

const workshopSlice = createSlice({
  name: 'Workshop',
  initialState: {
    workshopDirector: null,
    currentWorkshopStep: null,
    workshop: null,
    workshopMembers: [],
    myWorkshops: [],
    workshopSummary: null
  },
  reducers: {
    setWorkshopDirector: (state, action) => {
      state.workshopDirector = action.payload;

      return state;
    },
    setCurrentWorkshopStep: (state, action) => {
      state.currentWorkshopStep = action.payload;

      return state;
    },
    setWorkshop: (state, action) => {
      state.workshop = action.payload;

      return state;
    },
    setWorkshopMembers: (state, action) => {
      state.workshopMembers = action.payload;

      return state;
    },
    setMyWorkshops: (state, action) => {
      state.myWorkshops = action.payload.map((ap) => {
        return ap.workshop;
      });

      return state;
    },
    setWorkshopSummary: (state, action) => {
      state.workshopSummary = action.payload;

      return state;
    }
  }
});

export default workshopSlice;
