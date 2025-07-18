import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5001/login", {
        emailId: email,
        password,
      });
      if (!data) {
        toast.error("Login failed!");
      }
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("role", data.user.role);
      localStorage.setItem("username", data.user.name);
      navigate("/home");
      toast.success("Logged In Successfully", { autoClose: 3000 });
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("Login failed! Invalid credentials.");
      } else if (err.response?.status === 403) {
        toast.error("Access denied! You have been blocked.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <FloatLabel>
              <InputText
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
              />
              <label htmlFor="email">Email</label>
            </FloatLabel>
          </div>

          {/* Password */}
          <div>
            <FloatLabel>
              <Password
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                inputClassName="w-full"
                feedback={false}
              />
              <label htmlFor="password">Password</label>
            </FloatLabel>
          </div>

          {/* Submit Button */}
          <Button
            label="Login"
            // severity="success"
            className="w-full"
            type="submit"
            style={{backgroundColor:'#1E2A47'}}
          />
        </form>

        {/* Toggle to Login */}
        <p className="text-sm mt-6 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
