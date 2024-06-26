import React from "react";
import { Col, Form } from "react-bootstrap";

const UserCard = ({
  firstName,
  lastName,
  email,
  role,
  userId,
  isEmployee,
  onSwitchChange,
  currentUserEmail,
}) => {
  const handleSwitchChange = () => {
    onSwitchChange(userId, role);
  };

  return (
    <Col xs={12} md={6} className="mb-3">
      <div className="card h-100 d-flex flex-row justify-content-between">
        <div className="card-body">
          <h5 className="card-title">{`${firstName} ${lastName}`}</h5>
          <p className="card-text">{email}</p>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mr-2">
          <Form.Check
            type="switch"
            id={`switch-${email}`}
            checked={isEmployee}
            onChange={handleSwitchChange}
            disabled={email === currentUserEmail}
          />
        </div>
      </div>
    </Col>
  );
};

export default UserCard;
