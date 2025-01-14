import React from "react";
import "../styles/Credentials.css";

const Credentials = () => {
  const emails = [
    { name: "Ion Andrei-Sorin", email: "andrei_sorin.ion@stud.acs.upb.ro" },
    { name: "Luntraru Maria-Alexandra", email: "maria.luntraru@stud.acs.upb.ro" },
    { name: "Popanica-Răboj Tudor", email: "tudor.popanica@stud.acs.upb.ro" },
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

      <div style={{ color: "currentColor" }}> {/* Adăugat aici */}
        <p style={{ lineHeight: "1.6", fontSize: "1em", color: "currentColor" }}> {/* Adăugat aici */}
          This project is developed as part of the initiative: <br />
          <br />
          <strong style={{ color: "currentColor" }}> {/* Adăugat aici */}
            1. "Gender, Digitalization, Green: Ensuring a Sustainable Future for all in Europe"
          </strong> <br />
          Ref. Project: 2023-1-RO01- KA220-HED-000154433,
          Partnership: Universitatea de Stiinte Agricole si Medicina Veterinara, Bucuresti, Romania, Universitatea Nationala de Stiinta si Tehnologie POLITEHNICA București, Romania, Universitat Autonoma de Barcelona, Espana, Universidade do Porto, República Portuguesa, Uzhgorodskyi Nacionalnyi Universitet, Ukraina.

          <br /> <br />
          <strong style={{ color: "currentColor" }}> {/* Adăugat aici */}
            2. "Fostering the Transversal Digital Competences in Higher Education"
          </strong> <br />
          Ref. Project: 2022-1-ES01-KA220-HED-000089861, Partnership: Universidad de Malaga, Espana, Universitatea Nationala de Stiinta si Tehnologie POLITEHNICA București, Romania, Univerza na Primorskem Universita del Litorale, Primorskem. Slovenia, Šiauliai State University of Applied Sciences, Šiauliai, Lituania, UC Leuven-Limburg, Belgique
        </p>
      </div>

      <p style={{ lineHeight: "1.6", fontSize: "1.2em", color: "currentColor" }}> {/* Adăugat aici */}
        <br /> This project was made by:
      </p>

      <ul style={{ listStyle: "none", padding: 0, color: "currentColor" }}> {/* Adăugat aici */}
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
            <strong style={{ color: "currentColor" }}>{item.name}:</strong> {item.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Credentials;