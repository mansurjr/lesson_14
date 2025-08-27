import { memo } from "react";
import "./Footer.scss";
import Container from "../Container/Container";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>{" "}
        </div>
      </Container>
    </footer>
  );
};

export default memo(Footer);
