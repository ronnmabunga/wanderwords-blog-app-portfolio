import { useState, useEffect, useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Form, Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
export default function CommentConfirmDeleteModal({ post, comment }) {
    const { setLoading, getData } = useContext(SessionContext);
    const [showEditModal, setShowEditModal] = useState(false);
    const openEditModal = () => {
        setShowEditModal(true);
    };
    const closeEditModal = () => {
        setShowEditModal(false);
    };
    function deleteComment(e) {
        e.preventDefault();
        async function deleteBlogComment() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/${post._id}/${comment._id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("blog")) {
                        getData();
                        Swal.fire({
                            title: "Comment Deleted Successfully!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Delete Comment Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Delete Comment Failed",
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
        deleteBlogComment();
    }
    return (
        <>
            <Button variant="btn-outline-dark" onClick={() => openEditModal()}>
                Delete
            </Button>
            <Modal show={showEditModal} onHide={closeEditModal}>
                <Form onSubmit={(e) => deleteComment(e)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete Comment?</Modal.Title>
                    </Modal.Header>
                    <Modal.Footer>
                        <Button variant="grey" onClick={closeEditModal}>
                            Cancel
                        </Button>
                        <Button variant="light" type="submit" id="submitBtn">
                            Confirm
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
