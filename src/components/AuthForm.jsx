import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateForm } from "../utils/validation";
import { login, signup } from "../services/auth";
import "../styles.css";

export default function AuthForm() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const validationErrors = validateForm(formData, isLogin);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    setMessage("");

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
        navigate("/dashboard");
      } else {
        await signup({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });
        navigate("/dashboard");
      }
    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="tabs">
        <button
          className={isLogin ? "active" : ""}
          onClick={() => {
            setIsLogin(true);
            setErrors({});
            setMessage("");
          }}
        >
          Login
        </button>
        <button
          className={!isLogin ? "active" : ""}
          onClick={() => {
            setIsLogin(false);
            setErrors({});
            setMessage("");
          }}
        >
          Signup
        </button>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        {!isLogin && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        {!isLogin && (
          <>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>{errors.confirmPassword}</p>
            )}
          </>
        )}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Signup"}
        </button>

        {message && (
          <p style={{ marginTop: "1rem", color: "red" }}>{message}</p>
        )}
      </form>
    </div>
  );
}
