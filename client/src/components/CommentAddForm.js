import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import Swal from "sweetalert2";
export default function CommentAddForm({ post }) {
    const { loading, setLoading, getData } = useContext(SessionContext);
    const [comment, setComment] = useState("");
    const [allowComment, setAllowComment] = useState(false);
    function postComment(e) {
        e.preventDefault();
        async function postBlogComment() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/${post._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    comment: comment,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("blog")) {
                        getData();
                        setComment("");
                        Swal.fire({
                            title: "Comment Posted Successfully!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Comment Post Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Comment Post Failed",
                            icon: "error",
                            text: "Something went wrong. Please try again later or contact us for assistance",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((error) => {});
            setLoading(false);
        }
        postBlogComment();
    }
    useEffect(() => {
        if (comment !== "") {
            setAllowComment(true);
        } else {
            setAllowComment(false);
        }
    }, [comment]);
    return (
        <Form onSubmit={(e) => postComment(e)}>
            <Form.Group controlId="comment">
                <Form.Label>Your comment:</Form.Label>
                <Form.Control as="textarea" rows={5} placeholder="Enter Comment" required value={comment} onChange={(e) => setComment(e.target.value)} />
            </Form.Group>
            <Form.Group className="mt-3"></Form.Group>
            {allowComment && !loading ? (
                <Form.Group>
                    <Button variant="light" type="submit" id="submitBtn">
                        Post Comment
                    </Button>
                </Form.Group>
            ) : (
                <Form.Group>
                    <Button variant="dark" type="submit" id="submitBtn" disabled>
                        Fill in All Fields First
                    </Button>
                </Form.Group>
            )}
        </Form>
    );
}
