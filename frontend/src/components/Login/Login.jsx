
import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setMessage("Please enter both email and password.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(trimmedEmail)) {
      setMessage("Please enter a valid email address.");
      setMessageType("error");
      return;
    }

    setEmail("");
    setPassword("");
    setShowPassword(false);

    setMessage(
      "Demo form validated. No account was authenticated."
    );
    setMessageType("success");
  };

  const handleReset = () => {
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setMessage("");
    setMessageType("");
  };

  return (
    <main className="login-container">
      <section className="login-card" aria-labelledby="login-title">
        <h1 id="login-title">Login</h1>

        <p className="signup-text">
          Are you a new member?{" "}
          <Link to="/signup">Sign up here</Link>
        </p>

        <p className="demo-note">
          This frontend demo does not authenticate or store accounts.
        </p>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              aria-describedby="login-message"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                aria-describedby="login-message"
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword((previous) => !previous)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  <EyeOff size={20} aria-hidden="true" />
                ) : (
                  <Eye size={20} aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <button type="reset" className="reset-btn">
            Reset
          </button>

          <p className="forgot-password">
            <Link to="/forgot-password">Forgot password?</Link>
          </p>

          <p
            id="login-message"
            className={messageType}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {message}
          </p>
        </form>
      </section>
    </main>
  );
}

export default Login;
