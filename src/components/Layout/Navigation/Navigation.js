import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  Container
} from 'reactstrap';
import { Link } from "react-router-dom";
import Aux from '../../../hoc/Aux/Aux';
import './Navigation.css';

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <Aux>
        <Navbar className="navbar-dark bg-dark" expand="md">
          <Container>
            <Link to="/">React portfolio</Link>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {this.props.nav}                
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </Aux>
    );
  }
}

export default Navigation;