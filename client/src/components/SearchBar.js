import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Form, Row, Col, Button } from "react-bootstrap";
export default function SearchBar() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        } else {
            navigate("/search");
        }
    };
    return (
        <Form onSubmit={handleSearchSubmit}>
            <Row className="align-items-center">
                <Col xs="auto" className="p-0">
                    <Form.Control type="text" placeholder="Search" className="mr-sm-2" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                </Col>
                <Col xs="auto" className="p-0 pe-1">
                    <Button type="submit" className="btn btn-dark btn-outline-light">
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Button>
                </Col>
            </Row>
        </Form>
    );
}
