import React from 'react';

const HelperText = ({
  pssKey,
  showPreparation
}) => {
  return (
    <div className="border p-2 mx-auto bg-white rounded mt-10" style={{maxWidth: 370}}>
      {pssKey === "GENERAL_TOPIC" && !showPreparation ?
        <React.Fragment>
          <div className="text-muted mb-2">
            Examples
          </div>

          <ul className="mb-2">
            <li>The conversion flow of our checkout</li>
            <li>Our internal design process</li>
            <li>Improving our office environment</li>
            <li>How we organise events</li>
            <li>Keeping up with our competition</li>
            <li>Improving sales flow</li>
            <li>Tactics for the next sales push</li>
          </ul>

          <div className="text-muted mb-2">
            Broad topic
          </div>

          <div className="mb-2">
            This is a statement. It is not an opinion, question, problem, assumption, or solution.
          </div>

          <div className="text-muted mb-2">
            Workshop time: Maximum of ~54 minutes
          </div>

          <div className="mb-2">
            Step 1 - Explore the problem space around a broad topic, vote across problems to select the initial winner, and then reframe the winning problem and vote again to come to a final decision on the problem to solve
          </div>

          <div className="mb-2">
            Step 2 - Draft the opportunity question
          </div>

          <div className="mb-2">
            Step 3 - Generate solutions, and then vote to find a winner to test
          </div>

          <div className="mb-2">
            Step 4 - Create a hypothesis for an experiment to test
          </div>

          <div>
            Step 5 - Assign tasks to team members
          </div>
        </React.Fragment>
      : null}

      {pssKey === "MANY_EXISTING_PROBLEMS" && !showPreparation ?
        <React.Fragment>
          <div className="text-muted mb-2">
            Examples
          </div>

          <ul className="mb-2">
            <li>The conversion flow of our checkout</li>
            <li>Our internal design process</li>
            <li>Improving our office environment</li>
            <li>How we organise events</li>
            <li>Keeping up with our competition</li>
            <li>Improving sales flow</li>
            <li>Tactics for the next sales push</li>
          </ul>

          <div className="text-muted mb-2">
            Broad topic
          </div>

          <div className="mb-2">
            This is a statement. It is not an opinion, question, problem, assumption, or solution.
          </div>

          <div className="text-muted mb-2">
            Workshop time: Maximum of ~40 minutes
          </div>

          <div className="mb-2">
            Step 1 - Vote across problems to select the initial winner, and then reframe the winning problem and vote again to come to a final decision on the problem to solve
          </div>

          <div className="mb-2">
            Step 2 - Draft the opportunity question
          </div>

          <div className="mb-2">
            Step 3 - Generate solutions, and then vote to find a winner to test
          </div>

          <div className="mb-2">
            Step 4 - Create a hypothesis for an experiment to test
          </div>

          <div>
            Step 5 - Assign tasks to team members
          </div>
        </React.Fragment>
      : null}

      {pssKey === "EXISTING_SOLUTIONS" && !showPreparation ?
        <React.Fragment>
          <div className="h1 mb-2">
            Examples
          </div>

          <ul>
            <li>I want to add a messaging feature</li>
            <li>We should increase the price of our enterprise membership to $20 per month</li>
            <li>We should add an interactive onboarding experience so first time users have a better sense of what our app does</li>
          </ul>
        </React.Fragment>
      : null}

      {!pssKey ?
        <React.Fragment>
          <div className="text-muted mb-2">
            Workshop type
          </div>

          <p>
            To be outcome-driven, we recommend running this workshop every Monday morning (starting at any problem-solving stage step) and review results no longer than every other Friday afternoon.
          </p>
        </React.Fragment>
      : null}

      {showPreparation ?
        <React.Fragment>
          <div className="h1 mb-2">
            Preparation and invitations
          </div>

          <p>
            Is there anything you want your teammates to catch up on before this? Applicable metrics, any relevant articles?
          </p>

          <p>
            Make sure you invite the right people. This works best with a cross-functional team.
          </p>
        </React.Fragment>
      : null}
    </div>
  );
}

export default HelperText;