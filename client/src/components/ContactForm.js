import { useState, useEffect, useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function ContactForm({ initialEmail }) {
    const { user, loading, setLoading } = useContext(SessionContext);
    const [name, setName] = useState("");
    const [email, setEmail] = useState(initialEmail);
    const [message, setMessage] = useState("");
    const [allowContact, setAllowContact] = useState(true);
    useEffect(() => {}, [user]);
    function sendMessage(e) {
        e.preventDefault();
        async function sendNewMessage() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/messages/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("message")) {
                        Swal.fire({
                            title: "Message Sent Successfully",
                            icon: "success",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Message Sending Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Message Sending Failed",
                            icon: "error",
                            text: "Something went wrong. Check your login details and try again.",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    }
                    setName("");
                    setEmail("");
                    setMessage("");
                })
                .catch((error) => {});
            setLoading(false);
        }
        sendNewMessage();
    }
    useEffect(() => {
        if (email !== "" && message !== "") {
            setAllowContact(true);
        } else {
            setAllowContact(false);
        }
    }, [email, message]);
    return (
        <Form onSubmit={(e) => sendMessage(e)}>
            <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formEmail">
                <Form.Label>
                    Email <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required />
            </Form.Group>

            <Form.Group controlId="formMessage">
                <Form.Label>
                    Message <span style={{ color: "red" }}>*</span>
                </Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} required />
            </Form.Group>
            {allowContact && !loading ? (
                <Button variant="light" type="submit" id="submitBtn" className="btn submit-btn">
                    Send Message
                </Button>
            ) : (
                <Button variant="dark" type="submit" id="submitBtn" disabled className="btn disabled-btn">
                    Fill in Required Fields First
                </Button>
            )}
        </Form>
    );
}
