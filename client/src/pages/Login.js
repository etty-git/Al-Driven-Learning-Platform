import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../features/usersAPI";
import { setUser } from "../features/auth/authSlice";

export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [login] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({ name, phone }).unwrap();
      dispatch(setUser({ user: res.user, token: res.token }));
      navigate("/categories");
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        err?.error ||
        "Login failed";

      alert(errorMessage);
    }
  };

  return (
    <main className="auth-page">
      <form onSubmit={handleSubmit} className="auth-panel auth-form">
        <span className="eyebrow">Welcome back</span>
        <h1>Login</h1>
        <p>Enter your name and phone to continue to your categories.</p>

        <input
          type="text"
          placeholder="Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          className="auth-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit" className="primary-button">
          Login
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="form-link">
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
