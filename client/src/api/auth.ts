type User = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export function login({ email, password }: Partial<User>) {
  return fetch(process.env.REACT_APP_HOST + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}

export function signup({
  firstName,
  lastName,
  email,
  password,
}: Partial<User>) {
  return fetch(process.env.REACT_APP_HOST + "/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ firstName, lastName, email, password }),
  }).then((res) => res.json());
}
