// src/utils/validation.js

export function validateEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateUsername(username) {
  return username.trim() !== "";
}

export function validateForm(formData, isLogin) {
  const errors = {};

  if (!validateEmail(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!isLogin) {
    if (!validateUsername(formData.username)) {
      errors.username = "Username is required";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }

  return errors;
}
