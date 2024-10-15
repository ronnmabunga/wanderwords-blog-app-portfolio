import { useState, useContext, useEffect } from "react";
import SessionContext from "../context/SessionContext";
import { Container, Row } from "react-bootstrap";
import ContactMessageCard from "../components/ContactMessageCard";
export default function Posts() {
    const { user, contactMessages, timeSince } = useContext(SessionContext);
    const [contactMessagesData, setContactMessagesData] = useState(null);
    useEffect(() => {
        if (contactMessages !== null) {
            let sortedContactMessages = contactMessages.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            sortedContactMessages.forEach((contactMessage) => (contactMessage.timeSince = timeSince(contactMessage.creationDate)));
            setContactMessagesData(sortedContactMessages);
        }
    }, [contactMessages]);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section ">
                <img src="/images/posts.png" alt="Posts" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                    <Container>
                        <Row className="pt-3 me-auto">
                            <div className="col">
                                <h2>Manage Contact Form Messages:</h2>
                            </div>
                        </Row>
                        <Row className="col pt-3">
                            <div className="col">
                                {contactMessagesData !== null && contactMessagesData !== undefined && contactMessagesData.length !== 0
                                    ? contactMessagesData.map((message) => (
                                          <div className="col-12" id={"message-" + message._id} key={message._id} md={3}>
                                              <ContactMessageCard message={message} />
                                          </div>
                                      ))
                                    : "No comments yet!"}
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}
