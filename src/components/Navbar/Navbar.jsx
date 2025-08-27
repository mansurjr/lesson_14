import { memo, useState, useEffect, useRef } from "react";
import { Link } from "react-scroll";
import { navbarMenu } from "../../utils";
import Container from "../Container/Container";
import "./Navbar.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const renderMenu = () => {
    return navbarMenu.map((item, index) => (
      <li
        key={index}
        className="navbar-item"
        onClick={() => setIsOpen(false)}
      >
        <Link
          to={item.toLowerCase()}
          smooth={true}
          duration={500}
          spy={true}
          offset={-70}>
          {item}
        </Link>
      </li>
    ));
  };

  return (
    <nav className="navbar" id="navbar" ref={menuRef}>
      <Container>
        <div className="navbar-menu-icon" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <GiHamburgerMenu />}
        </div>

        <ul className={`navbar-menu ${isOpen ? "active" : ""}`}>
          {renderMenu()}
        </ul>
      </Container>
    </nav>
  );
};

export default memo(Navbar);
