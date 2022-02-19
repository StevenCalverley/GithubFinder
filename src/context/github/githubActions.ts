import axios from "axios";
const GITHUB_URL = import.meta.env.VITE_APP_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL as string,
  headers: {
    Authorization: `token ${GITHUB_TOKEN as string}`,
  },
});
// Get Search results
export const searchUsers = async (text: string) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

export const getUsersAndRepos = async (login: string) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return {
    user: user.data,
    repos: repos.data,
  };
};
