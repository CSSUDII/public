import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import config from "../../config";

const Profile = () => {
  const [dashboard, setDashboard] = useState(null);
  const history = useHistory();

  const logout = () => {
    /* eslint-disable */
    const toLogout = confirm("Are you sure to logout ?");
    /* eslint-enable */
    if (toLogout) {
      localStorage.clear();
      history.push("/login");
    }
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
      <body class="loggedin">
          <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.1/css/all.css"></link>
		<div class="content">
			<h2>Account Information</h2>
			<div>
				<p>Your account details:</p>
				<table>
					<tr>
						<td>Username:</td>
						<td>{dashboard?.name}</td>
					</tr>
					<tr>

					</tr>
					<tr>
						<td>Email:</td>
						<td>{dashboard?.email}</td>
					</tr>

          <tr>
						<td>Account ID:</td>
						<td>{dashboard?._id}</td>
					</tr>
				</table>
			</div>
		</div>
	</body>
      </div>
    </>
  );
};

export default Profile;
