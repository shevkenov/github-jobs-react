import React, { useState } from "react";
import { Card, Badge, Button, Collapse } from "react-bootstrap";
import ReactMarkdown from 'react-markdown';

const Job = ({ job }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Card className="my-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>
              <Card.Title>
                {job.title} -{" "}
                <span className="text-muted font-weight-light">
                  {job.company}
                </span>
              </Card.Title>
              <Card.Subtitle>
                {new Date(job.created_at).toLocaleDateString()}
              </Card.Subtitle>
              <Badge variant="secondary" className="mr-2">
                {job.type}
              </Badge>
              <Badge variant="secondary">{job.location}</Badge>
              <div style={{ wordBreak: "break-all" }}>
                <ReactMarkdown source={job.how_to_apply} />
              </div>
            </div>
            <img
              alt={job.title}
              src={job.company_logo}
              className="d-none d-md-block"
              height="50"
            />
          </div>
          <Card.Text>
            <Button
              variant="primary"
              onClick={() => setIsOpen((prevOpen) => !prevOpen)}
            >
              {isOpen ? "Hide details!" : "View details!"}
            </Button>
          </Card.Text>
          <Collapse in={isOpen}>
            <div className="mt-4">
              <ReactMarkdown source={job.description} />
            </div>
          </Collapse>
        </Card.Body>
      </Card>
    );
};

export default Job;
