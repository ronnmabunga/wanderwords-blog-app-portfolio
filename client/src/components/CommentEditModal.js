import { useState, useEffect, useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
export default function CommentEditModal({ post, comment }) {
    const { loading, setLoading, getData } = useContext(SessionContext);
    const [showEditModal, setShowEditModal] = useState(false);
    const openEditModal = () => {
        setShowEditModal(true);
    };
    const closeEditModal = () => {
        setShowEditModal(false);
    };
    const [content, setContent] = useState(comment.comment);
    const [allowEditComment, setAllowEditComment] = useState(false);
    function editComment(e) {
        e.preventDefault();
        async function editBlogComment() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/${post._id}/${comment._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    comment: content,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("blog")) {
                        getData();
                        setContent("");
                        Swal.fire({
                            title: "Comment Updated Successfully!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Edit Comment Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Edit Comment Failed",
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
        editBlogComment();
    }
    useEffect(() => {
        if (content !== "") {
            setAllowEditComment(true);
        } else {
            setAllowEditComment(false);
        }
    }, [content]);
    return (
        <>
            <Button variant="btn-outline-dark" onClick={() => openEditModal()}>
                Edit
            </Button>
            <Modal show={showEditModal} onHide={closeEditModal}>
                <Form onSubmit={(e) => editComment(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Comment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="commentContent">
                            <Form.Label>Comment:</Form.Label>
                            <Form.Control as="textarea" rows={15} placeholder="Enter Content" required value={content} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-3"></Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="grey" onClick={closeEditModal}>
                            Close
                        </Button>
                        {allowEditComment && !loading ? (
                            <Button variant="light" type="submit" id="submitBtn">
                                Confirm Edit
                            </Button>
                        ) : (
                            <Button variant="dark" type="submit" id="submitBtn" disabled>
                                Fill in All Fields First
                            </Button>
                        )}
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
