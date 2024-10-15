import { useState, useContext, useEffect } from "react";
import SessionContext from "../context/SessionContext";
import { Link } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import PostCardPreview from "../components/PostCardPreview";
export default function MyPosts() {
    const { isLoggedIn, user, data, timeSince } = useContext(SessionContext);
    const [myPosts, setMyPosts] = useState(null);
    useEffect(() => {
        if (data !== null && isLoggedIn && user !== null) {
            let sortedData = data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            let filteredData = sortedData.filter((data) => data.posterId === user._id);
            filteredData.forEach((data) => (data.timeSince = timeSince(data.creationDate)));
            setMyPosts(filteredData);
        }
    }, [data, user, timeSince]);
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section ">
                <img src="/images/posts.png" alt="My Posts" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                    <Container>
                        <Row className="pt-3 me-auto">
                            <div className="col-8 col-lg-10">
                                <h2>Blog Posts:</h2>
                            </div>
                            <div className="col-4 col-lg-2">
                                <Link className="btn btn-dark btn-outline-light" to={"/posts/new"}>
                                    New Post
                                </Link>
                            </div>
                        </Row>
                        <Row className="col pt-3">
                            <div className="col">
                                {myPosts !== null && myPosts !== undefined && myPosts.length !== 0
                                    ? myPosts.map((post) => (
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
