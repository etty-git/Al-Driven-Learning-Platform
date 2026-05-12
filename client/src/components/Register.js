import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../features/usersAPI";
import { setUser } from "../features/auth/authSlice";
import{Categories} from './categories/CategoriesPage';
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
    <div className="flex justify-center mt-20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
        <h2 className="text-xl mb-4">Register</h2>

        <input
          type="text"
          placeholder="Name"
          className="border p-2 mb-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Phone"
          className="border p-2 mb-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button
          type="submit"
          className="bg-purple-500 text-white p-2 w-full"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
