import { useState, useEffect, useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
export default function PostEditModal({ post }) {
    const { loading, setLoading, getData } = useContext(SessionContext);
    const [showEditModal, setShowEditModal] = useState(false);
    const openEditModal = () => {
        setShowEditModal(true);
    };
    const closeEditModal = () => {
        setShowEditModal(false);
    };
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);
    const [allowEditPost, setAllowEditPost] = useState(false);
    function editPost(e) {
        e.preventDefault();
        async function editBlogPost() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/${post._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    title: title,
                    content: content,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("blog")) {
                        getData();
                        setTitle("");
                        setContent("");
                        Swal.fire({
                            title: "Post Updated Successfully!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Edit Post Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Edit Post Failed",
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
        editBlogPost();
    }
    useEffect(() => {
        if (title !== "" && content !== "") {
            setAllowEditPost(true);
        } else {
            setAllowEditPost(false);
        }
    }, [title, content]);
    return (
        <>
            <Button variant="btn-outline-dark" onClick={() => openEditModal()}>
                Edit
            </Button>
            <Modal show={showEditModal} onHide={closeEditModal}>
                <Form onSubmit={(e) => editPost(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Blog Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group controlId="blogTitle">
                            <Form.Label>Post Title:</Form.Label>
                            <Form.Control type="text" placeholder="Enter Title Name" required value={title} onChange={(e) => setTitle(e.target.value)} />
                        </Form.Group>
                        <Form.Group controlId="blogContent">
                            <Form.Label>Content:</Form.Label>
                            <Form.Control as="textarea" rows={15} placeholder="Enter Content" required value={content} onChange={(e) => setContent(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mt-3"></Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="grey" onClick={closeEditModal}>
                            Close
                        </Button>
                        {allowEditPost && !loading ? (
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
