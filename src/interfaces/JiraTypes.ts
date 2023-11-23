export interface IStagingDetails {
  dependencies: string[];
  ticketsWithoutDependencies: string[];
  issues: IIssue[];
}

export interface IIssue {
  key: string, 
  fields: IFields; 
}

export interface IFields {
  assignee: IAssignee | null;
  summary: string | null
  primaryDeveloper: IAssignee | null;
  systemDependencies: WorkItemDependency[] | null;
  wag: string | null;
  timeTracking: ITimeTracking | null;
}

/**
 * Workitem Dependencies 
 */
export interface WorkItemDependency {
  value: string | null;
}

export interface IAssignee {
  self: string | null;
  name: string | null;
  emailAddress: string | null;
  displayName: string | null;
  accountId: string | null;
}

export interface ITimeTracking {
  remainingEstimate: string | null;
  timeSpent: number | string | null;
  remainingEstimateSeconds: number | null;
  timeSpentSeconds: number | string | null;
}

export interface IKeyIssues{
  committed: IIssue[];
  readyForQa: IIssue[];
  inQa: IIssue[];
  failedQa: IIssue[];
  blocked: IIssue[];
  staged: IIssue[];
}

export interface IIstatus {
  self: string;
  description: string;
  iconUrl: string;
  name: string;
  id: number;
  statusCategory: IStatusCategory;
}

export interface IStatusCategory {
  self: string;
  id: number;
  key: string;
  columnName: string;
  name: string;
}

export interface IJiraContextType {
  jiraUsers: IJiraUser[];
  stagedInfo: IStagingDetails | null;
  blocked: IIssue[];
  inQa: IIssue[];
  sprintWork: IIssue[];
  devToTest: IIssue[];
  readyForQa: IIssue[];
  readyForStaged: IIssue[];
  commited: IIssue[];
  failedQa: IIssue[];
  readyToCommit: IIssue[];
  remainingEstimate: number;
}

export interface IJiraProviderProps {
  apiToken: string;
}

export interface IJiraQuery { 
  endpoint: string;
  expand: string[],
  fields: string[],
  fieldsByKeys: boolean,
  jql: string,
  maxResults: number;
  startAt: number;
}

export interface IJiraUser {
  name: string;
  jiraId: string;
}