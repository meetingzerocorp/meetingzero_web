import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import * as experimentsActions from 'app/workshop/stages/experiments/actions';

const TaskAssignments = ({ existingTask, allWorkshopMembers, toggleRaciModal }) => {
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

  return (
    <div className="row mb-2">
      <div className="col-2">
        {submittedTask ?
          <div
            onClick={() => setSubmittedTask(null)}
            className="border border-success rounded p-1 cursor-pointer"
          >
            {submittedTask}
          </div>
        :
          <textarea
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={handleSubmit}
            className="form-control h-100"
            placeholder="Your Task"
            value={task}
          />
        }
      </div>

      {allWorkshopMembers.map((wm) => {
        return (
          <div key={wm.id} className="col-2">
            <div className="d-flex h-100">
              <button
                onClick={() => toggleRaciModal(true, wm.user_id, existingTask.id)}
                type="button"
                className="btn btn-link text-muted btn-block"
                disabled={submittedTask ? false : true}
              >
                  + Assign
                </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TaskAssignments;