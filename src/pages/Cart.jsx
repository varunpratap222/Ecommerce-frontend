import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  const getToken = () => localStorage.getItem("token");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/users/cart", {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      alert("Failed to load cart ❌");
    }
  };

  const removeItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/cart/${cartId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      fetchCart();
    } catch (err) {
      alert("Remove failed ❌");
    }
  };

  const increaseQty = async (cartId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/cart/increase/${cartId}`, {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      fetchCart();
    } catch (err) {
      alert("Increase failed ❌");
    }
  };

  const decreaseQty = async (cartId) => {
    try {
      await axios.put(`http://localhost:8080/api/users/cart/decrease/${cartId}`, {}, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      fetchCart();
    } catch (err) {
      alert("Decrease failed ❌");
    }
  };

  const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div style={styles.container}>
      <div style={styles.topbar}>
        <button onClick={() => navigate("/products")} style={styles.backBtn}>
          ← Continue Shopping
        </button>
        <h1>My Cart 🛒</h1>
      </div>

      {items.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        <>
          <div style={styles.grid}>
            {items.map((item) => (
              <div key={item.cartId} style={styles.card}>
                <img src={item.imageUrl} alt={item.productName} style={styles.image} />
                <h3>{item.productName}</h3>
                <p>₹{item.price}</p>

                <div style={styles.qtyBox}>
                  <button onClick={() => decreaseQty(item.cartId)} style={styles.qtyBtn}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item.cartId)} style={styles.qtyBtn}>+</button>
                </div>

                <p>Subtotal: ₹{item.totalPrice}</p>

                <button onClick={() => removeItem(item.cartId)} style={styles.deleteBtn}>
                  Remove
                </button>
                
              </div>
              

            ))}
          </div>

          <div style={styles.checkoutWrapper}>
  <div style={styles.totalBox}>
    <h2>Total Amount: ₹{totalAmount}</h2>
  </div>
  <button
    onClick={() => navigate("/checkout")}
    style={styles.checkoutBtn}
  >
    Proceed to Checkout
  </button>
</div>


        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#020617",
    color: "white",
    padding: "25px",
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  backBtn: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
    gap: "20px",
  },
  card: {
    background: "#1e293b",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "160px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  qtyBox: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "15px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  qtyBtn: {
    padding: "6px 14px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "18px",
  },
  deleteBtn: {
    marginTop: "12px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "crimson",
    color: "white",
    cursor: "pointer",
  },
  checkoutWrapper: {
    display: "flex",
    flexDirection: "column", // Stacks the total and the button
    alignItems: "flex-end",   // Pushes both to the right side
    marginTop: "30px",
    paddingBottom: "50px",   // Extra space at the bottom of the page
  },

  // 2. MODIFY YOUR totalBox (Remove marginTop as wrapper handles it)
  totalBox: {
    textAlign: "right",
    fontSize: "20px",
    marginBottom: "10px",    // Space between price and button
  },

  // 3. MODIFY YOUR checkoutBtn
  checkoutBtn: {
    width: "300px",          // Fixed width often looks better on the right
    padding: "16px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(to right,#38bdf8,#0ea5e9)",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "transform 0.2s", // Subtle hover effect
  },

};

export default Cart;