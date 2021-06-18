import React, { Component } from "react";
import { Navbar, Nav, Container } from 'react-bootstrap';


class NavBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <>
            <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                            <Nav.Link href="/" >Home</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
  }

}


export default () => {
  return (
    <NavBar />
)
};