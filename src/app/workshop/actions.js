import axiosInstance from '../../config/axios';

import loadingSlice from '../loading/slice';
import workshopSlice from '../workshop/slice';

export const createWorkshop = (workshop, emails, dateTimeSelected) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('CREATING_NEW_WORKSHOP'));

    return axiosInstance()
    .post('/api/v1/workshops', {
      purpose: workshop.purpose,
      template: "BRANCH_1",
      emails,
      date_time_selected: dateTimeSelected
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_WORKSHOP'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('CREATING_NEW_WORKSHOP'));

      throw err.response.data;
    });
  }
}

export const getDirector = (workshopId) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WORKSHOP_DIRECTOR'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopId}/director`)
    .then((response) => {
      return dispatch(workshopSlice.actions.setWorkshopDirector(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP_DIRECTOR'));

      throw err;
    });
  }
}

export const getCurrentStep = (workshopId) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_CURRENT_WORKSHOP_STEP'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopId}/director/current`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_CURRENT_WORKSHOP_STEP'));

      return dispatch(workshopSlice.actions.setCurrentWorkshopStep(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_CURRENT_WORKSHOP_STEP'));

      throw err;
    });
  }
}

export const getWorkshop = (workshopId) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('GET_WORKSHOP'));

    return axiosInstance()
    .get(`/api/v1/workshops/${workshopId}`)
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP'));

      return dispatch(workshopSlice.actions.setWorkshop(response.data));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('GET_WORKSHOP'));

      throw err;
    });
  }
}