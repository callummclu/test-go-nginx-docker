export function getUser(searchParameters: string, page: number) {
  return fetch(
    `${process.env.REACT_APP_BACKEND_URI}/user?searchParams=${searchParameters}&itemsPerPage=20&page=${page}`
  );
}

export function getSingleUser(username: string) {
  return fetch(`${process.env.REACT_APP_BACKEND_URI}/user/${username}`);
}
