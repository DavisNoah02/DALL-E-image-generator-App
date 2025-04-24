import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = ({ onGoogleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
            return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Registration successful! Please login.");
      navigate("/login"); // redirect to login page after successful signup
    } catch (err) {
      setError(err.message);
      
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-300 to-blue-300">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-none">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center text-green-900">Create Account 🚀</h2>
          <p className="text-sm text-center text-green-600 mt-1">Sign up to get started</p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <div className="text-red-600 text-center text-sm">{error}</div>
            )}
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
            />
            <div className="flex justify-between items-center text-sm">
              <span></span>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
              Sign Up
            </Button>
            <div className="relative my-2 text-center">
              <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"></span>
              <span className="relative bg-white px-3 text-gray-500 text-sm">or</span>
            </div>
            <Button
              type="button"
              onClick={onGoogleSignUp}
              variant="outline"
              className="flex items-center justify-center gap-2 w-full bg-gray-300 hover:bg-gray-500"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={handleLogin}
                className="text-green-600 hover:underline"
              >
                Login
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUp;