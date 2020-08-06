import React from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import "./ImpactEffort.scss";

import * as solutionsActions from 'app/workshop/stages/solutions/actions';

const ImpactEffort = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [newItemIndex, setNewItemIndex] = React.useState(null);

  React.useEffect(() => {
    dispatch(solutionsActions.getAllResponses(params.workshop_token));
  }, [dispatch, params.workshop_token]);

  const solutions = useSelector((state) => {
    return state.Solutions.allSolutionsResponses;
  });

  React.useEffect(() => {
    for (let i = 0; i < solutions.length; i++) {
      if (!solutions[i].solution_priority) {
        return setNewItemIndex(i);
      }
    }
  }, [solutions]);

  return (
    <React.Fragment>
      <h1 className="h2 mt-5">Evaluate Solutions</h1>

      <h5 className="mb-7">Drag and drop each solution (red dot) where you feel it's appropriate based off the impact it will have for your customers and for the business and what the effort needed will be to implement it.</h5>

      {solutions.length > 0 && newItemIndex !== null ?
        <div className="mb-7">
          <ImpactEffortItem
            number={newItemIndex + 1}
            text={solutions[newItemIndex].response_text}
            showText={true}
          />
        </div>
      : null}

      <div className="impact-effort-chart">
        <div className="title-top">
          High Impact
        </div>

        <div className="title-left">
          Low Effort
        </div>

        <div className="title-right">
          High Effort
        </div>

        <div className="title-bottom">
          Low Impact
        </div>

        <div className="impact-effort-chart-row">
          <div className="impact-effort-chart-quadrant border-right border-bottom border-dark">
            <span>Do Now</span>
          </div>

          <div className="impact-effort-chart-quadrant border-left border-bottom border-dark">
            <span>Make a Project</span>
          </div>
        </div>

        <div className="impact-effort-chart-row">
          <div className="impact-effort-chart-quadrant border-right border-top border-dark">
            <span>Make a Task</span>
          </div>

          <div className="impact-effort-chart-quadrant border-left border-top border-dark">
            <span>Forget for Now</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const ImpactEffortItem = ({ number, text, showText }) => {
  const [shouldShowText, setShowText] = React.useState(false);

  React.useEffect(() => {
    if (showText !== undefined) {
      setShowText(showText);
    }
  }, [showText]);

  return (
    <div onClick={() => setShowText(!shouldShowText)} className="ie-item">
      {number}

      <div className={cn("ie-content", shouldShowText ? "d-block" : "d-none")}>
        {text}
      </div>
    </div>
  );
}

export default ImpactEffort;