import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const handleSendReset = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

const ForgotPassword = ({ onSendReset = handleSendReset }) => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSendReset(email);
    setSent(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-green-300 to-blue-300">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl border-none">
        <CardHeader>
          <h2 className="text-2xl font-bold text-center text-blue-900">Reset Password</h2>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="text-center text-red-700">
              If an account exists for this email, a reset link has been sent.
              Check your email to reset your password.
            </div>
          ) : (
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="w-full bg-yellow-700 hover:bg-yellow-800">
                Send Reset Link
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
