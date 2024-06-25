import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = ({ id, title, text, imgSrc }) => {
  return (
    <div className="card h-100">
      <Link to={`/product/${id}`}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            className="card-img-top"
            src={imgSrc}
            alt="Card image cap"
            style={{
              maxHeight: "286px",
              maxWidth: "286px",
              height: "auto",
              width: "auto",
              margin: "5px",
            }}
          />
        </div>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{text}</p>
        </div>
      </Link>
    </div>
  );
};

export default Item;
