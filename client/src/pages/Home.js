import { Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
export default function Home() {
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section">
                <img src="/images/home.png" alt="Register" className="image-overlay" />
                <div className="secondary-container section-content-relative d-flex row justify-content-center ">
                    <div className="col-11 m-5 p-5 text-center">
                        <Container className="min-vh-100 container-fluid align-items-center justify-content-center">
                            <h1 className="">
                                <span className="logo">WanderWords</span>
                            </h1>
                            <h5 className="py-2">Where Every Post is an Adventure.</h5>
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
