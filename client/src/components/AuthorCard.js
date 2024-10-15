import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import PostCardPreview from "./PostCardPreview";
export default function AuthorCard({ author }) {
    return (
        <Card className="p-5 m-3">
            <Card.Title className="pt-4">
                <Link className="supressed-link" to={"/authors/" + author._id}>
                    {author.email}
                </Link>
            </Card.Title>
            <Card.Subtitle>Post Count: {author.posts.length}</Card.Subtitle>
            <div className="d-none d-md-block">
                <Card.Body>
                    {author.posts.length > 0 ? (
                        <>
                            <h5>Last Post:</h5> <PostCardPreview post={author.posts[0]} />
                        </>
                    ) : (
                        "No posts yet."
                    )}
                </Card.Body>
            </div>
        </Card>
    );
}
