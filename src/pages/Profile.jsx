import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        "http://localhost:8080/api/users/me",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      setProfile({
        name: res.data.name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        address: res.data.address || "",
      });

    } catch (err) {

      console.log(err);

      alert("Failed to load profile ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {

    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {

    try {

      await axios.put(
        "http://localhost:8080/api/users/profile",
        {
          name: profile.name,
          phone: profile.phone,
          address: profile.address,
        },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Profile Updated Successfully ✅");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Profile update failed ❌"
      );
    }
  };

  const updatePassword = async () => {

    try {

      await axios.put(
        "http://localhost:8080/api/users/update-password",
        passwordData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      alert("Password Updated Successfully ✅");

      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Password update failed ❌"
      );
    }
  };

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/login");
  };

  if (loading) {

    return (
      <div style={styles.loading}>
        Loading Profile...
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* TOPBAR */}

      <div style={styles.topbar}>

        <h1 style={styles.heading}>
          My Profile
        </h1>

        <div style={{ display: "flex", gap: "10px" }}>

          <button
            style={styles.backBtn}
            onClick={() => navigate("/products")}
          >
            Products
          </button>

          <button
            style={styles.logoutBtn}
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>

      <div style={styles.grid}>

        {/* PROFILE CARD */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Profile Information
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={profile.name}
            onChange={handleProfileChange}
            style={styles.input}
          />

          <input
            type="email"
            value={profile.email}
            disabled
            style={{
              ...styles.input,
              opacity: 0.7,
              cursor: "not-allowed",
            }}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleProfileChange}
            style={styles.input}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={profile.address}
            onChange={handleProfileChange}
            style={styles.textarea}
          />

          <button
            style={styles.primaryBtn}
            onClick={updateProfile}
          >
            Save Profile
          </button>

        </div>

        {/* PASSWORD CARD */}

        <div style={styles.card}>

          <h2 style={styles.cardTitle}>
            Change Password
          </h2>

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={passwordData.oldPassword}
            onChange={handlePasswordChange}
            style={styles.input}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            style={styles.input}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            style={styles.input}
          />

          <button
            style={styles.passwordBtn}
            onClick={updatePassword}
          >
            Update Password
          </button>

        </div>

      </div>
    </div>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: "30px",
  },

  loading: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    color: "white",
    fontSize: "24px",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "40px",
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(350px,1fr))",
    gap: "30px",
  },

  card: {
    background: "#1e293b",
    padding: "30px",
    borderRadius: "18px",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    boxShadow: "0 0 20px rgba(0,0,0,0.4)",
  },

  cardTitle: {
    marginBottom: "10px",
    fontSize: "26px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    fontSize: "16px",
    background: "#0f172a",
    color: "white",
  },

  textarea: {
    padding: "14px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    minHeight: "120px",
    resize: "none",
    fontSize: "16px",
    background: "#0f172a",
    color: "white",
  },

  primaryBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#38bdf8",
    fontWeight: "bold",
    fontSize: "16px",
  },

  passwordBtn: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#22c55e",
    fontWeight: "bold",
    fontSize: "16px",
  },

  backBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#38bdf8",
    fontWeight: "bold",
  },

  logoutBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#ef4444",
    color: "white",
    fontWeight: "bold",
  },
};

export default Profile;