import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SessionContext from "../context/SessionContext";
import { Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";
export default function UserLoginForm() {
    const navigate = useNavigate();
    const { loading, setLoading, setIsLoggedIn } = useContext(SessionContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [allowLogin, setAllowLogin] = useState(true);
    function authenticate(e) {
        e.preventDefault();
        async function loginUser() {
            setLoading(true);
            await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/login`, {
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
                    if (data.hasOwnProperty("access")) {
                        localStorage.setItem("token", data.access);
                        setIsLoggedIn(true);
                        setLoading(false);
                        Swal.fire({
                            title: "Login Successful",
                            icon: "success",
                            timer: 3000,
                            timerProgressBar: true,
                            willClose: () => {
                                navigate("/posts");
                            },
                        });
                        setEmail("");
                        setPassword("");
                    } else if (data.hasOwnProperty("error")) {
                        setPassword("");
                        Swal.fire({
                            title: "Authentication Failed",
                            icon: "error",
                            text: data.error,
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    } else {
                        setPassword("");
                        Swal.fire({
                            title: "Authentication Failed",
                            icon: "error",
                            text: "Something went wrong. Check your login details and try again.",
                            timer: 1000,
                            timerProgressBar: true,
                        });
                    }
                })
                .catch((error) => {});
            setLoading(false);
        }
        loginUser();
    }
    useEffect(() => {
        if (email !== "" && password !== "") {
            setAllowLogin(true);
        } else {
            setAllowLogin(false);
        }
    }, [email, password]);
    return (
        <>
            <div>
                <Form onSubmit={(e) => authenticate(e)}>
                    <h1 className="my-5 text-center">Login</h1>
                    <Form.Group controlId="userEmail" className="form-group email-group">
                        <Form.Label className="form-label email-label">Email Address</Form.Label>
                        <div className="input-with-icon">
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" required className="form-control email-input" />
                        </div>
                    </Form.Group>
                    <Form.Group controlId="password" className="form-group password-group">
                        <Form.Label className="form-label password-label">Password</Form.Label>
                        <div className="input-with-icon">
                            <Form.Control type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required className="form-control password-input" />
                        </div>
                    </Form.Group>
                    <Form.Group className="mt-3 button-group">
                        {allowLogin && !loading ? (
                            <Button variant="light" type="submit" id="submitBtn" className="btn submit-btn">
                                Sign In
                            </Button>
                        ) : (
                            <Button variant="dark" type="submit" id="submitBtn" disabled className="btn disabled-btn">
                                Fill in All Fields First
                            </Button>
                        )}
                    </Form.Group>
                </Form>
            </div>
        </>
    );
}
