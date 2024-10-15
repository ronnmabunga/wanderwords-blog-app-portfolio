import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Container, Row } from "react-bootstrap";
import AuthorCard from "../components/AuthorCard";
export default function Authors() {
    const { authors } = useContext(SessionContext);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section ">
                <img src="/images/login.webp" alt="Posts" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                    <Container>
                        <Row className="pt-3 me-auto">
                            <div className="col">
                                <h2>Authors:</h2>
                            </div>
                        </Row>
                        <Row className="col pt-3">
                            <div className="col">
                                {authors !== null && authors !== undefined && authors.length !== 0
                                    ? authors.map((author) => (
                                          <div className="col-12" id={"author-" + author._id} key={author._id} md={3}>
                                              <AuthorCard author={author} />
                                          </div>
                                      ))
                                    : "No posts yet! Write one now!"}
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}
