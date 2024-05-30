import React from "react";
import { Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const Item = () => {
  return (
    <div className="card h-100">
      <Link to="/item">
        <Image class="card-img-top" src="/logo.svg" alt="Card image cap" />
        <div class="card-body">
          <h5 class="card-title">Card title</h5>

          <p class="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </Link>
    </div>
  );
};

export default Item;
