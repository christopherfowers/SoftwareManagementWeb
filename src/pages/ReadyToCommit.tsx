import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import { useJiraApi } from "../providers/JiraApiProvider";
import { IIssue } from "../interfaces/JiraTypes";
import { extractHours } from "../helpers";

const ReadyToCommit = () => {
  const [ workItems, setWorkItems ] = useState<IIssue[]>([]);
  const [ hours, setHours ] = useState<number>(0);
  const { readyToCommit } = useJiraApi();

  const updateHours = () => {
    let hourCount = 0;
    readyToCommit.forEach(i => {
      hourCount += extractHours(i.fields.wag ?? '');
    });
    setHours(hourCount);
  }

  useEffect(() => {
    updateHours();
  }, [readyToCommit]);

  return (
    <Container fluid style={{overflowY: 'scroll', height: 'calc(100vh - 56px)'}}>
      <h3>{readyToCommit.length} Items ({hours} hours) Ready to Commit</h3>
      <ol>
        {
            
          workItems.map(i => (
            <li key={i.key}>
              {i.key}: {i.fields.wag}
            </li>)
          )
        }
      </ol>
    </Container>
  );
}

export default ReadyToCommit;