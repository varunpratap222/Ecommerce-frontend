import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // simple password strength check
  const getStrength = (password) => {
    if (password.length < 4) return "Weak";
    if (password.length < 8) return "Medium";
    return "Strong";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/auth/register", form);
      setMessage(res.data.message || "✅ Registration successful!");
      setForm({ name: "", email: "", password: "" });

    } catch (err) {
      setMessage(
        err.response?.data || "❌ Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          {/* Name */}
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Email */}
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Password */}
          <div style={styles.passwordBox}>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              style={styles.input}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggle}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Strength indicator */}
          {form.password && (
            <p style={styles.strength}>
              Strength: {getStrength(form.password)}
            </p>
          )}

          {/* Submit */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>

          <p style={{ marginTop: "10px" }}>
  Already have an account?{" "}
  <Link to="/login" style={{ color: "#38bdf8" }}>
    Login here
  </Link>
</p>

          {/* Message */}
          {message && <p style={styles.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    width: "350px",
    padding: "25px",
    borderRadius: "10px",
    background: "#1e293b",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
  },
  button: {
    padding: "10px",
    background: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  passwordBox: {
    display: "flex",
    gap: "5px",
  },
  toggle: {
    padding: "10px",
    fontSize: "12px",
    cursor: "pointer",
  },
  strength: {
    fontSize: "12px",
    color: "#fbbf24",
  },
  message: {
    marginTop: "10px",
    fontSize: "13px",
  },
};

export default Register;