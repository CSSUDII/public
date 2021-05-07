import React from "react";
import { Redirect } from "react-router";
import config from "../../config";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch(`${config.baseUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: '', email: '', password: '' }),
    })
        .then(res => res.json())
        .then(res => this.setState({ apiResponse: res }));
}

componentWillMount() {
    this.callAPI();
}

render() {

  console.log(this.state.apiResponse)
  const data = this.state.apiResponse.token;
  if (!data) return (
   <div>
     <form action="http://localhost:3000/v1/auth/login" method="POST" >
       Name: <input type="text" id="name" name="name" placeholder="Name"></input>
       Email: <input type="text" id="email" name="email" placeholder="Email"></input>
       Password: <input type="password" id="password" name="password" placeholder="Password"></input>
       <input type="submit" value="Submit"></input>
       {localStorage.setItem("name", document.getElementById("name"))}
       {localStorage.setItem("email", document.getElementById("email"))}
       {localStorage.setItem("password", document.getElementById("password"))}
       {console.log('Test ' + document.getElementById('password'))}
     </form>
   </div>
  )

  localStorage.setItem("token", data);

  return (
    <div>
    <pre> 
    <code>
    <p>Your Token: {data}</p>
    <Redirect to="/dashboard" />
    </code>
    </pre>
  </div>
  )
}

}

export default Login;
