import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyOrders() {

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:8080/api/orders/my-orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrders(res.data);

    } catch (err) {

      console.log(err);

      alert("Failed to fetch orders ❌");

    } finally {

      setLoading(false);
    }
  };

  const getStatusColor = (status) => {

    switch (status) {

      case "CONFIRMED":
        return "#22c55e";

      case "PENDING":
        return "#facc15";

      case "CANCELLED":
        return "#ef4444";

      default:
        return "#38bdf8";
    }
  };

  if (loading) {
    return (
      <div style={styles.loading}>
        Loading Orders...
      </div>
    );
  }

  return (
    <div style={styles.container}>

      {/* HEADER */}

      <div style={styles.topbar}>

        <h1 style={styles.heading}>
          My Orders
        </h1>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/products")}
        >
          Back To Products
        </button>

      </div>

      {/* EMPTY */}

      {orders.length === 0 && (
        <div style={styles.emptyBox}>

          <h2>No Orders Yet 🛒</h2>

          <p>
            Start shopping to place your first order.
          </p>

        </div>
      )}

      {/* ORDERS */}

      <div style={styles.ordersContainer}>

        {orders.map((order) => (

          <div
            key={order.orderId}
            style={styles.orderCard}
          >

            {/* ORDER HEADER */}

            <div style={styles.orderHeader}>

              <div>
                <h2 style={styles.orderId}>
                  Order #{order.orderId}
                </h2>

                <p style={styles.date}>
                  {new Date(order.orderDate).toLocaleString()}
                </p>
              </div>

              <div
                style={{
                  ...styles.status,
                  background: getStatusColor(order.status),
                }}
              >
                {order.status}
              </div>

            </div>

            {/* ITEMS */}

            <div style={styles.itemsContainer}>

              {order.items.map((item, idx) => (

                <div
                  key={idx}
                  style={styles.itemCard}
                >

                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    style={styles.image}
                  />

                  <div style={styles.itemDetails}>

                    <h3>{item.productName}</h3>

                    <p>
                      Quantity: {item.quantity}
                    </p>

                    <p>
                      ₹{item.price}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* FOOTER */}

            <div style={styles.footer}>

              <h2>
                Total: ₹{order.totalAmount}
              </h2>

            </div>

          </div>
        ))}
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
    fontSize: "22px",
    background: "#020617",
    color: "white",
  },

  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  heading: {
    fontSize: "38px",
    fontWeight: "bold",
  },

  backBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    background: "#38bdf8",
    color: "black",
    fontWeight: "bold",
  },

  emptyBox: {
    textAlign: "center",
    marginTop: "100px",
    opacity: 0.8,
  },

  ordersContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },

  orderCard: {
    background: "#1e293b",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 0 15px rgba(0,0,0,0.4)",
  },

  orderHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    borderBottom: "1px solid #334155",
    paddingBottom: "15px",
  },

  orderId: {
    marginBottom: "5px",
  },

  date: {
    color: "#94a3b8",
  },

  status: {
    padding: "10px 18px",
    borderRadius: "30px",
    fontWeight: "bold",
    color: "black",
  },

  itemsContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  itemCard: {
    display: "flex",
    gap: "20px",
    background: "#0f172a",
    padding: "15px",
    borderRadius: "12px",
    alignItems: "center",
  },

  image: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "12px",
  },

  itemDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  footer: {
    marginTop: "20px",
    borderTop: "1px solid #334155",
    paddingTop: "15px",
    textAlign: "right",
  },
};

export default MyOrders;