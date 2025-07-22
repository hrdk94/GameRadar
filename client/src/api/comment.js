// comment
export const fetchComments = async (gameId) => {
  const stored = JSON.parse(localStorage.getItem('user'));
  const token = stored?.token;

  const res = await fetch(`http://localhost:5000/api/comments/${gameId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

export const postComment = async (gameId, text) => {
  const stored = JSON.parse(localStorage.getItem('user'));
  const token = stored?.token;
  const user = stored?.user;

  if (!user?.id || !user?.username) {
    throw new Error("User not found in localStorage");
  }

  const res = await fetch(`http://localhost:5000/api/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      gameId,
      userId: user.id,
      username: user.username,
      text,
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Failed to post comment");
  }

  return res.json();
};
