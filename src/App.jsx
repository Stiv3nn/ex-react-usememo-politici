// 📌 Milestone 1: Recuperare e visualizzare i dati
// Effettua una chiamata API a
// https://boolean-spec-frontend.vercel.app/freetestapi/politicians

// Salva la risposta in uno stato React (useState).

// Mostra i politici in una lista di card, visualizzando almeno le seguenti proprietà:

// Nome (name)
// Immagine (image)
// Posizione (position)
// Breve biografia (biography)

// Obiettivo: Caricare e mostrare i politici in un’interfaccia chiara e leggibile.

// --------------------------------------------------------------------------------------------

// 1--> QUANDO ABBIAMO UNA CHIAMATA API CHE CI RITORNA UN DATO CHE CI SERVE IN REACT AVREMMO BISOGNO DI USESTATE E USEEFFECT (MILESTONE 1)
import { useState, useEffect } from "react";

function App() {

  // 2--> CREAZIONE DI UNO STATO PER UNA LISTA DI POLITICI (MILESTONE 1)
  const [politicians, setPoliticians] = useState([]);

  // 3--> useEffect PER IL NOSTRO FETCH (MILESTONE 1)
  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error));
    // DIPENDENZA VUOTA IN MODO CHE SI AVVIA SOLTANTO ALLA FINE DEL COMPONENTE
  }, []);

  // 4--> UN CONSOLE A politicians (MILESTONE 1)
  console.log(politicians);

  return (
    // 5--> UN RETURN DI UN DIV CON ALL'INTERNO UN H1 CON UN TITOLO (MILESTONE 1)
    <div>
      <h1>Lista Politici</h1>
      <input type="text" />
      {/* 6--> ANDIAMO A MOSTRARE I POLITICI E I LORO DATI SOTTO FORMA DI CARD (MILESTONE 1) */}
      <div className="politicians-list">
        {politicians.map(politicians => {
          <div className="card" key={politicians.id}>
            <img src={politicians.image} alt={politicians.name} />
            <h2>{politicians.name}</h2>
            <p><strong>Posizione:</strong>{politicians.position}</p>
            <p>{politicians.biography}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default App
