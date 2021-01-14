import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import cn from 'classnames';

import Button from 'library/Button';
import TagsInput from 'library/TagsInput';

import ProblemSolvingStepList from './ProblemSolvingStepList';
import GeneralTopic from './GeneralTopic';
import ExistingProblems from './ExistingProblems';
import ExistingSolutions from './ExistingSolutions';
import HelperText from './HelperText';
import StepOverlay from './StepOverlay';

import * as workshopActions from 'app/workshop/actions';

import "./CreateWorkshop.scss";

const CreateWorkshop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const formInstance = useForm();

  const [emails, setEmails] = React.useState([]);
  const [dateTimeSelected, setDateTimeSelected] = React.useState(null);
  const [showError, setShowError] = React.useState(false);
  const [showWarning, setShowWarning] = React.useState(false);
  const [problemSolvingStepSelected, setProblemSolvingStepSelected] = React.useState(null);
  const [showPssError, setShowPssError] = React.useState(false);
  const [showPreparationHelperText, setShowPreparationHelperText] = React.useState(false);

  const onSubmit = (formData) => {
    if (!problemSolvingStepSelected) {
      return setShowPssError(true);
    }
    
    if (emails.length < 2 || emails.length > 8) {
      setShowWarning(false);
      return setShowError(true);
    }

    const dateTimeSelectedUtc = moment(dateTimeSelected)
    .utc()
    .toISOString();

    if (!dateTimeSelected) {
      return;
    }

    return dispatch(workshopActions.createWorkshop(formData, emails, dateTimeSelectedUtc, problemSolvingStepSelected))
    .then(() => {
      history.push("/create-workshop-confirmation");
    });
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("CREATING_NEW_WORKSHOP") >= 0;
  });

  const handleEmailChange = (emails) => {
    setShowError(false);
    setShowWarning(false);

    if (emails.length < 5) {
      setShowWarning(true);
    }

    return setEmails(emails);
  }

  return (
    <div className="container-fluid container-fixed">
      <div className="row">
        <div className="col-7">
          <div className="p-2">
            <form onSubmit={formInstance.handleSubmit(onSubmit)}>
              <div className="row mb-5">
                <div className="col-4"></div>

                <div className="col-4">
                  <h3 className="text-center font-weight-bold">
                    Create Workshop
                  </h3>
                </div>

                <div className="col-4">
                  <div className="text-right">
                    <Button href="/dashboard" text="Cancel" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <select className="form-control">
                  <option>Workshop type</option>
                  <option>Kickoff experiment</option>
                </select>
              </div>

              <div className={cn(showPssError ? "mb-2" : "mb-4")}>
                <ProblemSolvingStepList
                  handleChange={(pssKey) => {
                    setProblemSolvingStepSelected(pssKey);
                    setShowPssError(false);
                    setShowPreparationHelperText(false);
                  }}
                />
              </div>

              {showPssError ?
                <div className="text-danger mb-2">
                  Please select a step
                </div>
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "GENERAL_TOPIC" ?
                <GeneralTopic
                  formInstance={formInstance}
                />
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "EXISTING_PROBLEMS" ?
                <ExistingProblems
                  formInstance={formInstance}
                />
              : null}

              {problemSolvingStepSelected && problemSolvingStepSelected === "EXISTING_SOLUTIONS" ?
                <ExistingSolutions
                  formInstance={formInstance}
                />
              : null}

              <div className="position-relative">
                <StepOverlay
                  text="Pre-workshop prep"
                  show={false}
                />

                <input
                  onFocus={() => setShowPreparationHelperText(true)}
                  ref={formInstance.register()}
                  name="preparation_instructions"
                  type="text"
                  className="form-control line-input mb-8"
                  placeholder="How can your teammates prepare? - Optional"
                />
              </div>

              <div className="position-relative">
                <StepOverlay
                  text="Invite attendees"
                  show={false}
                />
                
                <TagsInput
                  className="react-tagsinput-container mb-1"
                  value={emails}
                  onChange={handleEmailChange}
                  onlyUnique={true}
                  placeholder="Invite Attendees"
                />

                <div className="row mb-2">
                  <div className="col-6">
                      {showError ?
                        <div className="text-danger">
                          There must be between 3 and 9 people in this workshop
                        </div>
                      : null}

                      {showWarning ?
                        <div className="text-warning">
                          MeetingZero works best with more than 5 people
                        </div>
                      : null}
                  </div>

                  <div className="col-6">
                    <div className="text-right mb-2">
                      Separate emails with the tab or enter key
                    </div>
                  </div>
                </div>
              </div>

              <div className="position-relative">
                <StepOverlay
                  text="Select date and time"
                  show={false}
                />

                <div className="mb-2">
                  Select Date and Time
                </div>

                <div className="mb-5">
                  <DateTimePicker 
                    value={dateTimeSelected}
                    onChange={setDateTimeSelected}
                  />
                </div>
              </div>

              <div className="text-center mb-1">
                <Button type="submit" className="btn btn-primary px-5" text="Create workshop" loading={isLoading} />
              </div>

              <div className="mx-auto text-center text-muted small" style={{maxWidth: 200}}>
                Clicking create will send an invitation link and ID to members
              </div>
            </form>
          </div>
        </div>

        <div className="create-workshop-helper-column col-5">
          <HelperText
            pssKey={problemSolvingStepSelected}
            showPreparation={showPreparationHelperText}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateWorkshop;