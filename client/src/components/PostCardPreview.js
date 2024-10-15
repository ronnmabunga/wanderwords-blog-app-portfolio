import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import SessionContext from "../context/SessionContext";
import PostEditModal from "./PostEditModal";
import PostConfirmDeleteModal from "./PostConfirmDeleteModal";
export default function PostCardPreview({ post }) {
    const { isLoggedIn, user } = useContext(SessionContext);
    const [showEditButton, setEditButton] = useState(null);
    const [showDeleteButton, setShowDeleteButton] = useState(null);
    const [showButtons, setShowButtons] = useState(null);
    useEffect(() => {
        if (isLoggedIn && user !== null && (user._id === post.posterId || user.isAdmin === true)) {
            setShowDeleteButton(true);
        } else {
            setShowDeleteButton(false);
        }
        if (isLoggedIn && user !== null && user._id === post.posterId) {
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
    return (
        <Card className="p-2">
            <Card.Title className="pt-4">
                <Link className="supressed-link" to={"/posts/" + post._id}>
                    {post.title}
                </Link>
            </Card.Title>
            <Card.Subtitle>
                <Link className="undecorated-link" to={"/authors/" + post.posterId}>
                    By: {post.posterEmail}
                </Link>
            </Card.Subtitle>
            <Card.Subtitle>{post.timeSince}</Card.Subtitle>
            <Card.Body>
                <Link className="supressed-link" to={"/posts/" + post._id}>
                    {post.comments.length} Comment(s)
                </Link>
            </Card.Body>
            {showButtons ? (
                <Card.Footer>
                    {showEditButton ? <PostEditModal post={post} /> : ""}
                    {showDeleteButton ? <PostConfirmDeleteModal post={post} /> : ""}
                </Card.Footer>
            ) : (
                ""
            )}
        </Card>
    );
}
