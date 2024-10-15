import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function UserRegisterForm() {
    const navigate = useNavigate();
    const { loading, setLoading } = useContext(SessionContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [allowRegister, setAllowRegister] = useState(false);
    function register(e) {
        e.preventDefault();
        async function registerUser() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.hasOwnProperty("message") && data.message === "Registered Successfully") {
                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        setLoading(false);
                        Swal.fire({
                            title: "Registration Successful!",
                            icon: "success",
                            timer: 2000,
                            timerProgressBar: true,
                            showConfirmButton: false,
                            html: 'Redirecting in 2 seconds...<br/><a href="/login" class="btn btn-dark btn-outline-light mt-2" rel="noopener noreferrer">Proceed to Login Now</a>',
                            willClose: () => {
                                navigate("/login");
                            },
                        });
                    } else if (data.hasOwnProperty("error") && data.error === "Invalid password") {
                        Swal.fire({
                            title: "Registration Failed",
                            icon: "error",
                            text: "Password must be 8-32 characters long, with at least 1 special character, 1 digit, 1 lowercase and 1 uppercase letters.",
                            timer: 3000,
                            timerProgressBar: true,
                            showConfirmButton: true,
                        });
                    } else if (data.hasOwnProperty("error")) {
                        Swal.fire({
                            title: "Registration Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        Swal.fire({
                            title: "Registration Failed",
                            icon: "error",
                            text: "Something went wrong. Please try again later or contact us for assistance",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((error) => {});
            setLoading(false);
        }
        registerUser();
    }
    useEffect(() => {
        if (email !== "" && password !== "" && confirmPassword !== "" && password === confirmPassword && password.length >= 8) {
            setAllowRegister(true);
        } else {
            setAllowRegister(false);
        }
    }, [email, password, confirmPassword]);
    return (
        <div>
            <Form onSubmit={(e) => register(e)} className="register-form">
                <h1 className="my-5 text-center register-title">Register</h1>
                <Form.Group className="form-group email-group">
                    <Form.Label className="form-label email-label">Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" required value={email} autoComplete="on" onChange={(e) => setEmail(e.target.value)} className="form-control email-input" />
                </Form.Group>
                <Form.Group className="form-group password-group">
                    <Form.Label className="form-label password-label">Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" required value={password} autoComplete="new-password" onChange={(e) => setPassword(e.target.value)} className="form-control password-input" />
                </Form.Group>
                <Form.Group className="form-group confirm-password-group">
                    <Form.Label className="form-label confirm-password-label">Confirm Password:</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" required value={confirmPassword} autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} className="form-control confirm-password-input" />
                </Form.Group>
                <Form.Group className="mt-3 button-group">
                    {allowRegister && !loading ? (
                        <Button variant="light" type="submit" id="submitBtn" className="btn submit-btn">
                            Create Account
                        </Button>
                    ) : (
                        <Button variant="dark" type="submit" id="submitBtn" disabled className="btn disabled-btn">
                            Fill Each Field Correctly
                        </Button>
                    )}
                </Form.Group>
            </Form>
        </div>
    );
}
