import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Home() {
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section">
                <img src="/images/home.png" alt="Register" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center align-items-center min-vh-100">
                    <div className="secondary-container col-11 m-5 p-5 text-center">
                        <Container className=" container-fluid align-items-center justify-content-center">
                            <h1 className="">
                                <span className="logo">About WanderWords</span>
                            </h1>
                            <p className="py-2">Welcome to WanderWords, a digital space where ideas roam freely and creativity knows no boundaries. Our blog is dedicated to those who love exploring the world through words—whether that’s through personal stories, thought-provoking insights, or deep dives into culture, technology, and the human experience. Here, every article is a journey, inviting readers to pause, reflect, and wander through new perspectives.</p>
                            <p className="py-2">At WanderWords, we believe that stories have the power to connect people across time and space. Our mission is to foster curiosity and spark meaningful conversations, bringing together a community of readers and writers who embrace the beauty of learning from diverse viewpoints. From life lessons to book reviews, travel musings to philosophical reflections, we cover topics that inspire both introspection and action.</p>
                            <p className="py-2">Whether you're here for inspiration, relaxation, or discovery, WanderWords offers a little something for everyone. So, take a moment to explore our pages, get lost in our content, and engage with a community that values the art of storytelling. After all, every word is a step in an endless journey—and we’re thrilled to have you wander with us.</p>
                            <div className="py-5">
                                <Button variant="secondary" as={Link} to="/login">
                                    Start Writing Today
                                </Button>
                            </div>
                        </Container>
                    </div>
                </div>
            </div>
        </section>
    );
}
