import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post("http://localhost:8080/api/users/register", form);

      setMessage(res.data.message || "Registered Successfully ✅");

      setTimeout(() => {
        navigate("/login");
      }, 1200);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.leftPanel}>
        <h1 style={styles.brand}>ShopSphere</h1>
        <h2 style={styles.tagline}>Create Your Shopping Account</h2>
        <p style={styles.desc}>
          Join thousands of happy customers and explore premium products,
          secure payments, and lightning fast checkout experience.
        </p>

        <ul style={styles.features}>
          <li>✔ Quick User Registration</li>
          <li>✔ Instant Product Access</li>
          <li>✔ Secure JWT Authentication</li>
        </ul>
      </div>

      <form onSubmit={handleRegister} style={styles.form}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.sub}>Start your shopping journey today</p>

        <input
          type="text"
          name="name"
          placeholder="Enter full name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Creating Account..." : "Register"}
        </button>

        <p style={styles.msg}>{message}</p>

        <p style={styles.linkText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
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
  },
  tagline: {
    fontSize: "34px",
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

export default Register;