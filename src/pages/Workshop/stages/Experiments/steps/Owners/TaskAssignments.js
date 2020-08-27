import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';

const TaskAssignments = ({ existingTask, mappableMembers, toggleRaciModal, editable }) => {
  const params = useParams();
  const dispatch = useDispatch();

  const [task, setTask] = React.useState("");
  const [submittedTask, setSubmittedTask] = React.useState(null);

  React.useEffect(() => {
    if (existingTask) {
      setTask(existingTask.response_text);
      setSubmittedTask(existingTask.response_text);
    }
  }, [existingTask]);

  const handleSubmit = (event) => {
    if (event.which === 13) {
      if (existingTask) {
        dispatch(
          experimentsActions
          .updateTask(params.workshop_token, existingTask.id, task)
        ).then(() => {
          setSubmittedTask(task);
        });
      } else {
        dispatch(
          experimentsActions
          .saveTask(params.workshop_token, task)
        ).then(() => {
          setSubmittedTask(task);
        });
      }
    }
  }

  const workshop = useSelector((state) => {
    return state.Workshop.workshop;
  });

  return (
    <div className="row">
      <div className="col-2 py-1">
        {submittedTask ?
          <div
            onClick={() => {
              if (workshop.is_host && editable) {
                setSubmittedTask(null)
              }
            }}
            className={`border border-success rounded p-1 h-100 ${workshop.is_host && editable ? "cursor-pointer" : null}`}
          >
            {submittedTask}
          </div>
        :
          <React.Fragment>
            {workshop.is_host && editable ?
              <textarea
                onChange={(event) => setTask(event.target.value)}
                onKeyDown={handleSubmit}
                className="form-control h-100"
                placeholder="Your Task"
                value={task}
              />
            : null}
          </React.Fragment>
        }
      </div>

      {mappableMembers.map((wm, index) => {
        let assignedTask = null;

        if (existingTask) {
          for (let i = 0; i < existingTask.experiment_task_assignments.length; i++) {
            if (existingTask.experiment_task_assignments[i].user_id === wm.user_id) {
              assignedTask = existingTask.experiment_task_assignments[i];
            }
          }
        }

        return (
          <div key={wm.id} className={`col-2 border-left py-1 ${index + 1 === mappableMembers.length ? "border-right" : null}`}>
            <div className="d-flex h-100">
              {assignedTask ?
                <button
                  onClick={() => {
                    if (workshop.is_host && editable) {
                      toggleRaciModal(true, wm.user_id, existingTask)
                    }
                  }}
                  className={`btn btn-block btn-square ${assignedTask.assignment_text.toLowerCase()}-button`}
                >
                  {assignedTask.assignment_text}
                </button>
              :
                <React.Fragment>
                  {workshop.is_host && editable ?
                    <button
                      onClick={() => toggleRaciModal(true, wm.user_id, existingTask)}
                      type="button"
                      className="btn btn-link text-muted btn-block btn-square"
                      disabled={submittedTask ? false : true}
                    >
                      + Assign
                    </button>
                  : null}
                </React.Fragment>
              }
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskAssignments;