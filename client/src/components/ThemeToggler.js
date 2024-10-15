import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faCloud, faSun } from "@fortawesome/free-solid-svg-icons";
export default function ThemeToggler({ text }) {
    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <Button onClick={toggleTheme} className="btn btn-dark btn-outline-light">
            {theme === "light" ? (
                <>
                    {text === "hide" ? "" : "Toggle Dark Mode  "}
                    <FontAwesomeIcon icon={faMoon} />
                </>
            ) : theme === "dark" ? (
                <>
                    {text === "hide" ? "" : "Unset Color Mode  "}
                    <FontAwesomeIcon icon={faCloud} />
                </>
            ) : (
                <>
                    {text === "hide" ? "" : "Toggle Light Mode  "}
                    <FontAwesomeIcon icon={faSun} />
                </>
            )}
        </Button>
    );
}
