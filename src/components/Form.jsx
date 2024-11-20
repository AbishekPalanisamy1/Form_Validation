import React, { useState } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({
    hasLowerUpperCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "password") validatePassword(value);
  };

  const validatePassword = (password) => {
    setPasswordStrength({
      hasLowerUpperCase: /[a-z]/.test(password) && /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password),
      hasMinLength: password.length >= 8,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required.";
    }
    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address.";
    }
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (
      !passwordStrength.hasLowerUpperCase ||
      !passwordStrength.hasNumber ||
      !passwordStrength.hasSpecialChar ||
      !passwordStrength.hasMinLength
    ) {
      newErrors.password = "Password does not meet the required criteria.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Form submitted successfully!");
    }
    setFormData({
        username:"",
       
        email:" ",
        password:" "
    })
    setPasswordStrength({
        hasLowerUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        hasMinLength: false,
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.formWrapper}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={styles.inputGroup}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.username && (
              <span style={styles.error}>{errors.username}</span>
            )}
          </div>

          {/* Email */}
          <div style={styles.inputGroup}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>

          {/* Password */}
          <div style={styles.inputGroup}>
            <div style={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                style={styles.input}
              />
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                style={styles.toggleButton}
              >
                {passwordVisible ? "👁" : "👁‍🗨"}
              </button>
            </div>
            {errors.password && (
              <span style={styles.error}>{errors.password}</span>
            )}
          </div>

          <button type="submit" style={styles.submitButton}>
            Register
          </button>
        </form>

        {/* Password Strength Indicator */}
        <div style={styles.strengthWrapper}>
          <h4>Password Strength Indicator</h4>
          <ul style={styles.strengthList}>
            <li
              style={{
                color: passwordStrength.hasLowerUpperCase ? "green" : "red",
              }}
            >
              Lowercase & Uppercase
            </li>
            <li style={{ color: passwordStrength.hasNumber ? "green" : "red" }}>
              Numbers (0-9)
            </li>
            <li
              style={{
                color: passwordStrength.hasSpecialChar ? "green" : "red",
              }}
            >
              Special Character (!@#$%^&*)
            </li>
            <li
              style={{
                color: passwordStrength.hasMinLength ? "green" : "red",
              }}
            >
              At least 8 Characters
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Inline Styles
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  formWrapper: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    width: "350px",
  },
  inputGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  passwordWrapper: {
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "12px",
  },
  strengthWrapper: {
    marginTop: "20px",
  },
  strengthList: {
    listStyle: "none",
    paddingLeft: "0",
  },
};

export default Form;
