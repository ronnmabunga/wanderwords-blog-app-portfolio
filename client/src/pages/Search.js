import { useState, useEffect, useMemo, useContext } from "react";
import { useLocation } from "react-router-dom";
import Fuse from "fuse.js";
import { Container, Row } from "react-bootstrap";
import SessionContext from "../context/SessionContext";
import PostCardPreview from "../components/PostCardPreview";
export default function Search() {
    const location = useLocation();
    const { data } = useContext(SessionContext);
    const [filteredResults, setFilteredResults] = useState([]);
    const availableData = Array.isArray(data) ? data : [];
    const fuse = useMemo(
        () =>
            new Fuse(availableData, {
                keys: [
                    { name: "title", weight: 2 },
                    { name: "content", weight: 1 },
                    { name: "posterEmail", weight: 0.5 },
                    { name: "comments.commenterEmail", weight: 0.3 },
                    { name: "comments.comment", weight: 0.2 },
                ],
                threshold: 0.3,
                ignoreLocation: true,
                useExtendedSearch: true,
                shouldSort: true,
            }),
        [availableData]
    );
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const query = params.get("query") || "";
        if (query) {
            const results = fuse.search(query);
            setFilteredResults(results.map((result) => result.item));
        } else {
            setFilteredResults(data);
        }
    }, [location.search, fuse, data]);
    return filteredResults !== null && filteredResults !== undefined ? (
        <div>
            <section className="outer-section container">
                <div className="overlayed-section login-section ">
                    <img src="/images/posts.png" alt="Posts" className="image-overlay" />
                    <div className="section-content row d-flex justify-content-center min-vh-100 p-5">
                        <Container>
                            <Row className="pt-3 me-auto">
                                <div className="col">
                                    <h2>Search Results:</h2>
                                </div>
                            </Row>
                            <Row className="col pt-3">
                                <div className="col">
                                    {filteredResults.length > 0 ? (
                                        filteredResults.map((item) => (
                                            <div className="col-12" id={"post-" + item._id} key={item._id} md={3}>
                                                <PostCardPreview post={item} />
                                            </div>
                                        ))
                                    ) : (
                                        <p>No results found</p>
                                    )}
                                </div>
                            </Row>
                        </Container>

                        <h2></h2>
                    </div>
                </div>
            </section>
        </div>
    ) : (
        ""
    );
}
