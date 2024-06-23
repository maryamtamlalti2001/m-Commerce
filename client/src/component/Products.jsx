import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";



export default function Products() {
  const [data, setDta] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      if (componentMounted) {
        setDta(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
        console.log(filter);
      }
    };
    getProducts();
  }, []);
  const Loading = () => {
    return (<>Loading ...</>);
  };
  const ShowProducts = () => {
    return (
      <>
        <div className="buttons d-flex justify-content-center">
          <button className="btn btn-outline-dark">All</button>
          <button className="btn btn-outline-dark">Men's clothing</button>
          <button className="btn btn-outline-dark">Women's clothing</button>
          <button className="btn btn-outline-dark">Jewelery</button>
        </div>
        {filter.map((product) => {
          return (
            <div className="col-md-3 mb-4" key={product.id}>
              <div className="card h-100 text-center p-4">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.titre}
                  height={250}
                />
                <div className="card-body">
                  <h5 className="card-title mb-0">
                    {product.titre && product.titre.substring(0, 12)}
                  </h5>
                  <p className="card-text lead fw-bold">
                    $ {product.prix}
                  </p>
                  <Link to={`/products/${product._id}`} className="btn btn-outline-dark">
                    Buy now
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };
  

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}