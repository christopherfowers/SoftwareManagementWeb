import React, { PropsWithChildren } from "react";
import { Container } from "reactstrap";

const BasePage: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <Container fluid>
      {children}
    </Container>
  );
}

export default BasePage;