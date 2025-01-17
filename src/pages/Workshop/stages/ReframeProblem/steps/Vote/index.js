import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import StarVoter from 'pages/Workshop/library/StarVoter';
import ProTip from 'library/ProTip';

import * as reframeProblemActions from 'app/workshop/stages/reframe_problem/actions';
import reframeProblemSlice from 'app/workshop/stages/reframe_problem/slice';

const Vote = () => {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(
      reframeProblemActions
      .getAllResponses(params.workshop_token, true)
    );
  }, [dispatch, params.workshop_token]);

  const allReframeProblemResponses = useSelector((state) => {
    return state.ReframeProblem.allReframeProblemResponses;
  });

  const updateReframeProblemResponses = (responseData) => {
    dispatch(
      reframeProblemSlice
      .actions
      .setAllReframeProblemResponses(responseData)
    );
  }

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Vote</h1>

      <h5 className="mb-4">Evaluate the importance of each item addressed.</h5>

      <StarVoter
        workshopToken={params.workshop_token}
        votingItems={allReframeProblemResponses}
        modelName="ReframeProblemResponse"
        handleUpdateData={updateReframeProblemResponses}
      />

      <ProTip
        mainText="If you're stuck, go with your gut."
      />
    </React.Fragment>
  );
}

export default Vote;
