import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import LogoSplitLayout from 'layouts/LogoSplit';
import SignOutButton from 'library/SignOutButton';

import './Dashboard.scss';

import notepadImg from 'assets/images/notepad.svg';
import puzzleImg from 'assets/images/puzzle.svg';
import twinsImg from 'assets/images/twins.svg';

const Dashboard = () => {
  const currentUser = useSelector((state) => {
    return state.User.currentUser;
  });

  return (
    <LogoSplitLayout>
      <div className="p-2">
        <div className="text-right">
          <SignOutButton className="btn btn-link btn-square" />
        </div>

        <div className="container-small mt-10 absolute-center-y">
          {currentUser.first_name && currentUser.last_name ?
            <h1 className="text-center mb-8">Welcome, {currentUser.first_name}!</h1>
          : null}

          <div className="row">
            <div className="col-4">
              <Link to="/past-workshops" className="d-block">
                <img src={notepadImg} className="dashboard-images img-fluid d-block mx-auto mb-2" alt="Notepad" />

                <h5 className="text-center text-dark">Past Workshops</h5>
              </Link>
            </div>

            <div className="col-4">
              <Link to="/create-workshop" className="d-block">
                <img src={puzzleImg} className="dashboard-images img-fluid d-block mx-auto mb-2" alt="Puzzle" />

                <h5 className="text-center text-dark">Create Workshop</h5>
              </Link>
            </div>

            <div className="col-4">
              <Link to="/join-workshop" className="d-block">
                <img src={twinsImg} className="dashboard-images img-fluid d-block mx-auto mb-2" alt="Twins" />

                <h5 className="text-center text-dark">Join Workshop</h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </LogoSplitLayout>
  );
}

export default Dashboard;