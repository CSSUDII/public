import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import config from "../../config";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const history = useHistory();

  const logout = () => {
    /* eslint-disable */
      localStorage.clear();
      history.push("/login");
  };

  useEffect(() => {
    fetch(`${config.baseUrl}/auth/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then(({ error, data }) =>
        error ? history.push("/login") : setDashboard(data)
      );
  }, [history]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">
          CSSUDII API
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/dashboard">
                Dashboard <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <span
                className="nav-link cursor-pointer"
                onClick={() => logout()}
              >
                Logout
              </span>
            </li>
          </ul>
          <span className="navbar-text">Welcome, {dashboard?._id}</span>
        </div>
      </nav>
      <div className="px-3">
        <h1>Test: {dashboard?.title}</h1>
        <p>{dashboard?.content}</p>
      </div>
    </>
  );
};

export default Dashboard;
