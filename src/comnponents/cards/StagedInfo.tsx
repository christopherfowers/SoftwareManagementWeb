import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useJiraApi } from "../../providers/JiraApiProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/pro-duotone-svg-icons";

const StagedInfo = () => {
  const { stagedInfo } = useJiraApi();

  return(
    <Card>
      <CardHeader>
        <CardTitle className="d-flex justify-content-between align-items-center">
          <div>
            Staging Deployment Info
          </div>
          <div>
            {stagedInfo?.issues?.length || 0} <FontAwesomeIcon icon={faTicket} />
          </div>          
        </CardTitle>
      </CardHeader>
      <CardBody>
        <Row>
          <Col>
            <div>
              <h5 style={{fontSize: 18}}>Dependencies:</h5>
              <ul style={{fontSize: 14}}>
                {stagedInfo?.dependencies.map((d) => <li key={d}>{d}</li>)}
              </ul>          
            </div>
          </Col>
          <Col>
            <div>
              <h5 style={{fontSize: 18}}>Missing Deps:</h5>
              <ul style={{fontSize: 14}}>
                {
                  stagedInfo?.ticketsWithoutDependencies.map((d) => (
                    <a href={`https://complyright.atlassian.net/browse/${d.substring(0, d.indexOf(' '))}`} target="_blank" rel="noreferrer noopener">
                      <li key={d}>{d}</li>
                    </a>
                  ))}
              </ul>          
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}

export default StagedInfo;