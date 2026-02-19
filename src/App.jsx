import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        // 1️⃣ Filter products price >= 10
        const filteredProducts = data.products.filter(
          (prod) => prod.price >= 10
        );
        setProducts(filteredProducts);
      })
      .catch((err) => console.error(err));
  }, []); // ⚠️ Important: Empty dependency array

  return (
    <>
      <h2>Products List (Price ≥ 10)</h2>

      <table border="2" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price (₹)</th>
            <th>Rating</th>
            <th>Return Policy</th>
            <th>Shipping Info</th>
            <th>Thumbnail</th>
          </tr>
        </thead>

        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.title}</td>
              <td>₹ {prod.price}</td>
              <td>{prod.rating}</td>

              {/* 3️⃣ Added Return & Shipping */}
              <td>{prod.returnPolicy || "7 Days Return Available"}</td>
              <td>{prod.shippingInformation || "Free Shipping"}</td>

              {/* 2️⃣ Thumbnail opens in new tab */}
              <td>
                <a
                  href={prod.thumbnail}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={prod.thumbnail}
                    alt={prod.title}
                    width="60"
                    style={{ cursor: "pointer" }}
                  />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;