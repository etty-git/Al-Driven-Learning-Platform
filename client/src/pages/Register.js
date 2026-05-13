import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../features/usersAPI";
import { setUser } from "../features/auth/authSlice";

export default function Register() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser({ name, phone }).unwrap();
      dispatch(setUser({ user: res.user, token: res.token }));
      navigate("/categories");
    } catch (err) {
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        err?.error ||
        "Registration failed";

      alert(errorMessage);
    }
  };

  return (
    <main className="auth-page">
      <form onSubmit={handleSubmit} className="auth-panel auth-form">
        <span className="eyebrow">Create account</span>
        <h1>Register</h1>
        <p>Save your profile and start creating prompts by category.</p>

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

        <button type="submit" className="primary-button" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="form-link">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
