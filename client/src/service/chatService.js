export const chatService = {
  sendChat,
  getAllMsg,
  clearChat
};

function sendChat(authUser, chatMsg) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser, chatMsg})
  };

  return fetch("/api/message/sendChat", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function getAllMsg(authUser) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser})
  };

  return fetch("/api/message/getAllMsg", requestOptions)
    .then((res) => {
      return res.json();
    });
}

function clearChat(authUser) {
  const requestOptions = {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({authUser})
  };

  return fetch("/api/message/clearChat", requestOptions)
    .then((res) => {
      return res.json();
    });
}