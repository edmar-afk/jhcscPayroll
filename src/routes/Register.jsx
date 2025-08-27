import React, { useState } from "react";
import api from "../assets/api";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    repeat_password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
      const payload = {
        username: formData.email,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
      };

      await api.post("/api/register/", payload);

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can now login with your account",
        confirmButtonColor: "#2563eb",
      }).then(() => {
        navigate("/"); // 👈 redirect after success
      });

      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        repeat_password: "",
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: err.response?.data?.detail || "Something went wrong",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const passwordsMatch =
    formData.password &&
    formData.repeat_password &&
    formData.password === formData.repeat_password;

  return (
    <>
      <div className="bg-gray-50">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <a href="javascript:void(0)">
              <img
                src="https://msutawi-tawi.edu.ph/LocalPartnership/J.H.%20CERILLES%20STATE%20COLLEGE.png"
                alt="logo"
                className="w-24 mb-8 mx-auto block"
              />
            </a>

            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Register
              </h1>
              <form
                className="mt-12 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Full Name
                  </label>
                  <input
                    name="first_name"
                    type="text"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter first name"
                  />
                </div>

                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Mobile Number
                  </label>
                  <input
                    name="last_name"
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => {
                      if (/^\d{0,11}$/.test(e.target.value)) {
                        handleChange(e);
                      }
                    }}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter Mobile Number (e.g. 09123456789)"
                  />
                </div>

                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter email"
                  />
                </div>

                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Repeat Password
                  </label>
                  <input
                    name="repeat_password"
                    type="password"
                    value={formData.repeat_password}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Re-enter password"
                  />
                  {!passwordsMatch && formData.repeat_password && (
                    <p className="text-red-600 text-sm mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="!mt-12">
                  <button
                    type="button"
                    onClick={handleRegister}
                    disabled={!passwordsMatch}
                    className={`w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white ${
                      passwordsMatch
                        ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        : "bg-red-500 cursor-not-allowed"
                    }`}
                  >
                    Register
                  </button>
                </div>
                <p className="text-slate-900 text-sm !mt-6 text-center">
                  Already have an account?{" "}
                  <Link
                    to={'/'}
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                  >
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
