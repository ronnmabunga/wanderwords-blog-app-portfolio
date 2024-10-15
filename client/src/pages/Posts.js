import { useState, useContext, useEffect } from "react";
import SessionContext from "../context/SessionContext";
import { Container, Row } from "react-bootstrap";
import PostCardPreview from "../components/PostCardPreview";
export default function Posts() {
    const { user, data, timeSince } = useContext(SessionContext);
    const [posts, setPosts] = useState(null);
    useEffect(() => {
        if (data !== null) {
            let sortedData = data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            sortedData.forEach((data) => (data.timeSince = timeSince(data.creationDate)));
            setPosts(sortedData);
        }
    }, [data]);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section ">
                <img src="/images/posts.png" alt="Posts" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                    <Container>
                        <Row className="pt-3 me-auto">
                            <div className="col">
                                <h2>Blog Posts:</h2>
                            </div>
                        </Row>
                        <Row className="col pt-3">
                            <div className="col">
                                {posts !== null && posts !== undefined && posts.length !== 0
                                    ? posts.map((post) => (
                                          <div className="col-12" id={"post-" + post._id} key={post._id} md={3}>
                                              <PostCardPreview post={post} />
                                          </div>
                                      ))
                                    : "No posts yet! Write one now!"}
                            </div>
                        </Row>
                    </Container>
                </div>
            </div>
        </section>
    );
}
