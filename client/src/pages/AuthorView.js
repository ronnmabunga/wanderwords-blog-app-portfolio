import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import { Container, Card } from "react-bootstrap";
import PostCardPreview from "../components/PostCardPreview";
export default function AuthorView() {
    const { userId } = useParams();
    const { loading, setLoading, authors } = useContext(SessionContext);
    const [author, setAuthor] = useState(null);
    const [found, setFound] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        if (authors !== null) {
            setLoading(true);
            let foundAuthor = authors.find((author) => author._id === userId);
            if (foundAuthor) {
                setAuthor(foundAuthor);
                setFound(true);
            } else {
                setAuthor(null);
                setFound(true);
            }
            setLoading(false);
        }
    }, [authors, userId]);
    useEffect(() => {
        if (!loading && found && author === null) {
            navigate("/authors");
        }
    }, [loading, found]);
    return !loading && author !== null ? (
        <section className="outer-section container">
            <div className="overlayed-section login-section ">
                <img src="/images/login.webp" alt="Posts" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                    <Card className="p-5">
                        <Card.Title className="pt-4">
                            <h5>{author.email}</h5>
                        </Card.Title>
                        <Card.Subtitle>Post Count: {author.posts.length}</Card.Subtitle>
                        <Card.Body className="p-0 m-1">
                            {author.posts !== null && author.posts !== undefined && author.posts.length !== 0
                                ? author.posts.map((post) => (
                                      <div id={"post-" + post._id} key={post._id} md={3}>
                                          <PostCardPreview post={post} />
                                      </div>
                                  ))
                                : "No posts yet!"}
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </section>
    ) : (
        ""
    );
}
