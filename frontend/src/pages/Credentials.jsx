import React from "react";
import "../styles/Credentials.css";

const Credentials = () => {
  const emails = [
    { name: "Ion Andrei-Sorin", email: "andreisorinion2018@gmail.com" },
    {
      name: "Luntraru Maria-Alexandra",
      email: "mariaalexandraluntraru@gmail.com",
    },
    { name: "Popanica-Răboj Tudor", email: "tpopanica@gmail.com" },
    { name: "Sultzer Roxana-Maria", email: "mariaroxana170@yahoo.com" },
    { name: "Tudor Mihaela", email: "tudormihaela2211@gmail.com" },
  ];

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "800px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5em",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "20px",
          color: "#333",
        }}
      >
        Credentials
      </h1>

      <ul style={{ listStyle: "none", padding: "0", color: "#000" }}>
        {emails.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid #ddd",
              fontSize: "1.2em",
              color: "#000",
            }}
          >
            <strong>{item.name}:</strong> <span>{item.email}</span>
          </li>
        ))}
      </ul>
      <div
        style={{
          textAlign: "justify",
          marginTop: "40px",
          lineHeight: "1.6",
          fontSize: "0.9em",
        }}
      >
        <p>
          This project is developed as part of the initiative
          <strong>
            {" "}
            "Gender, Digitalization, Green: Ensuring a Sustainable Future for
            all in Europe"
          </strong>
          , Ref. Project: 2023-1-RO01- KA220-HED-000154433. The leader of this
          initiative is the
          <strong>
            {" "}
            University of Agricultural Sciences and Veterinary Medicine
          </strong>
          , with UNSTPB as a partner, alongside: Universitat Autonoma de
          Barcelona, Spain, Universidade do Porto, Portugal, Uzhgorodskyi
          Nacionalnyi Universitet, Ukraine.
        </p>
      </div>
    </div>
  );
};

export default Credentials;
