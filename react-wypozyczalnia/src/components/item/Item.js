import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles.css";

const Item = ({ id, title, text, size, imgSrc }) => {
  return (
    <div className="card h-100 d-flex flex-column">
      <Link to={`/product/${id}`} className="d-flex flex-column h-100">
        <div className="image-container">
          <Image
            className="card-img-top"
            src={imgSrc}
            alt="Card image cap"
            style={{
              maxHeight: "286px",
              maxWidth: "100%",
              height: "auto",
              width: "auto",
            }}
          />
        </div>
        <div className="card-body mt-auto">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">
            Cena: {text}
            {size && (
              <>
                <br />
                Rozmiar: {size}
              </>
            )}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Item;
