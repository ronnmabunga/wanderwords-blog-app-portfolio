import { useState, useContext, useEffect } from "react";
import SessionContext from "../context/SessionContext";
import { Container, Row } from "react-bootstrap";
import CommentCard from "../components/CommentCard";
export default function Posts() {
    const { user, comments, timeSince } = useContext(SessionContext);
    const [commentsData, setCommentsData] = useState(null);
    useEffect(() => {
        if (comments !== null) {
            let sortedComments = comments.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            sortedComments.forEach((comment) => (comment.timeSince = timeSince(comment.creationDate)));
            setCommentsData(sortedComments);
        }
    }, [comments]);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section ">
                <img src="/images/posts.png" alt="Posts" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                    <Container>
                        <Row className="pt-3 me-auto">
                            <div className="col">
                                <h2>Manage Comments:</h2>
                            </div>
                        </Row>
                        <Row className="col pt-3">
                            <div className="col">
                                {commentsData !== null && commentsData !== undefined && commentsData.length !== 0
                                    ? commentsData.map((comment) => (
                                          <div className="col-12" id={"comment-" + comment._id} key={comment._id} md={3}>
                                              <CommentCard post={comment.post} comment={comment} linkBackType="external" />
                                          </div>
                                      ))
                                    : "No comments yet!"}
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}
