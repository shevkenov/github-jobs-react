import React from "react";
import { Form, Col } from "react-bootstrap";

const SearchForm = ({ params, onParamsChange }) => {
  return (
    <Form className="mb-4">
      <Form.Row className="align-items-end">
        <Form.Group as={Col}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            name="description"
            value={params.description}
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col}>
          <Form.Label>Location</Form.Label>
          <Form.Control
            onChange={onParamsChange}
            name="location"
            value={params.location}
            type="text"
          />
        </Form.Group>
        <Form.Group as={Col} xs="auto" className="ml-2">
          <Form.Check
            onChange={onParamsChange}
            type="checkbox"
            label="Only Full Time"
            name="full_time"
            value={params.full_time}
            className="mb-2"
          />
        </Form.Group>
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
