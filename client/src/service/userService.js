export const userService = {
  AllUsers,
  allFriends,
  addFriends,
  delFriends
};

function AllUsers(authUser) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser})
  };

  return fetch("/api/users/allUsers", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function allFriends(authUser){
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser})
  };

  return fetch("/api/users/allFriends", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function addFriends(authUser, friend) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser, friend})
  };

  return fetch("/api/users/addFriends", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function delFriends(authUser, friend) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser, friend})
  };

  return fetch("/api/users/delFriends", requestOptions)
    .then((res) => {
      return res.json();
    });
}
