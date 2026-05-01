import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", form);

      localStorage.setItem("token", res.data);
      localStorage.setItem("isAdmin", "true");

      navigate("/admin/products");
    } catch (err) {
      setError("Invalid admin credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.card}>
        <h1 style={styles.heading}>Admin Login</h1>

        <input
          type="email"
          name="email"
          placeholder="Admin Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.btn}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

        {error && <p style={styles.error}>{error}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },
  card: {
    background: "#1e293b",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },
  heading: {
    color: "white",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  btn: {
    padding: "12px",
    background: "#38bdf8",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
  },
};

export default AdminLogin;
