import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Label from "../ui/Label";
import Input from "../ui/InputField";
import Button from "../ui/Button";
import { useUser } from "../../context/UserContext";
import { authAPI } from "../../services/api";
import GoogleLoginButton from "../GoogleLoginButton";
import Alert from "../ui/Alert";

export default function SignInForm() {
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [message.text]);

  const handleGoogleSuccess = async (data) => {
    try {
      const { token } = data;

      localStorage.setItem("token", token);

      login(token);

      setMessage({ type: "success", text: "Login successful!" });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage({ type: "error", text: "Login failed. Please try again." });
    }
  };

  const handleGoogleError = (error) => {
    console.error("Google login error:", error);
    setMessage({
      type: "error",
      text: "Google login failed. Please try again.",
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      setMessage({ type: "error", text: "Email and password are required" });
      setLoading(false);
      return;
    }

    try {
      const response = await authAPI.login({ email, password });

      if (response.status !== 200) {
        setMessage({ type: "error", text: "Invalid email or password" });
        setLoading(false);
        return;
      }
      const data = response.data;
      const token = data.token;

      await login(token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      setMessage({ type: "error", text: "Login failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      {message.text && <Alert type={message.type} message={message.text} />}
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
          Back
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-lg sm:text-xl">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 ">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1">
              <GoogleLoginButton
                text={"Sign in"}
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 "></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    id={"email"}
                    name={"email"}
                    placeholder="info@gmail.com"
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id={"password"}
                      name={"password"}
                      placeholder="Enter your password"
                      required
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-5"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-brand-500 hover:text-brand-600 "
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Signin In...
                      </div>
                    ) : (
                      "Sign In"
                    )}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700  sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  to="/signup"
                  className="text-blue-500 hover:text-blue-600 "
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
