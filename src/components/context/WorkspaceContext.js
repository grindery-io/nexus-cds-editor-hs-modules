import NexusClient from 'grindery-nexus-client';
import React, { useState, createContext, useEffect } from 'react';
import { useGrinderyNexus } from 'use-grindery-nexus';
import { defaultFunc, replaceTokens } from '../../utils/workspace';

const defaultWorkspace = {
  key: 'personal',
  title: 'My workspace',
  about: '',
  creator: '{{user}}',
  admins: ['{{user}}'],
  users: [],
};

const defaultContext = {
  workspace: null,
  workspaces: [defaultWorkspace],
  createWorkspace: async () => {
    return '';
  },
  leaveWorkspace: async () => {
    return true;
  },
  setWorkspace: defaultFunc,
  setWorkspaces: defaultFunc,
  deleteWorkspace: async () => {
    return true;
  },
  updateWorkspace: async () => {
    return true;
  },
  isLoaded: false,
  isSuccess: null,
  setIsSuccess: defaultFunc,
  isWorkspaceSwitching: false,
  listWorkspaces: defaultFunc,
  workspaceToken: '',
};

export const WorkspaceContext = createContext(defaultContext);

export const WorkspaceContextProvider = ({ children }) => {
  // App main context
  const { user, token } = useGrinderyNexus();

  // Is workspace switching
  const [client, setClient] = useState(null);

  // Currently active workspace.
  const [workspace, setWorkspace] = useState(null);

  // List of workspaces
  const [workspaces, setWorkspaces] = useState([]);

  // Is initial list of workspaces loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Is workspace operation success
  const [isSuccess, setIsSuccess] = useState(null);

  // Is workspace switching
  const [isWorkspaceSwitching, setIsWorkspaceSwitching] = useState(false);

  // Workspace token
  const [workspaceToken, setWorkspaceToken] = useState('');

  // Get list of user's workspaces
  const listWorkspaces = async (userId, client) => {
    const spaces = await client.listWorkspaces();
    setWorkspaces([
      replaceTokens(defaultWorkspace, { user: userId }),
      ...spaces,
    ]);
    setIsLoaded(true);
  };

  // Create new workspace
  const createWorkspace = async (userId, data, client) => {
    const res = await client.createWorkspace(data);
    if (res) {
      listWorkspaces(userId, client);
      if (res.key) {
        setIsSuccess(`Workspace ${data.title} created successfully.`);
        return res.key;
      }
    }
    return '';
  };

  // Update workspace
  const updateWorkspace = async (userId, data, client) => {
    const ws = await client.updateWorkspace(data);
    if (ws) {
      listWorkspaces(userId, client);
      setIsSuccess(`Workspace ${data.title} updated successfully.`);
      return true;
    }
    return false;
  };

  // Leave current workspace
  const leaveWorkspace = async (userId, data, client) => {
    const res = await client.leaveWorkspace(data.workspaceKey);
    if (res && res.left) {
      setIsSuccess(`You successfully left ${data.title} workspace.`);
      listWorkspaces(userId, client);
      return true;
    }
    return false;
  };

  // Delete workspace
  const deleteWorkspace = async (userId, data, client) => {
    const res = await client.deleteWorkspace(data.workspaceKey);
    if (res) {
      setIsSuccess(`Workspace ${data.title} deleted successfully.`);
      listWorkspaces(userId, client);
      return true;
    }
    return false;
  };

  const initClient = (access_token) => {
    const nexus = new NexusClient();
    nexus.authenticate(access_token);
    setClient(nexus);
  };

  useEffect(() => {
    if (user && token && token.access_token) {
      initClient(token.access_token);
    }
  }, [user, token.access_token]);

  useEffect(() => {
    if (workspaceToken) {
      initClient(workspaceToken);
    }
  }, [workspaceToken]);

  // Get list of user's workspaces when user and access token is known
  useEffect(() => {
    if (user && client) {
      listWorkspaces(user, client);
    }
  }, [user, client]);

  useEffect(() => {
    if (!workspace && workspaces && workspaces.length > 0) {
      setWorkspace(workspaces[0].key);
    }
    if (workspace && workspaces && workspaces.length > 0) {
      if (!workspaces.find((ws) => ws.key === workspace)) {
        setWorkspace(workspaces[0].key);
      }
    }
  }, [workspaces, workspace]);

  useEffect(() => {
    if (!user) {
      setWorkspace(null);
      setWorkspaces([]);
    }
  }, [user]);

  useEffect(() => {
    if (workspace) {
      setIsWorkspaceSwitching(true);
      setTimeout(() => {
        setIsWorkspaceSwitching(false);
      }, 1000);
    }
  }, [workspace]);

  useEffect(() => {
    if (workspace) {
      if (workspace !== 'personal') {
        setWorkspaceToken(
          (workspaces.find((ws) => ws.key === workspace) &&
            workspaces.find((ws) => ws.key === workspace).token) ||
            '',
        );
      } else {
        setWorkspaceToken('');
      }
    }
  }, [workspace, workspaces]);

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        workspaces,
        createWorkspace,
        leaveWorkspace,
        setWorkspace,
        setWorkspaces,
        isLoaded,
        deleteWorkspace,
        updateWorkspace,
        isSuccess,
        setIsSuccess,
        isWorkspaceSwitching,
        listWorkspaces,
        workspaceToken,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceContextProvider;
