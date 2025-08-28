import { memo, useEffect, useState } from "react";
import axios from "axios";
import "./Products.scss";
import Container from "../Container/Container";
import { API } from "./../../utils/index";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}products?limit=12`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="products">
      <Container>
        <h2 className="products-title">Products</h2>
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img src={product.thumbnail} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="description">{product.description}</p>
              <p className="price">${product.price}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default memo(Products);
