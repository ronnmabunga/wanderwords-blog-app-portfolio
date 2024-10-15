import { useState, useEffect, useContext } from "react";
import SessionContext from "../context/SessionContext";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function NewPost() {
    const { loading, setLoading, getData } = useContext(SessionContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [allowPost, setAllowPost] = useState(false);
    function postBlog(e) {
        e.preventDefault();
        async function postNewBlog() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs`, {
                method: "POST",
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
                            title: "Blog Posted Successfully!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Blog Post Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Blog Post Failed",
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
        postNewBlog();
    }
    useEffect(() => {
        if (title !== "" && content !== "") {
            setAllowPost(true);
        } else {
            setAllowPost(false);
        }
    }, [title, content]);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section">
                <img src="/images/posts.png" alt="New Post" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center align-items-center min-vh-100">
                    <div className="secondary-container col-10 col-md-8 col-lg-6 p-5">
                        <div>
                            <Form onSubmit={(e) => postBlog(e)}>
                                <h2>Write New Post</h2>
                                <Form.Group controlId="postTitle">
                                    <Form.Label>Post Title:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Post Title" required value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group controlId="content">
                                    <Form.Label>Content:</Form.Label>
                                    <Form.Control as="textarea" rows={15} required value={content} onChange={(e) => setContent(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mt-3">
                                    {allowPost && !loading ? (
                                        <Button variant="light" type="submit" id="submitBtn">
                                            Submit New Post
                                        </Button>
                                    ) : (
                                        <Button variant="dark" type="submit" id="submitBtn" disabled>
                                            Fill in All Fields First
                                        </Button>
                                    )}
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
