import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { IIssue, IStagingDetails, IJiraContextType, IJiraProviderProps } from '../interfaces/JiraTypes';
import JiraService from '../services/JiraService';

const jiraService = new JiraService();

const defaultJiraContext: IJiraContextType = {
  remainingEstimate: 0,
  jiraUsers: [],
  stagedInfo: null,
  blocked: [],
  inQa: [],
  sprintWork: [],
  devToTest: [],
  readyForQa: [],
  readyForStaged: [],
  commited: [],
  failedQa: [],
  readyToCommit: []
};

const JiraApiContext = createContext<IJiraContextType>(defaultJiraContext);
export const useJiraApi:() => IJiraContextType = () => useContext(JiraApiContext);

export const JiraApiProvider:React.FC<PropsWithChildren<IJiraProviderProps>> = ({ apiToken, children }) => {
  const [stagedInfo, setStagedInfo] = useState<IStagingDetails | null>(null);
  const [blocked, setBlocked] = useState<IIssue[]>([]);
  const [inQa, setInQa] = useState<IIssue[]>([]);
  const [sprintWork, setSprintWork] = useState<IIssue[]>([]);
  const [devToTest, setDevToTest] = useState<IIssue[]>([]);
  const [readyForQa, setreadyForQa] = useState<IIssue[]>([]);  
  const [readyForStaged, setReadyForStaged] = useState<IIssue[]>([]);
  const [commited, setCommited] = useState<IIssue[]>([]);
  const [failedQa, setFailedQa] = useState<IIssue[]>([]);
  const [readyToCommit, setReadyToCommit] = useState<IIssue[]>([]);
  const [remainingEstimate, setRemainingEstimate] = useState(0);

  const updateData = async (): Promise<any> => {
    const sw = await jiraService.getIssues("CurrentSprintWork") || [];
    setSprintWork(sw);
    setRemainingEstimate(jiraService.getHoursRemaining(sw));
    jiraService.getChartData(sw);
    
    setStagedInfo(await jiraService.getStagedInfo());

    const keyIssues = await jiraService.getKeyIssues();
    setCommited(keyIssues.committed);
    setBlocked(keyIssues.blocked);
    setreadyForQa(keyIssues.readyForQa);
    setInQa(keyIssues.inQa);
    setFailedQa(keyIssues.failedQa);
    setReadyForStaged(keyIssues.staged);
    
    setReadyToCommit(await jiraService.getIssues("ReadyToCommitWork") || []);
    setDevToTest(await jiraService.getIssues("DevToTest") || []);
  }

  useEffect(() => {
    updateData();
    setInterval(() => {
      updateData();
    }, 180000 /*3 minutes*/)
  }, []);

  const providerContext:IJiraContextType = {
    remainingEstimate,
    stagedInfo,
    blocked,
    inQa,
    sprintWork,
    devToTest,
    readyForQa,
    readyForStaged,
    commited,
    failedQa,
    readyToCommit,
    jiraUsers: jiraService?.jiraUsers
  }

  return (
    <JiraApiContext.Provider value={providerContext}>
      {children}
    </JiraApiContext.Provider>
  );
};
