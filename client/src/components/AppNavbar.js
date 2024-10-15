import { useContext } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";
import ThemeToggler from "./ThemeToggler";
import SearchBar from "./SearchBar";
import SessionContext from "../context/SessionContext";
export default function AppNavbar() {
    const location = useLocation();
    const { isLoggedIn, user } = useContext(SessionContext);
    return (
        <Navbar expand="lg" className="bg-body-tertiary" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/">
                    <img alt="" src="/logo.png" width="30" height="30" className="d-inline-block align-top" /> <span className="logo">WanderWords</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Home" id="basic-nav-dropdown">
                            <NavDropdown.Item as={NavLink} to="/" end>
                                Home
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/about" end>
                                About Us
                            </NavDropdown.Item>
                            <NavDropdown.Item as={NavLink} to="/contact" end>
                                Contact Us
                            </NavDropdown.Item>
                        </NavDropdown>
                        {isLoggedIn && user !== null ? (
                            user.isAdmin === true ? (
                                <>
                                    <NavDropdown title="My Posts" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/posts" end>
                                            My Posts
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/posts/new" end>
                                            Write New Post
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} to="/posts/feed" end>
                                            All Posts
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/authors" end>
                                            View Authors
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown title="Dashboard" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/dashboard/comments" end>
                                            Manage Comments
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/dashboard/posts" end>
                                            Manage Posts
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/dashboard/contact" end>
                                            Manage Contact Form
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={NavLink} to="/logout" end>
                                        Logout
                                    </Nav.Link>
                                </>
                            ) : (
                                <>
                                    <NavDropdown title="Posts" id="basic-nav-dropdown">
                                        <NavDropdown.Item as={NavLink} to="/posts" end>
                                            My Posts
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/posts/new" end>
                                            Write New Post
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item as={NavLink} to="/posts/feed" end>
                                            All Posts
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={NavLink} to="/authors" end>
                                            View Authors
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <Nav.Link as={NavLink} to="/logout" end>
                                        Logout
                                    </Nav.Link>
                                </>
                            )
                        ) : (
                            <>
                                <NavDropdown title="Posts" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={NavLink} to="/posts" end>
                                        All Posts
                                    </NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/authors" end>
                                        View Authors
                                    </NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={NavLink} to="/login" end>
                                    Sign In
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/register" end>
                                    Register
                                </Nav.Link>
                            </>
                        )}

                        <div className="mx-2 d-inline d-lg-none">
                            <SearchBar />
                        </div>
                        <Nav.Link className="d-inline d-lg-none">
                            <ThemeToggler text={""} />
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <div className="mx-1 d-none d-lg-inline-block">
                    <SearchBar />
                </div>
                <Nav.Link className="mx-1 d-none d-lg-inline-block">
                    <ThemeToggler text={"hide"} />
                </Nav.Link>
            </Container>
        </Navbar>
    );
}
