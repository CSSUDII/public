import React, { Component } from "react";

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
                        <h1>404 Page Not Found</h1>
                        <h1>404 Page Not Found</h1>
                    </center>
                </div>
            </React.Fragment>
        </>
    );
  }

}


export default () => {
  return (
    <Home />
)
};
