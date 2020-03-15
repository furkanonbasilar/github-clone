import axios from "axios";

const BASE_URL = "https://api.github.com";

export const search = (query, page) => {
  const url = `${BASE_URL}/search/repositories?q=${query}/?page=${page}&per_page=10`;
  return axios.get(url).then(response => response.data);
};

export const getUserRepos = username => {
  const url = `${BASE_URL}/users/${username}/repos?per_page=250`;
  return axios.get(url).then(response => response.data);
};
export const getTotalCountRepo = query => {
  const url = `${BASE_URL}/search/repositories?q=${query}`;
  return axios.get(url).then(response => response.data.total_count);
};
