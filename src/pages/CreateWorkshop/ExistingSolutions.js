import React from 'react';

import { HUMAN_COUNTING } from 'constants/englishNumbers';

import { DynamicTextarea } from 'library/TextArea/index';

const ExistingSolutions = ({
  formInstance,
  setPssConfigComplete
}) => {
  return (
    <React.Fragment>
      <div className="mb-2">
        <div className="mb-1">
          What are your solutions you want to explore?
        </div>

        <DynamicTextarea
          formInstance={formInstance}
          name="existing_solutions"
          startingNumInputs={3}
          removable={true}
          placeholder={(index) => {
            return `${HUMAN_COUNTING[index + 1]} solution`;
          }}
          className="mb-3"
          onSubmit={() => setPssConfigComplete(true)}
        />
      </div>
    </React.Fragment>
  );
}

export default ExistingSolutions;
