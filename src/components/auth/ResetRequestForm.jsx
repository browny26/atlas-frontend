import React, { useState } from "react";
import { Link } from "react-router-dom";
import Label from "../ui/Label";
import Input from "../ui/InputField";
import Button from "../ui/Button";

const ResetRequestForm = () => {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const email = e.target.email.value;

    try {
      const result = await fetch(
        "http://localhost:8080/v1/api/auth/request-reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!result.ok) {
        const data = await result.json();
        setMessage({
          type: "error",
          text: data.message || "Failed to send reset link",
        });
        return;
      }

      setMessage({
        type: "success",
        text: "Reset link sent! Check your email.",
      });
    } catch (error) {
      console.error("Error:", error);
      setMessage({ type: "error", text: "Failed to send reset link" });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto ">
        <Link
          to="/"
          className="inline-flex gap-2 items-center text-sm text-gray-500 transition-colors hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to website
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-lg sm:text-xl">
              Forgot Your Password?
            </h1>
            <p className="text-sm text-gray-500 ">
              Enter the email address linked to your account, and we’ll send you
              a link to reset your password.
            </p>
          </div>
          <div>
            <form onSubmit={(e) => handleResetPassword(e)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    id={"email"}
                    name={"email"}
                    placeholder="info@gmail.com"
                  />
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      "Send Reset Link"
                    )}
                  </Button>
                  {message.text && message.type === "success" && (
                    <p className="text-green-600 text-center text-sm mt-2">
                      {message.text}
                    </p>
                  )}
                  {message.text && message.type === "error" && (
                    <p className="text-red-600 text-center text-sm mt-2">
                      {message.text}
                    </p>
                  )}
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700  sm:text-start">
                Wait, I remember my password...{" "}
                <Link
                  to="/signin"
                  className="text-blue-500 hover:text-blue-600 "
                >
                  Click here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetRequestForm;
