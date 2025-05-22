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

// MILESTONE 2: Implementare la ricerca ottimizzata
// 1--> Aggiungi un campo di ricerca (input type=text) sopra la lista dei politici
// 2--> Permetti all'utente di filtrare i risultati in base a nome o biografia 
// SUGGERIMENTO: Creare un array derivato filtrato, che viene aggiornato solo quando cambia la lista di politici o il valore della ricerca
// 3--> non usare useEffect per aggiornare l'array filtrato 

// Obiettivo: migliorare le prestazioni evitando ricalcoli inutili quando il valore della ricerca non cambia

// MILESTONE 2: Ottimizzare il rendering delle card con Reactmemo
// 1--> Attualmente, ogni volta che l'utente digita nella barra di ricerca, tutte le card vengono ri-renderizzate, anche quelle che non sono cambiate
// 2--> Usa Reactmemo() per evitare il ri-render delle card quando le loro props non cambiano 
// 3--> Aggiungi un console.log() dentro il componente Card per verificare che venga renderizzato solo quando necessario

// --------------------------------------------------------------------------------------------

// 1--> QUANDO ABBIAMO UNA CHIAMATA API CHE CI RITORNA UN DATO CHE CI SERVE IN REACT AVREMMO BISOGNO DI USESTATE E USEEFFECT (MILESTONE 1)
import React, { useState, useEffect, useMemo } from "react";

// 11-->CREO LA FUNZIONE DELLA CARD E PASSO DESTRUTTURANDO LE PROPS (MILESOTNE 3)
function PoliticiansCard(name, image, position, biography) {
  console.log("Card");
  return (
    <div className="card" >
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p><strong>Posizione:</strong>{position}</p>
      <p>{biography}</p>
    </div>
  );
}

// 12--> UTILIZZO REACTMMEMO PER MIGLIORARE LE PRESTAZIONI DELLA CARD DI SOPRA (MILESTONE 3)
const MemoisedPoliticiansCard = React.memo(PoliticiansCard);

function App() {

  // 2--> CREAZIONE DI UNO STATO PER UNA LISTA DI POLITICI (MILESTONE 1)
  const [politicians, setPoliticians] = useState([]);
  // 7--> CREAZIONE DI UNO NUOVO STATO PER LA BARRA DI RICERCA, CHE INIZIALMENTE E' UNA STRINGA VUOTA "" (MILESTONE 2)
  const [search, setSearch] = useState("");

  // 3--> useEffect PER IL NOSTRO FETCH (MILESTONE 1)
  useEffect(() => {
    fetch("https://boolean-spec-frontend.vercel.app/freetestapi/politicians")
      .then(res => res.json())
      .then(data => setPoliticians(data))
      .catch(error => console.error(error));
    // DIPENDENZA VUOTA IN MODO CHE SI AVVIA SOLTANTO ALLA FINE DEL COMPONENTE
  }, []);

  // 4--> UN CONSOLE A politicians (MILESTONE 1)
  // console.log(politicians);

  // 9--> CREAZIONE DI UN ARRAY DERIVATO FILTRATO, QUANDO VADO A CERCARE CON UN NOME O DESCRIZIONE UN PERSONAGGIO, CIO' APPARIRA' (MILESTONE 2)
  const filteredPoliticians = useMemo(() => {
    return politicians.filter(politician => {
      const isInName = politician.name.toLowerCase().includes(search.toLowerCase());
      const isInBiography = politician.biography.toLowerCase().includes(search.toLowerCase());
      // IL RETURN CI DEVE RITORNARE NAME OPPURE BIOGRAPHY
      return isInName || isInBiography;
    })
  }, [politicians, search]);

  return (
    // 5--> UN RETURN DI UN DIV CON ALL'INTERNO UN H1 CON UN TITOLO (MILESTONE 1)
    <div>
      <h1>Lista Politici</h1>
      {/* 8--> AGGIUNGERE UN INPUT DI TIPO TEXT SOPRA LA LISTA DEI POLITICI (MILESTONE 2) */}
      <input
        type="text"
        placeholder='Cerca per nome o pr biografia'
        // value={search} perchè stiamo facendo una ricerca
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {/* 6--> ANDIAMO A MOSTRARE I POLITICI E I LORO DATI SOTTO FORMA DI CARD (MILESTONE 1) */}
      {/* <div className="politicians-list">
        {filteredPoliticians.map(politicians => {
          <div className="card" key={politicians.id}>
            <img src={politicians.image} alt={politicians.name} />
            <h2>{politicians.name}</h2>
            <p><strong>Posizione:</strong>{politicians.position}</p>
            <p>{politicians.biography}</p>
          </div>
        })}
      </div> */}
      {/* 10--> STO ESTRAENDO LA LOGICA DI QUESTA CARD ALL'INTERNO DI UN COMPONENTE POLITICIANS CARD (MILESTONE 3) */}
      <div className="politicians-list">
        {filteredPoliticians.map(politicians => {
          // <PoliticiansCard key={politicians.id}  {...politicians} />
          // 13--> PASSO LA VERSIONE MEMOIZEDPOLITICIANSCARD (MILESTONE 3)
          <MemoisedPoliticiansCard key={politicians.id}  {...politicians} />
        })}
      </div>
    </div>
  )
}

export default App
