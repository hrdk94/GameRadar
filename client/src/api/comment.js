//comment functions
export const fetchComments = async (gameId) => {
  const res = await fetch(`http://localhost:5000/api/comments/${gameId}`);
  return res.json();
};

export const postComment = async (gameId, text) => {
  const user = JSON.parse(localStorage.getItem('user')); // define user

  if (!user?.user?.id || !user?.user?.username) {
    throw new Error("User not found in localStorage");
  }

  const res = await fetch(`http://localhost:5000/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      gameId,
      userId: user.user.id,
      username: user.user.username,
      text,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to post comment");
  }

  return res.json();
};

