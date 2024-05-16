import React from "react";
import { Menu, Container} from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <Menu inverted fixed = 'top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Employee Management System
                </Menu.Item>
                <Menu.Item as={Link} to="/" name="Employee"/>
                <Menu.Item as={Link} to="/departments" name="Department"/>
            </Container>
        </Menu>
    )
}