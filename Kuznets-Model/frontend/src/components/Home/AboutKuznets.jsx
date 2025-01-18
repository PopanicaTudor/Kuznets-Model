import React from "react";
import "../../styles/FlipCard.css";
import CurveImage from "../../images/Kuznets.png";

const FlipCard = ({ front, back }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">{front}</div>
        <div className="flip-card-back">{back}</div>
      </div>
    </div>
  );
};

const AboutKuznets = () => {
  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "800px",
        padding: "20px",
        textAlign: "justify",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}></h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <FlipCard
          front={
            <p>
              <strong>What is it?</strong>
            </p>
          }
          back={
            <p>
              The Kuznets Curve represents an economic hypothesis showing how
              income inequality changes as an economy develops. Initially,
              inequality rises as industrialization creates wealth, but
              eventually, redistribution mechanisms reduce disparities.
            </p>
          }
        />
        <FlipCard
          front={
            <p>
              <strong>Key Features</strong>
            </p>
          }
          back={
            <p>
              The curve demonstrates an inverted U-shape, where early growth
              intensifies inequality. However, social reforms and economic
              maturity later promote a more equitable distribution of resources.
            </p>
          }
        />
        <FlipCard
          front={
            <p>
              <strong>Debates</strong>
            </p>
          }
          back={
            <p>
              {" "}
              While useful, critics argue that the Kuznets Curve oversimplifies
              inequality dynamics. Factors like globalization, technological
              advances, and environmental challenges often disrupt its
              predictions.
            </p>
          }
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "2em",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "currentcolor",
          }}
        >
          The Kuznets Curve and Environmental Impacts
        </h2>

        <p
          style={{
            marginBottom: "20px",
            fontSize: "1.2em",
            lineHeight: "1.6",
            fontWeight: "normal",
          }}
        >
          The image below illustrates the Kuznets Curve applied to environmental
          contexts. It shows how environmental degradation initially increases
          with economic growth, reaching a turning point where improvement
          begins as societies prioritize sustainability.
        </p>

        <img
          src={CurveImage}
          alt="Kuznets Curve"
          style={{
            display: "block",
            margin: "0 auto",
            maxWidth: "80%",
            height: "auto",
            imageRendering: "auto",
            borderRadius: "10px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <h2
          style={{
            marginBottom: "10px",
            fontSize: "2em",
            fontWeight: "bold",
            textTransform: "uppercase",
            color: "currentcolor",
          }}
        >
          Data Used For Analysis
        </h2>

        <p
          style={{
            marginBottom: "20px",
            fontSize: "1.2em",
            lineHeight: "1.6",
            fontWeight: "normal",
          }}
        >
          The Environmental Kuznets Curve (EKC) visualization is based on
          real-world data sourced from{" "}
          <a
            href="https://databank.worldbank.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline", color: "blue" }} // Stil pentru link
          >
            WorldDataBank
          </a>
          . This dataset includes up-to-date and relevant information on
          indicators such as GDP, CO2 emissions, air pollution, and other forms
          of environmental degradation, providing a practical and data-driven
          representation of the relationship between economic development and
          environmental impact.
        </p>
      </div>
    </div>
  );
};

export default AboutKuznets;
