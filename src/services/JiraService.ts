import { IJiraUser, IIssue, IKeyIssues, IStagingDetails } from "../interfaces/JiraTypes";

const jiraUserConstants: IJiraUser[] = [  
  {name: "Kenneth Hulse", jiraId: "5cb7954fbc90bb0e462a43ad"},
  {name: "Luana Gonclaves", jiraId: "5cb79f94c7bcda0e8ee6d3cc"},
  {name: "Don Nguyen", jiraId: "5e81ff2fdb49780c148a2bb6"},
  {name: "Ames Hardt", jiraId: "712020:b15eadb3-e6e0-4e50-b59a-d2e35a256a1f"},
  {name: "Rickey Kalikapersaud", jiraId: "60885af0248ef600737e9cd0"},
  {name: "Terrence White", jiraId: "5cb79f932a2c9a0e46788143"},
  {name: "Jody Roberts", jiraId: "6151f9b5071a720071d7a91e"},
  {name: "Jeffrey Cuscutis", jiraId: "5cb7954e4b97ab11a18e1c63"}
];

export default class JiraService {
  public jiraUsers: IJiraUser[] = jiraUserConstants;

  public sprintWorkLastUpdated = null as unknown as Date;

  private static service: JiraService;

  constructor() {
    JiraService.service = this;
  }

  public getChartData(sprintWork: IIssue[]) {
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

  public getHoursRemaining(sprintWork: IIssue[]): number { 
    let seconds = 0;
    sprintWork.forEach(issue => {
      seconds += issue?.fields?.timeTracking?.remainingEstimateSeconds ?? 0;
    });

    return seconds / 3600;
  }

  public async getStagedInfo(): Promise<IStagingDetails> {
    try {      
      const result = await JiraService.service.executeJiraQueryAsync("StagedInfo");    
      return result as IStagingDetails;
    }
    catch(ex) {
      console.log(ex);
    }
    return null as unknown as IStagingDetails;
  }

  public async getKeyIssues(): Promise<IKeyIssues> {
    try {
      const result = await JiraService.service.executeJiraQueryAsync("KeyIssuesByState");    
      return result as IKeyIssues;
    }
    catch(ex) {
      console.log(ex);
    }
    
    return null as unknown as IKeyIssues;
  }

  public async getIssues(endpoint: string): Promise<IIssue[]> {
    try {
      const result = await JiraService.service.executeJiraQueryAsync(endpoint);    
      return result as IIssue[];
    }
    catch(ex) {
      console.log(ex);
    }
    return null as unknown as IIssue[];
  }

  public async executeJiraQueryAsync(endpoint: string):Promise<any | null> {
    const url = `https://localhost:32768/api/Jira/${endpoint}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Jira API request failed.');
    }

    return await response.json();
  }
}