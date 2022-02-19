import { createContext, useReducer, ReactNode, Dispatch } from "react";
import githubReducer from "./githubReducer";

export interface User {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  type: string;
  location: string;
  bio: string;
  blog: string;
  twitter_username: string;
  html_url: string;
  followers: string;
  following: string;
  public_repos: string;
  public_gists: string;
  hireable: boolean;
}

export interface Repo {
  name: string;
  description: string;
  html_url: string;
  forks: string;
  open_issues: string;
  watchers_count: string;
  stargazers_count: string;
}

type GithubCTX = {
  users: User[];
  user: User | null;
  repos: Repo[];
  loading: boolean;
  dispatch: Dispatch<any>;
};

const GithubContext = createContext<GithubCTX>({
  users: [],
  repos: [],
  user: null,
  loading: false,
  dispatch: (value) => {},
});

export const GithubProvider = ({ children }: { children: ReactNode }) => {
  const initialState = {
    users: [],
    repos: [],
    user: null,
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
