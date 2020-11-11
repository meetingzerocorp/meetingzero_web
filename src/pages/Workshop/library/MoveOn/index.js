import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import OnlineMembers from './OnlineMembers';
import Button from 'library/Button';

import * as workshopActions from 'app/workshop/actions';

import "./MoveOn.scss";

const MoveOn = ({ workshopToken, workshopDirectorId }) => {
  const dispatch = useDispatch();

  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [readyUp, setReadyUp] = React.useState(false);

  const handleReadyUp = () => {
    dispatch(workshopActions.saveReadyMember(workshopToken, workshopDirectorId))
    .then(() => {
      setReadyUp(true);
      setShowConfirmation(false);
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("SAVING_READY_MEMBER") >= 0;
  });

  return (
    <React.Fragment>
      {readyUp ?
        <div className="modal-backdrop fade show" />
      : null}

      <div className="move-on-container">
        {readyUp ?
          <div className="move-on-dialog border border-black shadow p-3 mb-2">
            <div className="h5 mb-2">Waiting on the group</div>

            <OnlineMembers
              className="mb-2"
            />

            <div className="h5 mb-2">Forgot you had something else to fill out?</div>

            <div>
              <button
                onClick={() => setReadyUp(false)}
                className="btn btn-primary btn-square rounded px-4"
              >
                Go back
              </button>
            </div>
          </div>
        : null}

        {showConfirmation ?
          <div className="move-on-dialog border border-black shadow px-3 pb-3 mb-2">
            <div className="text-right">
              <button
                onClick={() => setShowConfirmation(false)}
                className="btn small btn-link text-danger btn-square"
              >
                Close
              </button>
            </div>

            <div className="h4 mb-2">Are you ready to move on?</div>

            <div className="mb-2">
              If you are finished before the time is up, you can click this and notify the team you are ready to move on.
            </div>

            <div>
              <Button
                onClick={handleReadyUp}
                className="btn btn-primary btn-square rounded px-4"
                text="I'm ready"
                loading={isLoading}
              />
            </div>
          </div>
        : null}

        {!showConfirmation && !readyUp ?
          <button
            onClick={() => setShowConfirmation(true)}
            className="btn btn-primary px-4 btn-block mb-2"
          >
            Move On
          </button>
        : null}

        {!readyUp ?
          <OnlineMembers
            className="justify-content-end"
          />
        : null}
      </div>
    </React.Fragment>
  );
}

export default MoveOn;