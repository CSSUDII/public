import React, { Component } from "react";
import { Media } from "react-bootstrap";
class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <React.Fragment>
          <div>
            <center>
              <h1>CSSUDII API</h1>
              <h1>CSSUDII API</h1>
            </center>
          </div>
        </React.Fragment>
        <Media>
          <img
            width={64}
            height={64}
            className="mr-3"
            src="holder.js/64x64"
            alt="Generic placeholder"
          />
          <Media.Body>
            <h5>Example Heading</h5>
            <p>
              Example
            </p>
          </Media.Body>
        </Media>
      </>
    );
  }
}

export default () => {
  return <Home />;
};

