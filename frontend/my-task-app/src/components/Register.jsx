import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const passwordRegex =/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long, contain a number, and a special character.",
        { autoClose: 3000 }
      );
      return;
    }
    try {
      const { data } = await axios.post("http://localhost:5001/register", {
        name: username,
        emailId: email,
        password: password,
      });
      toast.success("Registered Successfully", { autoClose: 3000 });
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      toast.error("Could not Register", { autoClose: 3000 });
      navigate("/register");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
        {/* Can be done with mx-auto mt-28 without extra div but giving fixed top-margin is not good practice */}
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-6" onSubmit={handleRegister}>
          {/* Username */}
          <div className="rounded-2xl">
            <FloatLabel>
              <label htmlFor="username">Username</label>
              <InputText
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </FloatLabel>
          </div>

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
            label="Register"
            // severity="success"
            className="w-full"
            type="submit"
            style={{ backgroundColor: "#1E2A47" }}
          />
        </form>

        {/* Toggle to Login */}
        <p className="text-sm mt-6 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
