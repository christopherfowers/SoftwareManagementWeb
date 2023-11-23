import React, { useEffect, useState } from "react";
import { useJiraApi } from "../providers/JiraApiProvider";
import { Card, CardBody, CardHeader, CardTitle, Container } from "reactstrap";
import { VictoryPie } from 'victory';
import WorkItemList from "../comnponents/cards/WorkItemList";
import StagedInfo from "../comnponents/cards/StagedInfo";

const Dashboard: React.FC = () => {
  const [ hoursRemaining, setHoursRemaining ] = useState<number>(0);
  const [chartData, setChartData] = useState<any>({});

  const { blocked, commited, devToTest, failedQa, inQa, readyForQa, readyForStaged, sprintWork } = useJiraApi();

  const getChartData = () => {
    if (!sprintWork || !sprintWork.length) return null;
    let grouped:any = {};

    sprintWork.forEach(issue => {
      if (!issue?.fields?.assignee?.displayName || !issue?.fields?.timeTracking?.remainingEstimateSeconds)
        return null;

      if (!grouped[issue.fields.assignee.displayName])  
        grouped[issue.fields.assignee.displayName] = 0;

      grouped[issue.fields.assignee.displayName] += (issue.fields.timeTracking.remainingEstimateSeconds / 3600);
    });

    return Object.keys(grouped).map((key: string) => ({
      x: key,
      y: grouped[key],
      label: `${key}\r\n${grouped[key]}`
    }));
  }

  const getHoursRemaining = ():number => { 
    let seconds = 0;
    sprintWork.forEach(issue => {
      seconds += issue?.fields?.timeTracking?.remainingEstimateSeconds ?? 0;
    });

    return seconds / 3600;
  }

  useEffect(() => {
    setHoursRemaining(getHoursRemaining());
    setChartData(getChartData() ?? null);
  }, [sprintWork])

  return (
    <Container fluid className="dashboard">
      {
        <Card>
          <CardHeader>
            <CardTitle>
              Sprint Load
            </CardTitle>
          </CardHeader>
          <CardBody>
            {
              sprintWork.length && chartData  ? 
                <CurrentSprintLoad chartData={chartData}  hoursRemaining={hoursRemaining} /> : null
            }
          </CardBody>          
        </Card>
      }
      <StagedInfo />
      <WorkItemList title="Dev To Test" workItems={ devToTest } />
      <WorkItemList title="Blocked" workItems={ blocked } />      
      <WorkItemList title="Committed" workItems={ commited } />
      <WorkItemList title="In QA" workItems={ inQa } />
      <WorkItemList title="Failed QA" workItems={ failedQa } />
      <WorkItemList title="Ready for QA" workItems={ readyForQa } />
      <WorkItemList title="Ready for Staging" workItems={ readyForStaged } />
      <Card>
        <CardHeader>
          <CardTitle>
            Delinquent Tickets
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            Pull Requests
          </CardTitle>
        </CardHeader>
      </Card>
    </Container>
  );
}

export default Dashboard;

const CurrentSprintLoad: React.FC<{chartData: any, hoursRemaining: number}> = ({chartData, hoursRemaining}) => {
  return (
    !!chartData ?
      <svg width={400} height={400}>
        <VictoryPie
          data={chartData}
          standalone={false}
          height={400}
          colorScale={["tomato", "brown", "violet", "red", "navy", "green", "purple", "brown"]}
          animate={{ duration: 2000 }}
          padAngle={({ datum }) => 2.5}
          labelPlacement={(props: any) => "parallel"}
          style={{ labels: { fill: "white", fontSize: 10, fontWeight: "bold" } }}
          radius={200}
          innerRadius={75}
          labelRadius={90} />
        <circle cx={200} cy={200} r={55} fill="#c43a31" />
        <text x={200} y={200} textAnchor="middle" fill="white" fontSize="34" dy=".3em">{hoursRemaining}</text>
      </svg> : null
  );
}
