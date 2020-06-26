import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Row, Col } from "reactstrap";

const HelpPage = props => {
    const { t } = useTranslation("contribute");
    return (
      <>
        <Container className="themed-container clearfix" fluid={true}>
          <Row>
            <Col sm="2" style={{ padding: "1.5rem", paddingTop: "2rem", borderRight: "1px solid #0000001a" }}>
            </Col>
            <hr />
            <Col sm="7" style={{ padding: "3rem", borderTop: "1px solid #0000001a" }}>
              <h1>{t("title")}</h1>
              <p>{t("intro0")}</p>
              <p>
                {t("intro1")}
                <a href="https://github.com/neighborhood-watch-alarm/nwa" target="_blank" rel="noopener noreferrer">{t("intro2")}</a>{" "}
                {t("intro3")}
                <a href="https://github.com/neighborhood-watch-alarm/nwa/blob/master/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">{t("intro4")}</a>{" "}
                {t("intro5")}
                <a href="https://github.com/neighborhood-watch-alarm/nwa/wiki" target="_blank" rel="noopener noreferrer">{t("intro6")}</a>{" "}
              </p>
            </Col>
            <Col sm="1"></Col>
            <Col
              sm="2"
              style={{
                padding: "1.5rem",
                paddingTop: "2rem",
                borderLeft: "1px solid #0000001a",
                borderTop: "1px solid #0000001a"
              }}
            >
            </Col>
          </Row>
        </Container>
      </>
    );
};

export default HelpPage;
