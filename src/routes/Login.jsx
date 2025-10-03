import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../assets/api";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Swal from "sweetalert2";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const res = await api.post("/api/login/", formData);
    if (res.data) {
      localStorage.setItem("userInfo", JSON.stringify(res.data));

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: `Welcome, ${res.data.first_name || "User"}!`,
        timer: 2000,
        showConfirmButton: false,
      });

      if (res.data.is_staff && res.data.is_superuser) {
        navigate("/DTR");
      } else if (res.data.is_staff && !res.data.is_superuser) {
        navigate("/payroll-lists");
      } else {
        navigate("/staff-dashboard");
      }
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text:
        error.response?.data?.detail ||
        "Invalid email or password. Please try again.",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="bg-gray-50">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <img
            src="https://msutawi-tawi.edu.ph/LocalPartnership/J.H.%20CERILLES%20STATE%20COLLEGE.png"
            alt="logo"
            className="w-24 mb-8 mx-auto block"
          />
          <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Sign in
            </h1>
            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600 pr-10"
                    placeholder="Enter email"
                  />
                  <PersonIcon className="absolute right-3 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-slate-900 text-sm font-medium mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600 pr-10"
                    placeholder="Enter password"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 cursor-pointer"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                </div>
              </div>
              <div className="!mt-12">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none cursor-pointer"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Don't have an account?{" "}
                <Link
                  to={"/register"}
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
