import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

function Footer(props) {
  return (
    <footer className={"footer" + (props.default ? " footer-default" : "")}>
      <Container fluid={props.fluid ? true : false}>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  Drowning Fish
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  FAQ
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
                  T&C
                </a>
              </li>
            </ul>
          </nav>
          <div className="credits ml-auto">
            <div className="copyright">
              &copy; {1900 + new Date().getYear()}, Made by DOPE
            </div>
          </div>
        </Row>
      </Container>
    </footer>
  );
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
