import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const res = await axios.post(
      "http://localhost:8080/api/users/login",
      form,
      { headers: { "Content-Type": "application/json" } }
    );

    const token = res.data.token;
    localStorage.setItem("token", token);

    const userRes = await axios.get("http://localhost:8080/api/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const role = userRes.data.role;

    if (role === "ROLE_ADMIN") {
      localStorage.removeItem("token");
      localStorage.removeItem("isAdmin");
      setMessage("Access Denied ❌ Please login from Admin Portal");
      return;
    }

    setMessage("Login successful ✅");

    setTimeout(() => {
      navigate("/products");
    }, 1000);

  } catch (err) {
    setMessage(err.response?.data?.message || "Invalid credentials ❌");
  } finally {
    setLoading(false);
  }
};

  return (
    <div style={styles.container}>
      
      <div style={styles.leftPanel}>
        <h1 style={styles.brand}>Ecommerce</h1>
        <h2 style={styles.tagline}>Buy Smart, Shop Fast</h2>
        <p style={styles.desc}>
          Discover premium products, secure checkout, lightning fast delivery,
          and a seamless shopping experience built for modern customers.
        </p>

        <ul style={styles.features}>
          <li>✔ 1000+ Quality Products</li>
          <li>✔ Trusted Customer Experience</li>
          <li>✔ Fast Secure Shopping</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.loginTitle}>Welcome</h2>
        <p style={styles.sub}>Login to continue shopping</p>

        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={styles.msg}>{message}</p>

        <p style={styles.linkText}>
          Don’t have an account?{" "}
          <Link to="/register" style={styles.link}>Register</Link>
        </p>

        <p style={styles.linkText}>
          Admin Access?{" "}
          <Link to="/admin-login" style={styles.link}>Admin Login</Link>
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
    fontSize: "55px",
    color: "#38bdf8",
    marginBottom: "10px",
  },
  tagline: {
    fontSize: "34px",
    marginBottom: "20px",
  },
  desc: {
    color: "#cbd5e1",
    lineHeight: "1.8",
    width: "80%",
  },
  features: {
    marginTop: "30px",
    lineHeight: "2.2",
    color: "#e2e8f0",
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
  loginTitle: {
    textAlign: "center",
    fontSize: "30px",
  },
  sub: {
    textAlign: "center",
    color: "#94a3b8",
    marginBottom: "10px",
  },
  input: {
    padding: "14px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "15px",
  },
  button: {
    padding: "14px",
    border: "none",
    borderRadius: "8px",
    background: "#38bdf8",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "16px",
  },
  msg: {
    textAlign: "center",
  },
  linkText: {
    textAlign: "center",
    fontSize: "14px",
  },
  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Login;