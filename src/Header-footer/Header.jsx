import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Collapse,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  NavbarToggler,
} from "reactstrap";
import './header-footer.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div className="header">
      <Navbar expand="md">
        <NavbarBrand href="/">Projects</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>           
            <NavItem>
              <NavLink to={"/"}>
              ModalComp
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to={"/TodoTask"}>
              TodoTask
              </NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
  ModalCompAddUserCodeDestructure;
}
