import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Container, Row, Card } from "react-bootstrap";
import SessionContext from "../context/SessionContext";
import PostEditModal from "../components/PostEditModal";
import PostConfirmDeleteModal from "../components/PostConfirmDeleteModal";
import CommentCard from "../components/CommentCard";
import CommentAddForm from "../components/CommentAddForm";
export default function PostView() {
    const { blogId } = useParams();
    const { isLoggedIn, user, data, timeSince, loading } = useContext(SessionContext);
    const [post, setPost] = useState(null);
    const [found, setFound] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (data !== null) {
            let foundData = data.find((post) => post._id === blogId);
            if (foundData !== undefined && foundData !== null) {
                foundData.timeSince = timeSince(foundData.creationDate);
                if (foundData.comments !== null) {
                    let sortedComments = foundData.comments.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
                    sortedComments.forEach((comment) => (comment.timeSince = timeSince(comment.creationDate)));
                    foundData.comments = sortedComments;
                }
                setPost(foundData);
                setFound(true);
            } else {
                setFound(true);
            }
        }
    }, [data]);
    const [showEditButton, setEditButton] = useState(null);
    const [showDeleteButton, setShowDeleteButton] = useState(null);
    const [showButtons, setShowButtons] = useState(null);
    useEffect(() => {
        if (isLoggedIn && user !== null && post !== null && (user._id === post.posterId || user.isAdmin === true)) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
        if (isLoggedIn && user !== null && post !== null && user._id === post.posterId) {
            setEditButton(true);
        } else {
            setEditButton(false);
        }
    }, [user, post]);
    useEffect(() => {
        if (showDeleteButton || showEditButton) {
            setShowButtons(true);
        } else {
            setShowButtons(false);
        }
    }, [showDeleteButton, showEditButton]);
    useEffect(() => {
        if (!loading && found && post === null) {
            navigate("/posts");
        }
    }, [loading, found]);
    return !loading && post !== null ? (
        <section className="outer-section container" id="top">
            <div className="overlayed-section login-section ">
                <img src="/images/posts.png" alt="Register" className="image-overlay" />
                <div className="section-content container-fluid min-vh-100">
                    <Container>
                        <Row className="col pt-3">
                            <div className="col">
                                <Card className="p-5 m-1">
                                    <Card.Title className="pt-4">
                                        <h1>{post.title}</h1>
                                    </Card.Title>
                                    <Card.Subtitle>
                                        <Link className="supressed-link" to={"/authors/" + post.posterId}>
                                            By: {post.posterEmail}
                                        </Link>
                                        <h3></h3>
                                    </Card.Subtitle>
                                    <Card.Subtitle className="pb-5">{post.timeSince}</Card.Subtitle>
                                    <Card.Body className="pt-5">{post.content}</Card.Body>
                                    {showButtons ? (
                                        <Card.Footer>
                                            {showEditButton ? <PostEditModal post={post} /> : ""}
                                            {showDeleteButton ? <PostConfirmDeleteModal post={post} /> : ""}
                                        </Card.Footer>
                                    ) : (
                                        ""
                                    )}
                                </Card>
                                <Card className="p-3 m-1">
                                    <Card.Title>Comments:</Card.Title>
                                    {post.comments !== null && post.comments !== undefined && post.comments.length !== 0
                                        ? post.comments.map((comment) => (
                                              <div className="col-12" id={"comment-" + comment._id} key={comment._id} md={3}>
                                                  <CommentCard post={post} comment={comment} />
                                              </div>
                                          ))
                                        : "No comments yet! Reply now!"}
                                    <Card.Footer>
                                        <CommentAddForm post={post} />
                                    </Card.Footer>
                                </Card>
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    ) : (
        ""
    );
}
