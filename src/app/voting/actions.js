import axiosInstance from '../../config/axios';

import loadingSlice from '../loading/slice';
import votingSlice from './slice';

export const saveVote = (workshopToken, resourceId, resourceModelName, voteNum) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_VOTE'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/star_voting_votes`, {
      resource_id: resourceId,
      resource_model_name: resourceModelName,
      vote_number: voteNum
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_VOTE'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_VOTE'));

      throw err;
    });
  }
}

export const updateVote = (workshopToken, resourceId, resourceModelName, voteId, voteNum) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('SAVE_VOTE'));

    return axiosInstance()
    .put(`/api/v1/workshops/${workshopToken}/star_voting_votes/${voteId}`, {
      resource_id: resourceId,
      resource_model_name: resourceModelName,
      vote_number: voteNum
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_VOTE'));

      return response.data;
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('SAVE_VOTE'));

      throw err;
    });
  }
}

export const calculateVotingResults = (workshopToken, resourceModelName) => {
  return (dispatch) => {
    dispatch(loadingSlice.actions.startLoading('CALCULATING_VOTING_RESULTS'));

    return axiosInstance()
    .post(`/api/v1/workshops/${workshopToken}/star_voting_votes/calculate-votes`, {
      resource_model_name: resourceModelName
    })
    .then((response) => {
      dispatch(loadingSlice.actions.stopLoading('CALCULATING_VOTING_RESULTS'));

      return dispatch(votingSlice.actions.setStarVotingResults({
        [resourceModelName]: response.data
      }));
    })
    .catch((err) => {
      dispatch(loadingSlice.actions.stopLoading('CALCULATING_VOTING_RESULTS'));

      throw err;
    });
  }
}