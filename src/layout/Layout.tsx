import React, { PropsWithChildren } from "react";
import { Container, Navbar, NavbarBrand } from "reactstrap";
import SiteNavMenu from "./SiteNavMenu";

const Layout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Container fluid className="layout">
      <Navbar dark color="dark">
        <NavbarBrand>
          Team Manager
        </NavbarBrand>
      </Navbar>
      <Container className="content">
        <SiteNavMenu />
        {children}
      </Container>
    </Container>
  );
}

export default Layout;