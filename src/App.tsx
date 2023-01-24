import * as React from 'react';
import './css/style.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from 'react-router-dom';

import {
  LoginView,
  RESCalculatorView,
  UserArithmeticRecordsView,
} from './views';

import { lambdaURLS } from './config';
import { useState, useEffect } from 'react';

// MARK: Protect the routes
const ProtectedRoute = ({ children, session }) => {
  console.log(session);

  const navigate = useNavigate();
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    if (!session.isSessionAlive && !navigating) {
      setNavigating(true);
      navigate('/', { replace: true });
    }
  }, [session.isSessionAlive, navigate, navigating]);

  return session.isSessionAlive || navigating ? children : null;
};

export default function App() {
  // State
  const [session, updateSession] = useState({ isSessionAlive: false });

  console.log(session);

  // MARK: Event Handlers
  // =======================================
  // Handle Authentication with Amazon AWS
  const loginHandler = async (credentials): Promise<boolean> => {
    console.log('app', credentials);

    let body = JSON.stringify(credentials);

    console.log(body);

    let res = await fetch(lambdaURLS.authURL, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    let json = await res.json();

    if (json.error) return false;

    // const info = {
    //   status: 'active',
    //   date: '2023-01-23T06:28:40.894Z',
    //   balance: 100,
    //   userID: 4,
    //   username: 'abc@loanpro.com',
    //   sessionToken: 'abc4',
    // };

    updateSession({
      isSessionAlive: true,
      ...json,
    });

    return true;
  };

  // Handle Logging Out
  const loggingOutHandler = () => {
    updateSession({ isSessionAlive: false });
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={<LoginView loginHandler={loginHandler} />}
            />

            <Route
              path="/calculator"
              element={
                <ProtectedRoute session={session}>
                  <RESCalculatorView
                    userInfo={session}
                    loggingOutHandler={loggingOutHandler}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/records"
              element={
                <ProtectedRoute session={session}>
                  <UserArithmeticRecordsView />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}
