// src/services/auth.js

// Save user to localStorage
const saveUser = (user) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

// Find user from localStorage
const findUser = (email, password) => {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  return users.find(
    (user) => user.email === email && user.password === password
  );
};

// Signup function
export function signup({ username, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];

      const userExists = users.some((user) => user.email === email);
      if (userExists) {
        reject(new Error("Email already registered."));
      } else {
        const newUser = { username, email, password };
        saveUser(newUser);
        resolve({
          message: `Account created for ${username}!`,
          user: { username, email },
        });
      }
    }, 1000);
  });
}

// Login function
export function login(email, password) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = findUser(email, password);
      if (user) {
        const token = "mock-token-" + Date.now();
        localStorage.setItem("token", token); // Save token here
        resolve({
          message: "Login successful!",
          token,
        });
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 1000);
  });
}

// Logout function
export function logout() {
  localStorage.removeItem("token");
}
