import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import LogoSplitLayout from '../../layouts/LogoSplit';
import Button from '../../library/Button';
import CharacterCounter from '../../library/CharacterCounter';
import TagsInput from '../../library/TagsInput';

import * as workshopActions from '../../app/workshop/actions';

const CreateWorkshop = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  const [emails, setEmails] = React.useState([]);
  const [workshopPurpose, setWorkshopPurpose] = React.useState("");
  const [charCountExceeded, setCharCountExceeded] = React.useState(false);
  const [dateTimeSelected, setDateTimeSelected] = React.useState(null);

  const onSubmit = (formData) => {
    const dateTimeSelectedUtc = moment(dateTimeSelected)
    .utc()
    .toISOString();

    dispatch(workshopActions.createWorkshop(formData, emails, dateTimeSelectedUtc))
    .then((newWorkshop) => {
      history.push(`/workshop/${newWorkshop.workshop_token}/start`);
    });
  }

  const handleChange = (event) => {
    setWorkshopPurpose(event.target.value);
  }

  const handleExceed = (isExceeded) => {
    setCharCountExceeded(isExceeded);
  }

  const isLoading = useSelector((state) => {
    return state.Loading.indexOf("CREATING_NEW_WORKSHOP") >= 0;
  });

  const handleEmailChange = (emails) => {
    return setEmails(emails);
  }

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right mb-5">
          <Button href="/join-workshop" text="Cancel" />
        </div>

        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5 text-center">
              Create Workshop
            </div>

            <textarea onChange={handleChange} ref={register({ required: true, maxLength: 140 })} name="purpose" className={cn("form-control mb-1", charCountExceeded ? 'bg-scary' : null)} placeholder="Purpose of workshop..."></textarea>

            <div className="row mb-10">
              <div className="col-6">
                {errors.purpose ?
                  <div className="small text-danger">
                    Please enter a workshop name of 140 characters or less
                  </div>
                : null}
              </div>

              <div className="col-6">
                <CharacterCounter
                  className="text-right"
                  maxChars={140}
                  inputString={workshopPurpose}
                  onExceed={handleExceed}
                />
              </div>
            </div>

            <TagsInput
              className="form-control border-top-0 border-left-0 border-right-0 rounded-0 mb-1"
              value={emails}
              onChange={handleEmailChange}
              onlyUnique={true}
              placeholder="Invite Attendees"
            />

            <div className="text-right mb-2">
              Separate emails with the tab or enter key
            </div>

            <div className="mb-2">
              Select Date and Time
            </div>

            <div className="mb-5">
              <DateTimePicker 
                value={dateTimeSelected}
                onChange={setDateTimeSelected}
              />
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
    </LogoSplitLayout>
  );
}

export default CreateWorkshop;