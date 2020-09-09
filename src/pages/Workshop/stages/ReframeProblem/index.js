import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import WorkshopApp from 'pages/Workshop/containers/WorkshopApp';
import Response from './steps/Response';
import Vote from './steps/Vote';
import ReviewVotes from './steps/ReviewVotes';

import * as workshopActions from 'app/workshop/actions';
import * as votingActions from 'app/voting/actions';

const ReframeProblem = () => {
  const dispatch = useDispatch();

  const currentWorkshopStep = useSelector((state) => {
    return state.Workshop.currentWorkshopStep;
  });

  const currentStepKey = currentWorkshopStep.workshop_stage_step.key;

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  const onTimerExpired = () => {
    if (workshop.is_host) {
      const workshopStageStepId = currentWorkshopStep.workshop_stage_step_id;

      dispatch(
        votingActions
        .calculateVotingResults(workshop.workshop_token, "ReframeProblemResponse")
      )
      .then(() => {
        dispatch(workshopActions.completeWorkshopStep(workshop.workshop_token, workshopStageStepId));
      });
    }
  }

  if (currentStepKey === "REFRAME_PROBLEM_RESPONSE") {
    return (
      <WorkshopApp>
        <Response />
      </WorkshopApp>
    );
  } else if (currentStepKey === "REFRAME_PROBLEM_VOTE") {
    return (
      <WorkshopApp onTimerExpired={onTimerExpired}>
        <Vote />
      </WorkshopApp>
    );
  } else if (currentStepKey === "REFRAME_PROBLEM_REVIEW_VOTES") {
    return (
      <WorkshopApp>
        <ReviewVotes />
      </WorkshopApp>
    );
  }
}

export default ReframeProblem;