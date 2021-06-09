export function updateInformation(
  userId: string,
  updateInfoDto: any,
  token: string
) {
  return fetch(`${process.env.REACT_APP_HOST}/users/${userId}/information`, {
    method: "PATCH",
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateInfoDto),
  }).then((res) => res.json());
}

export function getOneUser(id: string, token: string) {
  return fetch(`${process.env.REACT_APP_HOST}/users/${id}`, {
    headers: {
      Authorization: token,
    },
  }).then((res) => res.json());
}
