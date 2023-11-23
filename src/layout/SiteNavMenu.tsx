import React from "react";
import { Nav } from "reactstrap";

import { faTachometerAlt, faListCheck } from '@fortawesome/pro-duotone-svg-icons';
import IconNavItem from "../comnponents/IconNavItem";

const SiteNavMenu: React.FC = () => {
  return (  
    <Nav vertical className="sidebar"> 
      <IconNavItem to="dashboard" icon={faTachometerAlt} tooltip="Dashboard" />
      <IconNavItem to="readyToCommit" icon={faListCheck} tooltip="Ready to Commit" />
    </Nav>
  )
}

export default SiteNavMenu;