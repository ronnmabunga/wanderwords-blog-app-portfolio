import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import UserLoginForm from "../components/UserLoginForm";
export default function UserLogin() {
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section">
                <img src="/images/login.webp" alt="Login" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center align-items-center min-vh-100">
                    <div className="secondary-container col-10 col-md-8 col-lg-6 p-5">
                        <UserLoginForm />
                        <Row className="text-center">
                            <Link className="p-5 supressed-link" to="/register">
                                No account yet? Click Here to Register
                            </Link>
                        </Row>
                    </div>
                </div>
            </div>
        </section>
    );
}
