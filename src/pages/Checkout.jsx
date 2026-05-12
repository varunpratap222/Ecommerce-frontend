import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "COD",
  });

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/users/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(res.data);
    } catch (err) {
      console.log(err);
      alert("Failed to load cart ❌");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  const placeOrder = async () => {
    if (
      !form.fullName ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.state ||
      !form.pincode
    ) {
      alert("Please fill all address details ❌");
      return;
    }

    try {
      setPlacingOrder(true);

      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:8080/api/orders/checkout",
        {
          address: form,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Placed Successfully 🎉");

      navigate("/products");
    } catch (err) {
      console.log(err);
      alert("Checkout Failed ❌");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <h2>Loading Checkout...</h2>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* LEFT SIDE */}
        <div style={styles.leftSection}>
          <h1 style={styles.heading}>Checkout</h1>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Shipping Address</h2>

            <div style={styles.formGrid}>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={form.fullName}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                style={styles.input}
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={form.pincode}
                onChange={handleChange}
                style={styles.input}
              />
            </div>

            <textarea
              name="address"
              placeholder="Full Address"
              value={form.address}
              onChange={handleChange}
              style={styles.textarea}
            />
          </div>

          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Payment Method</h2>

            <div style={styles.paymentBox}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={form.paymentMethod === "COD"}
                  onChange={handleChange}
                />
                Cash on Delivery
              </label>

              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="UPI"
                  checked={form.paymentMethod === "UPI"}
                  onChange={handleChange}
                />
                UPI Payment
              </label>

              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="CARD"
                  checked={form.paymentMethod === "CARD"}
                  onChange={handleChange}
                />
                Credit / Debit Card
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div style={styles.rightSection}>
          <h2 style={styles.summaryTitle}>Order Summary</h2>

          <div style={styles.summaryItems}>
            {cartItems.map((item) => (
              <div key={item.cartId} style={styles.itemCard}>
                <img
                  src={item.imageUrl}
                  alt={item.productName}
                  style={styles.image}
                />

                <div style={{ flex: 1 }}>
                  <h3>{item.productName}</h3>
                  <p>Qty: {item.quantity}</p>
                </div>

                <h3>₹{item.totalPrice}</h3>
              </div>
            ))}
          </div>

          <div style={styles.totalBox}>
            <h2>Total Amount</h2>
            <h1>₹{totalAmount}</h1>
          </div>

          <button
            onClick={placeOrder}
            style={styles.checkoutBtn}
            disabled={placingOrder}
          >
            {placingOrder ? "Processing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#020617",
    padding: "30px",
    color: "white",
  },

  container: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px",
  },

  leftSection: {
    background: "#0f172a",
    padding: "25px",
    borderRadius: "20px",
  },

  rightSection: {
    background: "#0f172a",
    padding: "25px",
    borderRadius: "20px",
    height: "fit-content",
    position: "sticky",
    top: "20px",
  },

  heading: {
    fontSize: "32px",
    marginBottom: "25px",
  },

  section: {
    marginBottom: "35px",
  },

  sectionTitle: {
    marginBottom: "18px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    outline: "none",
  },

  textarea: {
    width: "100%",
    marginTop: "15px",
    minHeight: "120px",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#1e293b",
    color: "white",
    outline: "none",
  },

  paymentBox: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  radioLabel: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  summaryTitle: {
    marginBottom: "20px",
  },

  summaryItems: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  itemCard: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    background: "#1e293b",
    padding: "12px",
    borderRadius: "12px",
  },

  image: {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  totalBox: {
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #334155",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  checkoutBtn: {
    width: "100%",
    marginTop: "25px",
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right,#38bdf8,#0ea5e9)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  },

  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#020617",
    color: "white",
  },
};

export default Checkout;
