import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@components/ui/card";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {  Sparkles } from 'lucide-react';

const Login = ({ onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/"); // Redirect to ImageGenerator after login
    } catch  {
      toast.error( "ERROR ! Invalid email or password.");
    }
  };

  const handleRegister = () => {
    navigate("/signup");
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      toast.success("Google login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-100 to-blue-300">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-none">
        <CardHeader>
          <div className="flex items-center justify-center py-3">
            {/* <Sparkles className="text-indigo-600 mr-2" size={28} /> */}
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              IMAGIFY AI LOGIN
            </h1>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-blue-600">Welcome Back</h2>
          <p className="text-sm text-center text-blue-600 mt-1">Login to your account</p>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="flex justify-between items-center text-sm">
              <span></span>
              <button
                type="button"
                onClick={onForgotPassword}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-800">
              Login
            </Button>
            <div className="relative my-2 text-center">
              <span className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gray-300"></span>
              <span className="relative bg-white px-3 text-gray-500 text-sm">or</span>
            </div>
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              className="flex items-center justify-center bg-gray-300 hover:bg-gray-500 gap-2 w-full"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </Button>
            <p className="text-sm text-center text-gray-600">
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={handleRegister}
                className="text-blue-600 hover:underline"
              >
                Register
              </button>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;