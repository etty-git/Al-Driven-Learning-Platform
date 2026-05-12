
import { useState } from "react";

// ניווט בין עמודים
import { Link, useNavigate } from "react-router-dom";

// Redux - dispatch actions
import { useDispatch } from "react-redux";

// RTK Query - קריאת API ללוגין
import { useLoginUserMutation } from "../features/usersAPI";

// Redux slice - שמירת משתמש מחובר
import { setUser } from "../features/auth/authSlice";
import{Categories} from './categories/CategoriesPage';
export default function Login() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [login] = useLoginUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // מונע רענון עמוד

    try {
      // שליחה לשרת
      const res = await login({ name, phone }).unwrap();
      dispatch(setUser({ user: res.user, token: res.token }));
      navigate("/categories");
    } catch (err) {
      // בניית הודעת שגיאה
      const errorMessage =
        err?.data?.message ||
        err?.data?.error ||
        err?.error ||
        "Login failed";

      // הצגת הודעת שגיאה למשתמש
        alert(errorMessage
      );
    }
  };

 
  return (
    <div className="flex justify-center mt-20">

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">

        {/* כותרת */}
        <h2 className="text-xl mb-4">Login</h2>

        {/* שם */}
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mb-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        {/* טלפון */}
        <input
          type="text"
          placeholder="Phone"
          className="border p-2 mb-2 w-full"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        {/* כפתור התחברות */}
        <button type="submit" className="bg-purple-500 text-white p-2 w-full">
          Login
        </button>
       <p>
          אין לך חשבון?{" "}
          <Link to="/register" className="text-blue-500">
            הרשמה
          </Link>
        </p>

      </form>
    </div>
  );
}
