import { createContext, useContext, useEffect, useMemo, useState } from "react";

const IssueContext = createContext(null);

const defaultIssues = [
  {
    id: "QTM-102",
    title: "Login token expires after refresh",
    description: "Authentication session becomes invalid after page reload.",
    type: "Bug",
    priority: "High",
    status: "In Progress",
    assignee: "RN",
    assigneeName: "Rohith Naidu",
    comments: 8,
    labels: ["authentication", "frontend"],
    storyPoints: 3,
    dueDate: "",
  },
  {
    id: "QTM-108",
    title: "Build dashboard activity feed",
    description: "Display recent activity from issues and team members.",
    type: "Story",
    priority: "Medium",
    status: "Open",
    assignee: "AK",
    assigneeName: "Arjun K",
    comments: 4,
    labels: ["dashboard", "frontend"],
    storyPoints: 5,
    dueDate: "",
  },
  {
    id: "QTM-114",
    title: "Connect GitHub commit activity",
    description: "Show branch and commit information inside related issues.",
    type: "Task",
    priority: "Low",
    status: "QA",
    assignee: "SK",
    assigneeName: "Sanjay K",
    comments: 5,
    labels: ["github", "integration"],
    storyPoints: 2,
    dueDate: "",
  },
  {
    id: "QTM-121",
    title: "Fix mobile issue modal overflow",
    description: "Issue details modal extends outside smaller phone screens.",
    type: "Bug",
    priority: "Critical",
    status: "Open",
    assignee: "RN",
    assigneeName: "Rohith Naidu",
    comments: 12,
    labels: ["mobile", "ui"],
    storyPoints: 3,
    dueDate: "",
  },
  {
    id: "QTM-126",
    title: "Implement notification preferences",
    description: "Allow users to control assignment and mention alerts.",
    type: "Story",
    priority: "Medium",
    status: "In Progress",
    assignee: "VM",
    assigneeName: "Vikram M",
    comments: 2,
    labels: ["notifications"],
    storyPoints: 5,
    dueDate: "",
  },
  {
    id: "QTM-132",
    title: "Create API token settings",
    description: "Allow workspace admins to generate API access tokens.",
    type: "Task",
    priority: "High",
    status: "Open",
    assignee: "AK",
    assigneeName: "Arjun K",
    comments: 6,
    labels: ["api", "security"],
    storyPoints: 8,
    dueDate: "",
  },
  {
    id: "QTM-135",
    title: "Add validation to create issue form",
    description: "Summary and issue type should be required.",
    type: "Sub-task",
    priority: "Low",
    status: "Done",
    assignee: "SK",
    assigneeName: "Sanjay K",
    comments: 1,
    labels: ["forms"],
    storyPoints: 1,
    dueDate: "",
  },
];

const STORAGE_KEY = "quantum-flow-issues";

export const IssueProvider = ({ children }) => {
  const [issues, setIssues] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      return defaultIssues;
    } catch {
      return defaultIssues;
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
  }, [issues]);

  const generateIssueId = () => {
    const numbers = issues
      .map((issue) => Number(issue.id.replace("QTM-", "")))
      .filter((number) => !Number.isNaN(number));

    const highest = numbers.length ? Math.max(...numbers) : 100;

    return `QTM-${highest + 1}`;
  };

  const createIssue = (issue) => {
    const newIssue = {
      ...issue,
      id: generateIssueId(),
      comments: issue.comments ?? 0,
      labels: issue.labels ?? [],
    };

    setIssues((current) => [newIssue, ...current]);

    return newIssue;
  };

  const updateIssue = (issueId, changes) => {
    setIssues((current) =>
      current.map((issue) =>
        issue.id === issueId
          ? {
              ...issue,
              ...changes,
            }
          : issue,
      ),
    );
  };

  const deleteIssue = (issueId) => {
    setIssues((current) => current.filter((issue) => issue.id !== issueId));
  };

  const getIssue = (issueId) => {
    return issues.find((issue) => issue.id === issueId);
  };

  const resetIssues = () => {
    setIssues(defaultIssues);
  };

  const value = useMemo(
    () => ({
      issues,
      createIssue,
      updateIssue,
      deleteIssue,
      getIssue,
      resetIssues,
    }),
    [issues],
  );

  return (
    <IssueContext.Provider value={value}>{children}</IssueContext.Provider>
  );
};

export const useIssues = () => {
  const context = useContext(IssueContext);

  if (!context) {
    throw new Error("useIssues must be used inside IssueProvider");
  }

  return context;
};
