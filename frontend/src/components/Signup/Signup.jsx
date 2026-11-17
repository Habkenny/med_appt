
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";

const initialFormData = {
  role: "",
  fullName: "",
  phone: "",
  email: "",
  password: "",
};

function validateForm(formData) {
  const errors = {};

  const { role, fullName, phone, email, password } = formData;

  if (!["patient", "doctor"].includes(role)) {
    errors.role = "Please select Patient or Doctor.";
  }

  if (!fullName.trim()) {
    errors.fullName = "Full name is required.";
  } else if (fullName.trim().length < 2) {
    errors.fullName = "Full name must contain at least 2 characters.";
  } else if (!/^[\p{L}\s'-]+$/u.test(fullName.trim())) {
    errors.fullName = "Please enter a valid name.";
  }

  const phonePattern = /^\+?[\d\s()-]{7,20}$/;

  if (!phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (
    !phonePattern.test(phone.trim()) ||
    phone.replace(/\D/g, "").length < 7 ||
    phone.replace(/\D/g, "").length > 15
  ) {
    errors.phone = "Please enter a valid phone number.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!password) {
    errors.password = "Password is required.";
  } else if (password.length < 8) {
    errors.password = "Password must contain at least 8 characters.";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Include at least one uppercase letter.";
  } else if (!/[a-z]/.test(password)) {
    errors.password = "Include at least one lowercase letter.";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Include at least one number.";
  }

  return errors;
}

function Signup() {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedFormData);
    setMessage("");
    setMessageType("");

    if (submitted) {
      setErrors(validateForm(updatedFormData));
    } else if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  const showMessage = (text, type) => {
    setMessage(text);
    setMessageType(type);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      showMessage(
        "Please correct the highlighted fields.",
        "error"
      );
      return;
    }

    showMessage(
      `Your ${formData.role} registration form was validated. No account was created or saved.`,
      "success"
    );
  };

  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setMessage("");
    setMessageType("");
    setSubmitted(false);
  };

  const renderError = (field) =>
    errors[field] ? (
      <small id={`${field}-error`} className="field-error">
        {errors[field]}
      </small>
    ) : null;

  return (
    <main className="signup-container">
      <section className="signup-card" aria-labelledby="signup-title">
        <h1 id="signup-title">Sign Up</h1>

        <p className="login-text">
          Already a member? <Link to="/login">Login</Link>
        </p>

        <p className="demo-note">
          This frontend demo validates the form only; it does not
          create or store accounts.
        </p>

        <form onSubmit={handleSubmit} onReset={handleReset} noValidate>
          <div className="form-group">
            <label htmlFor="role">Role</label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? "role-error" : undefined}
              required
            >
              <option value="">Select your role</option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>

            {renderError("role")}
          </div>

          <div className="form-group">
            <label htmlFor="fullName">Full Name</label>

            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Enter your full name"
              autoComplete="name"
              value={formData.fullName}
              onChange={handleChange}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={
                errors.fullName ? "fullName-error" : undefined
              }
              required
            />

            {renderError("fullName")}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={
                errors.phone ? "phone-error" : undefined
              }
              required
            />

            {renderError("phone")}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>

            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? "email-error" : undefined
              }
              required
            />

            {renderError("email")}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password
                  ? "password-error"
                  : "passwordHelp"
              }
              minLength={8}
              required
            />

            <small id="passwordHelp">
              Use at least 8 characters, including uppercase,
              lowercase and a number.
            </small>

            {renderError("password")}
          </div>

          <button type="submit" className="submit-btn">
            Create Account
          </button>

          <button type="reset" className="reset-btn">
            Reset
          </button>

          <p
            id="signup-message"
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

export default Signup;
