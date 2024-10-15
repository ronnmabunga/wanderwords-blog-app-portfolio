import { Link } from "react-router-dom";
import { Row } from "react-bootstrap";
import UserRegisterForm from "../components/UserRegisterForm";
export default function UserRegister() {
    return (
        <section className="outer-section container">
            <div className="overlayed-section login-section">
                <img src="/images/login.webp" alt="Register" className="image-overlay" />
                <div className="section-content row d-flex justify-content-center align-items-center min-vh-100">
                    <div className="secondary-container col-10 col-md-8 col-lg-6 p-5">
                        <UserRegisterForm />
                        <Row className="text-center">
                            <Link className="p-5 supressed-link" to="/login">
                                Already have an account? Click Here to Login
                            </Link>
                        </Row>
                    </div>
                </div>
            </div>
        </section>
    );
}
