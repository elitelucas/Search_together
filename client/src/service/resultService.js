export const resultService = {
  recommend,
  reject,
  allResult
};

function allResult(authUser) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser})
  };

  return fetch("/api/result/allResult", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function recommend(authUser, comment, keyword, result) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser, comment, keyword, result})
  };

  return fetch("/api/result/recommend", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function reject(authUser, comment, keyword, result) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser, comment, keyword, result})
  };

  return fetch("/api/result/reject", requestOptions)
    .then((res) => {
      return res.json();
    });
}