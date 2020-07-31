import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import "./App.css";
import roulette from "./Roulette.png";
import center from "./Center.png";
import arrow from "./Arrow.png";
import logo from "./logo.png";

const Modal = ({ result, status, acceptAction }) => {
  if (status) {
    return ReactDOM.createPortal(
      <section className="modal">
        <div className="msg">
          <h1>Tu actividad es:</h1>
          <p>{result}</p>
          <button onClick={() => acceptAction(false)}>Aceptar</button>
        </div>
      </section>,
      document.getElementById("modal")
    );
  } else {
    return <> </>;
  }
};

const Roulette = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonMsg, setButtonMsg] = useState("Girar Ruleta");
  const [name, setName] = useState("");
  const [startingPosition, setStartingPosition] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isRotating, setRotating] = useState(false);
  const [choice, setChoice] = useState(undefined);
  const [result, setResult] = useState("");

  const formRef = useRef(null);

  const names = [
    "Jeronimo Castro",
    "Wilson Alexander Moreno",
    "Jhossept Kevin Garay",
    "Mauricio Uribe",
    "Hector Camilo Bermudez",
    "Manuel Jose Melgarejo",
    "Diego Alejandro Mejia",
    "Maria Clara Londoño",
    "Lizeth Carolina Sanchez",
    "Fernando Serna",
    "Gabriel Jaime Gomez",
    "Sergio Armando Orjuela",
    "Walter Andres Casas",
    "Isabel Cristina Muñoz",
    "Mateo Parra",
    "Jose David Bedoya",
    "Jonathan Davila",
    "Alejandro Restrepo",
    "Laura Cristina Martinez",
    "Diana Carolina Alvarez",
    "Jose David Romero",
    "Daniel Felipe Garcia",
    "Luisa Fernanda Castaño",
    "Juan Camilo Calle",
    "Katherine Castaño",
    "Irene Margarita Ortiz",
    "Leidy Carolina Gomez",
    "Juan Camilo Acosta",
    "Alejandro Areiza",
    "Santiago Mondragon",
    "Miguel Angel Mejia",
    "Karen Durley Chavarro",
    "Sergio Alexander Gomez Peña",
  ];

  useEffect(() => {
    const turns = Math.floor(2 + Math.random() * 6) * 360;
    if (isRotating && choice !== undefined) {
      setRotation(turns + choice);
      setResult("");

      setTimeout(() => {
        const data = new FormData(formRef.current);
        console.log(formRef.current);

        fetch(
          "https://docs.google.com/forms/u/1/d/e/1FAIpQLScmaM0kt_VZn7R4roseX2OZ3vkhSFVSUX4EdVf45eEvOsNyng/formResponse",
          {
            method: "POST",
            body: data,
          }
        );
      }, 2000);

      setTimeout(() => {
        setModalOpen(true);
        setButtonMsg("Volver a Girar");
        setStartingPosition(choice);
        setRotating(false);
      }, 6200);
    }
  }, [isRotating]);

  useEffect(() => {
    setResult("");

    if (choice < 36) {
      setResult("Contar una anecdota graciosa");
    } else if (choice >= 36 && choice <= 72) {
      setResult("Recomendar una Serie o Pelicula");
    } else if (choice > 72 && choice < 108) {
      setResult("Muéstranos tu Álbum de Fotos Familiar");
    } else if (choice >= 108 && choice <= 144) {
      setResult("Queremos que nos Muestres tu Lugar de Trabajo, tu familia.");
    } else if (choice >= 144 && choice <= 180) {
      setResult(
        "Estar en la videollamada con una buena actitud y tu bebida favorita."
      );
    } else if (choice >= 180 && choice <= 216) {
      setResult("Proponer un Juego (No Virtual)");
    } else if (choice > 216 && choice < 252) {
      setResult("Proponer un Juego Virtual");
    } else if (choice >= 252 && choice <= 288) {
      setResult("Pregunta lo que Quieras a tus Compañeros");
    } else if (choice > 288 && choice < 324) {
      setResult("Escoge la Opción que tu Quieras");
    } else {
      setResult(
        "Estar en la videollamada con una buena actitud y tu bebida favorita."
      );
    }

    console.log(choice);
  }, [choice, result]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setChoice(Math.floor(Math.random() * 361));
    setRotating(true);
  };

  const Rotate = keyframes`
    from {
      transform: ${`rotate(${startingPosition}deg);`}
    }
    to {
      transform: ${`rotate(${rotation}deg);`}
    }
  `;

  const MainRoulette = styled.img`
    && {
      transform: ${`rotate(${startingPosition}deg)`};

      &.rotate {
        animation: ${Rotate} 5s forwards 1 ease-in-out;
      }
    }
  `;

  return (
    <section className="roulette-container">
      <Modal
        result={result}
        status={modalOpen}
        acceptAction={(value) => setModalOpen(value)}
      />
      <form ref={formRef} className="roulette" onSubmit={handleSubmit}>
        <label htmlFor="text">Nombre:</label>
        <select
          id="name"
          name="entry.315403504"
          onChange={(e) => console.log(e.target.value)}
          required
        >
          <option value="" selected disabled>
            Selecciona tu nombre...
          </option>
          {names.map((name, index) => (
            <option key={index} value={name}>
              {index + 1}. {name.toLowerCase()}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="entry.522641761"
          value={result}
          style={{ position: "fixed", opacity: 0 }}
        />

        <MainRoulette
          src={roulette}
          alt="roulete"
          className={isRotating ? "main rotate" : "main"}
        />

        <div className="images-container">
          <img src={center} alt="center" className="center" />
          <img src={arrow} alt="arrow" className="arrow" />

          {!isRotating && (
            <div className="button-container">
              <button type="submit">{buttonMsg}</button>
            </div>
          )}
        </div>
      </form>

      <p className="reminder">
        <b>10 Pearls HR</b> te espera para compartir un momento diferente con
        todos tus compañeros.
      </p>
    </section>
  );
};

const App = () => {
  return (
    <section className="app">
      <section className="information">
        <h1 className="title">¡Hola!</h1>
        <p className="description">
          <b>10 Pearls</b> te invita a que asistas a la proxima integración este
          <b> último viernes del mes</b>, un tiempo de amistad, compañerismo,
          risas y especialmente, nada de trabajo. La idea es que compartamos
          virtualmente un tiempo diferente, acompañados de tu bebida favorita y
          muchos temas de conversación.
        </p>
        <p className="name">¡Viernes de Cerveza!</p>
        <p className="disclaimer">
          <b>
            Tenemos una pequeña tarea, la cual es totalmente opcional, pero nos
            gustaría que lo hicieras.
          </b>
          <span>
            Para ese día deberás hacer la tarea que sea escogida al azar.
          </span>
        </p>
        <img src={logo} alt="logo" />
      </section>

      <Roulette />
    </section>
  );
};

export default App;
