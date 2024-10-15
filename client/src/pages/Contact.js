import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import ContactForm from "../components/ContactForm";
import SessionContext from "../context/SessionContext";
import { useState, useEffect, useContext } from "react";
export default function Contact() {
    const [email, setEmail] = useState("");
    const { user, loading, isLoggedIn } = useContext(SessionContext);
    useEffect(() => {
        if (isLoggedIn && !loading && user !== null) {
            setEmail(user.email);
        }
    }, [isLoggedIn, user, loading]);
    useEffect(() => {}, [email]);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section">
                <img src="/images/home.png" alt="Login" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center align-items-center min-vh-100">
                    <Container className="p-5 my-5">
                        <Row>
                            <Col md={6}>
                                <h2>Contact Us</h2>
                                <ContactForm initialEmail={email} />
                            </Col>
                            <Col md={6}>
                                <h2>Follow Us</h2>
                                <div className="social-links">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faFacebook} size="2x" className="mx-2" />
                                    </a>
                                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faTwitter} size="2x" className="mx-2" />
                                    </a>
                                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faLinkedin} size="2x" className="mx-2" />
                                    </a>
                                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                                        <FontAwesomeIcon icon={faGithub} size="2x" className="mx-2" />
                                    </a>
                                </div>
                                <h2 className="mt-4">Our Location</h2>
                                <div style={{ height: "300px", width: "100%", backgroundColor: "#e0e0e0" }}>
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d243647.71122457655!2d-74.0059413!3d40.7127753!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1655419723961!5m2!1sen!2sus" width="100%" height="100%" allowfullscreen="" loading="lazy"></iframe>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}
