import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, ButtonGroup } from "react-bootstrap";
import Item from "./Item";
import Filter from "../filter/Filter";
import axios from "axios";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [category, setCategory] = useState("WSZYSTKIE");
  const [brand, setBrand] = useState("WSZYSTKIE");
  const [sort, setSort] = useState("brand,asc");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    fetchItems(category, brand, sort, page);
  }, [category, brand, sort, page]);

  const fetchItems = async (category, brand, sort, page) => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/v1/products/filter`,
        {
          params: {
            categoryName: category,
            brandName: brand,
            sort: sort,
            page: page,
            size: 12,
          },
        }
      );
      setItems(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching the items", error);
    }
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxButtons = 3;
    const half = Math.floor(maxButtons / 2);

    let start = Math.max(0, page - half);
    let end = Math.min(totalPages, page + half + 1);

    if (page < half) {
      end = Math.min(totalPages, maxButtons);
    } else if (page + half >= totalPages) {
      start = Math.max(0, totalPages - maxButtons);
    }

    for (let i = start; i < end; i++) {
      buttons.push(
        <Button
          key={i}
          variant={i === page ? "primary" : "secondary"}
          onClick={() => handlePageChange(i)}
        >
          {i + 1}
        </Button>
      );
    }

    return buttons;
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(0);
  };

  const handleBrandChange = (newBrand) => {
    setBrand(newBrand);
    setPage(0);
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(0);
  };

  return (
    <Container
      className="full-height-container p-5"
      style={{
        background: "#f0f0f0",
        height: "100%",
      }}
    >
      <Filter
        category={category}
        setCategory={handleCategoryChange}
        brand={brand}
        setBrand={handleBrandChange}
        sort={sort}
        setSort={handleSortChange}
      />
      <Row>
        {items.map((item) => (
          <Col key={item.id} lg={3} md={4} sm={6} xs={12} className="mt-4">
            <Item
              id={item.id}
              title={item.brand}
              text={item.unitPrice}
              size={item.size}
              imgSrc={item.imagePath}
            />
          </Col>
        ))}
      </Row>
      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <ButtonGroup>
            <Button onClick={() => handlePageChange(0)} disabled={page === 0}>
              {"<<"}
            </Button>
            <Button onClick={handlePrevPage} disabled={page === 0}>
              {"<"}
            </Button>
            {renderPageButtons()}
            <Button onClick={handleNextPage} disabled={page === totalPages - 1}>
              {">"}
            </Button>
            <Button
              onClick={() => handlePageChange(totalPages - 1)}
              disabled={page === totalPages - 1}
            >
              {">>"}
            </Button>
          </ButtonGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemList;
