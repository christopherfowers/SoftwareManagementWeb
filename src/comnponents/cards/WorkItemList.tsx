import React from "react" 
import { IIssue } from "../../interfaces/JiraTypes";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { faTicket } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const WorkItemList: React.FC<{title: string, workItems: IIssue[]}> = ({title, workItems}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="d-flex justify-content-between align-items-center">
          <div>
            {title} - {workItems.length}
          </div>
          <div>
            {workItems?.length || 0} <FontAwesomeIcon icon={faTicket} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardBody>
        {
          !workItems.length ? 
            <p>No items currently in {title}</p> : 
            workItems.map(wi => (
              <ul>
                <li key={wi.key}>
                  <a href={`https://complyright.atlassian.net/browse/${wi.key}`} target="_blank" rel="noreferrer noopener">
                    {wi.key} - {wi.fields?.summary ?? null}
                  </a>
                </li>
              </ul>
            ))
        }
      </CardBody>
    </Card>
  );
}

export default WorkItemList;

