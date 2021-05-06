import React from "react";
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
      body: JSON.stringify({ name: 'Lucas', email: 'nsx1luke@gmail.com', password: '00LLiver' }),
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

  localStorage.setItem("token", data);

  return (
    <div>
    <pre> 
    <code>
    <p>Your Token: {data}</p>
    </code>
    </pre>
  </div>
  )
}

}

export default Login;
