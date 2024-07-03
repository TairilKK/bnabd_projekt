import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const NumberSpinner = ({ maxQuantity, value, onChange }) => {
  return (
    <div style={{ maxWidth: "100px" }}>
      <InputGroup size="sm">
        <Button
          variant="outline-secondary"
          onClick={() => onChange(Math.max(1, value - 1))}
        >
          -
        </Button>
        <FormControl
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value, 10);
            onChange(newValue > maxQuantity ? maxQuantity : newValue);
          }}
        />
        <Button
          variant="outline-secondary"
          onClick={() => onChange(Math.min(maxQuantity, value + 1))}
        >
          +
        </Button>
      </InputGroup>
    </div>
  );
};

export default NumberSpinner;
