
import { useNavigate } from 'react-router-dom';
import React, { Component } from "react";
import { UserContext } from "../context/UserContext";


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
export function clickLogOut() {
  localStorage.removeItem('user');
}
class SiteBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
        this.toggle = this.toggle.bind(this);
    }

    toggle = (e) => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        this.useNavigate('/login')
        
    }



    render() {
        let btnTxt = this.state.isOpen ? 'Login' : 'Logout';
        
        return (
            <div>
                <Navbar color="faded"  light expand="md">
                    <NavbarBrand href="/">Timesheet Log</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink href="/about">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/register">Registration</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/dashboard">Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/admin">Admin</NavLink>
                            </NavItem>
                            <NavItem>
                                <Button  onClick={e=>this.toggle(e)}>{btnTxt}
                                </Button>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }

}

export default SiteBar;

