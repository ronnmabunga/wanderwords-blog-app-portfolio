// Utility
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { SessionProvider } from "./context/SessionContext";
// UI
import "./App.css";
import AppSpinner from "./components/AppSpinner";
import AppNavbar from "./components/AppNavbar";
// Pages
import Home from "./pages/Home";
import UserRegister from "./pages/UserRegister";
import UserLogin from "./pages/UserLogin";
// import UserProfile from "./pages/UserProfile";
import UserLogout from "./pages/UserLogout";
import MyPosts from "./pages/MyPosts";
import Posts from "./pages/Posts";
import NewPost from "./pages/NewPost";
import PostView from "./pages/PostView";
// import Categories from "./pages/Categories";
// import ViewCategory from "./pages/ViewCategory";
import Authors from "./pages/Authors";
import AuthorView from "./pages/AuthorView";
// import Manage from "./pages/Manage";
import ManageComments from "./pages/ManageComments";
import ManageContact from "./pages/ManageContact";

// import ManageCategories from "./pages/ManageCategories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Search from "./pages/Search";
export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [authors, setAuthors] = useState(null);
    const [comments, setComments] = useState(null);
    const [contactMessages, setContactMessages] = useState(null);
    const [userLoading, setUserLoading] = useState(false);
    const [dataLoading, setDataLoading] = useState(false);
    const [contactMessagesLoading, setContactMessagesLoading] = useState(false);
    const [loading, setLoading] = useState(true);
    async function getUser() {
        setUserLoading(true);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/users/details`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.hasOwnProperty("user")) {
                    setUser(data.user);
                } else {
                    setUser(null);
                }
            })
            .catch((error) => {
                setUser(null);
            });
        setUserLoading(false);
    }
    async function getData() {
        setDataLoading(true);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/blogs/all`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.hasOwnProperty("blogs")) {
                    setData(data.blogs);
                } else {
                    setData(null);
                }
            })
            .catch((error) => {
                setData(null);
            });
        setDataLoading(false);
    }
    async function getMessages() {
        setContactMessagesLoading(true);
        await fetch(`${process.env.REACT_APP_API_BASE_URL}/messages/`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.hasOwnProperty("messages")) {
                    setContactMessages(data.messages);
                } else {
                    setContactMessages(null);
                }
            })
            .catch((error) => {
                setContactMessages(null);
            });
        setContactMessagesLoading(false);
    }
    function timeSince(dateString) {
        const createdAt = new Date(dateString);
        const now = new Date();
        const differenceInMs = now - createdAt;
        const seconds = Math.floor(differenceInMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        if (days > 0) return `${days} day(s) ago`;
        if (hours > 0) return `${hours} hour(s) ago`;
        if (minutes > 0) return `${minutes} minute(s) ago`;
        return `${seconds} second(s) ago`;
    }
    useEffect(() => {
        getData();
        if (localStorage.getItem("token") !== null) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);
    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            getUser();
        }
    }, [isLoggedIn]);
    useEffect(() => {
        setLoading(userLoading || dataLoading);
    }, [userLoading, dataLoading]);
    useEffect(() => {
        setLoading(true);
        if (data !== null) {
            let authors = [];
            let sortedData = data.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            sortedData.forEach((post) => {
                post.timeSince = timeSince(post.creationDate);
                let foundAuthor = authors.find((author) => author.email === post.posterEmail);
                if (foundAuthor) {
                    foundAuthor.posts.push(post);
                } else {
                    authors.push({ _id: post.posterId, email: post.posterEmail, posts: [post] });
                }
            });
            setAuthors(authors);
        }
        setLoading(false);
    }, [data]);
    useEffect(() => {
        setLoading(true);
        if (data !== null && user !== null && isLoggedIn && user.isAdmin === true) {
            let comments = [];
            data.forEach((post) => {
                post.comments.forEach((comment) => {
                    comment.post = post;
                });
                comments.push(...post.comments);
            });
            let sortedComments = comments.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate));
            setComments(sortedComments);
            getMessages();
        }
        setLoading(false);
    }, [user, data, isLoggedIn]);
    return (
        <SessionProvider value={{ isLoggedIn, setIsLoggedIn, user, setUser, data, getUser, getData, authors, comments, contactMessages, getMessages, loading, setLoading, timeSince }}>
            <Router>
                <main>
                    <AppNavbar />
                    {loading ? (
                        <AppSpinner />
                    ) : (
                        <Routes>
                            <Route index element={<Home />} />
                            <Route path="register" element={isLoggedIn === false ? <UserRegister /> : <Navigate to="/" replace={true} />} />
                            <Route path="login" element={isLoggedIn === false ? <UserLogin /> : <Navigate to="/posts" replace={true} />} />
                            {/* <Route path="profile" element={isLoggedIn === true ? <UserProfile /> : <Navigate to="/login" replace={true} />} /> */}
                            <Route path="logout" element={<UserLogout />} />
                            <Route path="posts">
                                <Route index element={isLoggedIn === true ? <MyPosts /> : <Posts />} />
                                <Route path="new" element={isLoggedIn === true ? <NewPost /> : <Navigate to="/login" replace={true} />} />
                                <Route path=":blogId" element={<PostView />} />
                                <Route path="feed" element={<Posts />} />
                            </Route>
                            {/* <Route path="category">
                                <Route index element={<Categories />} />
                                <Route path=":category" element={<ViewCategory />} />
                            </Route> */}
                            <Route path="authors">
                                <Route index element={<Authors />} />
                                <Route path=":userId" element={<AuthorView />} />
                            </Route>
                            <Route path="dashboard">
                                <Route path="posts" element={isLoggedIn === true && user !== null && user.isAdmin === true ? <Posts /> : <Navigate to="/" replace={true} />} />
                                <Route path="comments" element={isLoggedIn === true && user !== null && user.isAdmin === true ? <ManageComments /> : <Navigate to="/" replace={true} />} />
                                <Route path="contact" element={isLoggedIn === true && user !== null && user.isAdmin === true ? <ManageContact /> : <Navigate to="/" replace={true} />} />
                                {/* <Route path="categories" element={isLoggedIn && user !== null && user.isAdmin === true ? <ManageCategories /> : <Navigate to="/" replace={true} />} /> */}
                            </Route>
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<Contact />} />
                            <Route path="search" element={<Search />} />
                            <Route path="*" element={<Navigate to="/" replace={true} />} />
                        </Routes>
                    )}
                </main>
            </Router>
        </SessionProvider>
    );
}
