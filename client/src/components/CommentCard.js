import { Card } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import CommentEditModal from "./CommentEditModal";
import CommentConfirmDeleteModal from "./CommentConfirmDeleteModal";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
export default function CommentCard({ post, comment, linkBackType }) {
    const { isLoggedIn, user } = useContext(SessionContext);
    const [showEditButton, setShowEditButton] = useState(null);
    const [showDeleteButton, setShowDeleteButton] = useState(null);
    useEffect(() => {
        if (isLoggedIn && user !== null && user._id === comment.commenterId) {
            setShowEditButton(true);
        } else {
            setShowEditButton(false);
        }
    }, [isLoggedIn, user, post, comment]);
    useEffect(() => {
        if (isLoggedIn && user !== null && (user._id === comment.commenterId || user.isAdmin === true)) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
    }, [isLoggedIn, user, post, comment]);
    return (
        <Card className="p-3 m-1">
            {linkBackType === "external" ? (
                <div className="d-flex row justify-content-between">
                    <div className="col-12 col-lg-6 my-2 me-1">
                        <Card.Subtitle>
                            {comment.commenterId !== "Anonymous" ? (
                                <Link className="supressed-link" to={"/authors/" + comment.commenterId}>
                                    {comment.commenterEmail || comment.commenterId}
                                </Link>
                            ) : (
                                comment.commenterEmail || comment.commenterId
                            )}
                            :
                        </Card.Subtitle>
                        <Card.Subtitle>
                            <small>{comment.timeSince}</small>
                        </Card.Subtitle>
                    </div>
                    <div className="col-12 col-lg-5 my-2 ms-1">
                        <div>Posted at:</div>
                        <div>
                            <HashLink className="ms-1 comment-link-back" to={`/posts/${post._id}#comment-${comment._id}`}>
                                {post.title}
                            </HashLink>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Subtitle>
                            {comment.commenterId !== "Anonymous" ? (
                                <Link className="supressed-link" to={"/authors/" + comment.commenterId}>
                                    {comment.commenterEmail || comment.commenterId}
                                </Link>
                            ) : (
                                comment.commenterEmail || comment.commenterId
                            )}
                            :
                        </Card.Subtitle>
                        <Card.Subtitle>
                            <small>{comment.timeSince}</small>
                        </Card.Subtitle>
                    </div>
                    <div>
                        <a className="supressed-link" href="#top">
                            ↑ Top
                        </a>
                    </div>
                </div>
            )}
            <Card.Body>{comment.comment}</Card.Body>
            {showDeleteButton ? (
                <Card.Footer>
                    {showEditButton ? <CommentEditModal post={post} comment={comment} /> : ""}
                    {showDeleteButton ? <CommentConfirmDeleteModal post={post} comment={comment} /> : ""}
                </Card.Footer>
            ) : (
                ""
            )}
        </Card>
    );
}
