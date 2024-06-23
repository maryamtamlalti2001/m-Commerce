import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { Link, useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import axios from "axios";
import Modal from "react-modal";

const customModalStyles = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "400px",
    width: "100%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
};

const Product = () => {
  const [commandeModalIsOpen, setCommandeModalIsOpen] = useState(false);
  const [paymentModalIsOpen, setPaymentModalIsOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  const handleCommandeSubmit = async (product) => {
    try {
      const commande = {
        id: 1,
        datePaiement: Date.now(),
        idProduct: product._id,
      };

      const response = await axios.post(
        "http://localhost:5001/api/commandes",
        [commande]
      );

      setOrderId(response.data[0]._id);
      setError(null);
      setCommandeModalIsOpen(true);
    } catch (error) {
      console.error("Erreur lors de la création de la commande:", error);
      setOrderId(null);
      setError(error.message);
      setCommandeModalIsOpen(true);
    }
  };

  const handlePayment = async () => {
    try {
      await axios.post("http://localhost:5002/api/paiements", {
        commandeId: orderId,
        montant: product.prix,
      });

      setPaymentModalIsOpen(true);
      console.log("Le paiement a été effectué avec succès");
    } catch (error) {
      console.error("Erreur lors du paiement :", error.message);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6">
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const handleCommandeModalClose = () => {
    setCommandeModalIsOpen(false);
    setPaymentModalIsOpen(false);
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.titre}
            height="400px"
            width="400px"
          />
        </div>
        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className="display-5">{product.titre}</h1>
          <p className="lead fw-bolder">
            Rating {product.rating && product.rating.rate}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">{product.prix}</h3>
          <p className="lead">{product.description}</p>
          <Link
            to="#"
            className="btn btn-outline-dark px-4 py-2"
            onClick={() => handleCommandeSubmit(product)}
          >
            Commander
          </Link>
          {orderId && (
            <Modal
              isOpen={commandeModalIsOpen}
              onRequestClose={handleCommandeModalClose}
              style={customModalStyles}
            >
              <button onClick={handleCommandeModalClose}>Fermer</button>
              <br />
              <br />

              <p className="text-center text-success fw-bold">
                La Commande est passée avec succès et ID de la commande est:{" "}
                {orderId}
              </p>
              <div style={customModalStyles.buttonContainer}>
                <button
                  className="d-flex justify-content-center btn btn-secondary fixed-bottom p-3 text-center"
                  onClick={handlePayment}
                >
                  Payer ma commande
                </button>
              </div>
            </Modal>
          )}
          <Modal
            isOpen={paymentModalIsOpen}
            onRequestClose={handleCommandeModalClose}
            style={customModalStyles}
          >
            <button onClick={handleCommandeModalClose}>Fermer</button>
            <br />
            <br />

            <p className="text-center text-success fw-bold">
              La commande a été payée avec succès.
              <br />
              ID de la commande : {orderId}
              <br />
              Montant à payer : {product.prix}
            </p>
          </Modal>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
};

export default Product;
