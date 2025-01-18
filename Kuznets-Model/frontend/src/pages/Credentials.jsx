import React from "react";
import "../styles/Credentials.css";

const Credentials = () => {
  const emails = [
    { name: "[LEADER] Popanica-Răboj Tudor", email: "tudor.popanica@stud.acs.upb.ro" },
    { name: "Ion Andrei-Sorin", email: "andrei_sorin.ion@stud.acs.upb.ro" },
    {
      name: "Luntraru Maria-Alexandra",
      email: "maria.luntraru@stud.acs.upb.ro",
    },
    { name: "Sultzer Roxana-Maria", email: "roxana.sultzer@stud.acs.upb.ro" },
    { name: "Tudor Mihaela", email: "mihaela.tudor2211@stud.acs.upb.ro" },
  ];

  return (
    <div
      style={{
        margin: "0 auto",
        maxWidth: "800px",
        padding: "20px",
        textAlign: "center",
        color: "currentColor",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5em",
          fontWeight: "bold",
          marginBottom: "20px",
          marginTop: "20px",
          color: "currentColor",
        }}
      >
        Credentials
      </h1>

      <div style={{ color: "currentColor" }}>
        {" "}
        {/* Adăugat aici */}
        <p
          style={{ lineHeight: "1.6", fontSize: "1em", color: "currentColor" }}
        >
          {" "}
          {/* Adăugat aici */}
          This project is developed as part of the initiative: <br />
          <br />
          <strong style={{ color: "currentColor" }}>
            {" "}
            {/* Adăugat aici */}
            "Gender, Digitalization, Green: Ensuring a Sustainable Future for
            all in Europe"
          </strong>{" "}
          <br />
          Ref. Project: 2023-1-RO01- KA220-HED-000154433, Partnership:
          Universitatea de Stiinte Agricole si Medicina Veterinara, Bucuresti,
          Romania, Universitatea Nationala de Stiinta si Tehnologie POLITEHNICA
          București, Romania, Universitat Autonoma de Barcelona, Espana,
          Universidade do Porto, República Portuguesa, Uzhgorodskyi Nacionalnyi
          Universitet, Ukraina.
          <br />
        </p>
      </div>

      <p
        style={{ lineHeight: "1.6", fontSize: "1.2em", color: "currentColor" }}
      >
        {" "}
        {/* Adăugat aici */}
        <br /> This project was made by:
      </p>

      <ul style={{ listStyle: "none", padding: 0, color: "currentColor" }}>
        {" "}
        {/* Adăugat aici */}
        {emails.map((item, index) => (
          <li
            key={index}
            style={{
              padding: "10px 0",
              borderBottom: "1px solid currentColor",
              fontSize: "1.2em",
              color: "currentColor", // Adăugat aici
            }}
          >
            <strong style={{ color: "currentColor" }}>{item.name}:</strong>{" "}
            {item.email}
          </li>
        ))}
      </ul>

      <p
        style={{
          lineHeight: "1.6",
          fontSize: "1.2em",
          color: "currentColor",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        Project Coordinators:
      </p>
      <p
        style={{ lineHeight: "1.6", fontSize: "1.1em", color: "currentColor" }}
      >
        Mihai Caramihai: dan.caramihai@upb.ro
      </p>
      <p
        style={{ lineHeight: "1.6", fontSize: "1.1em", color: "currentColor" }}
      >
        Daniel Chiș: daniel_ioan.chis@upb.ro
      </p>
    </div>
  );
};

export default Credentials;
