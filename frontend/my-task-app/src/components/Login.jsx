import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { FloatLabel } from "primereact/floatlabel";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form className="space-y-6">
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
          severity="success"
          className="w-full"
          type="submit"
        />
      </form>

      {/* Toggle to Login */}
      <p className="text-sm mt-6 text-center">
         Don't have an account?{" "}
        <button type="button" className="text-blue-600 hover:underline cursor-pointer">
          Register
        </button>
      </p>
    </div>
    </div>
  );
};

export default Login;




// import React, { useState } from "react";
// import Login from "./Login";
// import Register from "./Register";

// const AuthWrapper = () => {
//   const [isLogin, setIsLogin] = useState(true);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       {isLogin ? (
//         <Login switchToRegister={() => setIsLogin(false)} />
//       ) : (
//         <Register switchToLogin={() => setIsLogin(true)} />
//       )}
//     </div>
//   );
// };

// export default AuthWrapper;

// import React from "react";
// import AuthWrapper from "./components/AuthWrapper";

// function App() {
//   return <AuthWrapper />;
// }

// export default App;

