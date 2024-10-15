import { useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Form, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function ContactMessageCard({ message }) {
    const { setLoading, getMessages } = useContext(SessionContext);
    function readMessage(e) {
        e.preventDefault();
        async function readContactFormMessage() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/messages/${message._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("message")) {
                        getMessages();
                        Swal.fire({
                            title: "Message Read Successfully",
                            icon: "success",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Message Read Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Message Read Failed",
                            icon: "error",
                            text: "Something went wrong. Check your login details and try again.",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((error) => {});
            setLoading(false);
        }
        readContactFormMessage();
    }
    return (
        <Card className="p-5 m-3">
            <Card.Title className="pt-4">Sent By: {message.email}</Card.Title>
            <Card.Subtitle className="pb-3">Name: {message.name}</Card.Subtitle>
            <Card.Subtitle className="pb-3">Status: {message.isRead ? "Read" : "Unread"}</Card.Subtitle>
            <Card.Body>{message.message}</Card.Body>
            <Card.Footer>
                <Form onSubmit={(e) => readMessage(e)}>
                    <Button variant="btn-outline-dark" type="submit" id="submitBtn">
                        Mark As Read
                    </Button>
                </Form>
            </Card.Footer>
        </Card>
    );
}
