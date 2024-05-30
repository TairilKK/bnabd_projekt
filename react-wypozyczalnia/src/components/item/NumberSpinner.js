import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

const NumberSpinner = () => {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        maxWidth: "100px",
      }}
    >
      <InputGroup size="sm">
        <Button variant="outline-secondary" onClick={() => setCount(count - 1)}>
          -
        </Button>
        <FormControl
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value, 10))}
        />
        <Button variant="outline-secondary" onClick={() => setCount(count + 1)}>
          +
        </Button>
      </InputGroup>
    </div>
  );
};

export default NumberSpinner;
