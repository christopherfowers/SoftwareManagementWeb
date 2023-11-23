import { IconDefinition } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink as RRDNavLInk} from "react-router-dom";
import { NavItem, NavLink, Tooltip } from "reactstrap";

const IconNavItem: React.FC<{icon: IconDefinition, to: string, tooltip: string}> = ({icon, to, tooltip}) => {
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const toggle = () => {setTooltipOpen(!tooltipOpen)};

  return (
    <NavItem className="sidenav-item">
      <NavLink to={`/${to}`} tag={RRDNavLInk} id={to}> 
        <FontAwesomeIcon icon={icon} style={{fontSize: 32}} />
        <Tooltip isOpen={tooltipOpen} target={to} toggle={toggle}>
          {tooltip}
        </Tooltip>
      </NavLink>
    </NavItem>
  );
}

export default IconNavItem;