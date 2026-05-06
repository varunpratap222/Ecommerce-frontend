import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

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

      const token = res.data.token;
      localStorage.setItem("token", token);

      const userRes = await axios.get("http://localhost:8080/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (userRes.data.role !== "ROLE_ADMIN") {
        localStorage.removeItem("token");
        setError("Access Denied ❌ You are not an admin");
        return;
      }

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
      <div style={styles.leftPanel}>
        <h1 style={styles.brand}>Ecommerce Admin</h1>
        <h2 style={styles.tagline}>Inventory Control Center</h2>
      </div>

      <form onSubmit={handleLogin} style={styles.form}>
        <h2 style={styles.title}>Admin Login</h2>
        <p style={styles.sub}>Authorized access only</p>

        <input
          type="email"
          name="email"
          placeholder="Admin email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Admin password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          {loading ? "Logging in..." : "Login as Admin"}
        </button>

        <p style={styles.msg}>{error}</p>

        <p style={styles.linkText}>
          Back to{" "}
          <Link to="/login" style={styles.link}>User Login</Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    background: "linear-gradient(to right,#020617,#0f172a)",
    color: "white",
  },
  leftPanel: {
    padding: "80px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  brand: {
    fontSize: "50px",
    color: "#38bdf8",
  },
  tagline: {
    fontSize: "32px",
    margin: "10px 0 20px",
  },
  desc: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    width: "80%",
  },
  features: {
    marginTop: "30px",
    lineHeight: "2.2",
    fontSize: "18px",
  },
  form: {
    width: "400px",
    margin: "auto",
    padding: "40px",
    background: "rgba(30,41,59,0.9)",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 0 25px rgba(0,0,0,0.4)",
  },
  title: {
    textAlign: "center",
    fontSize: "30px",
  },
  sub: {
    textAlign: "center",
    color: "#94a3b8",
  },
  input: {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#38bdf8",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },
  msg: {
    textAlign: "center",
    color: "red",
  },
  linkText: {
    textAlign: "center",
  },
  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default AdminLogin;