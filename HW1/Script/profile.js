function caricaSquadre(id) {
  fetch("carica_squadreuser.php?q=" + id)
    .then(onResponseSquadre)
    .then(onJSONSquadre);
}

function onResponseSquadre(response) {
  console.log(response);
  return response.json();
}

function onCommentoSquadra(commenti) {
  console.log(commenti);
  const containerCommenti = document.querySelectorAll(".container_commenti");
  const array_com = Array.from(containerCommenti);

  for (var i = 0; i < array_com.length; i++) {
    for (var j = 0; j < commenti.length; j++) {
      var elemento = commenti[j];

      if (array_com[i].dataset.commentoSquadra === elemento.nome_squadra) {
        const divCommento = document.createElement("div");
        divCommento.classList.add("commento");

        const commento = document.createElement("p");
        commento.textContent = elemento.nome_utente + ":" + elemento.commento;

        divCommento.appendChild(commento);

        array_com[i].appendChild(divCommento);
      }
    }
  }
}

function onJSONStampaRisultato(json) {
  container = document.querySelector(".container");

  divs = container.children;
  if (json.elimina !== false) {
    for (var i = 0; i < divs.length; i++) {
      if (
        divs[i].dataset.nomeSquadra === json.squadra ||
        divs[i].innerText === json.squadra
      ) {
        divs[i].innerHTML = "";
      }
    }
  } else {
    window.alert("errore nell'eliminazione di:" + json.squadra.innerHtml);
  }
}

function onLikeSquadra(json) {
  console.log(json);
  var divsLike = document.querySelectorAll(".card-like");
  var divsArray = Array.from(divsLike); // Converti il NodeList in un array

  for (var i = 0; i < divsArray.length; i++) {
    var div = divsArray[i];

    if (div.dataset.likeSquadra === json.nome_squadra) {
      span_like = div.querySelector("span");
      span_like.innerText = "numero di like:" + json.count;
      return;
    }
  }
}

function eliminaSquadra(event) {
  divSquadra = event.currentTarget.parentNode;
  nomeSquadra = divSquadra.dataset.nomeSquadra;
  fetch("eliminaSquad.php?q=" + nomeSquadra)
    .then(onResponseSquadre)
    .then(onJSONStampaRisultato);
}

function onJSONSquadre(jsonData) {
  console.log(jsonData);
  const container = contenitore;

  // Itera su ogni oggetto nel JSON
  jsonData.forEach(function (team) {
    const teamName = team.nome_squadra;
    const pokemon = team.pokemon;

    // Crea un elemento <div> per la squadra
    const teamDiv = document.createElement("div");
    teamDiv.classList.add("team-container");

    // Crea un elemento <span> per il nome della squadra
    const divTitolo = document.createElement("div");
    const teamNameH2 = document.createElement("h2");
    teamDiv.dataset.nomeSquadra = teamName;
    teamNameH2.textContent = teamName;
    divTitolo.appendChild(teamNameH2);

    container.appendChild(divTitolo); // Aggiungi il nome della squadra al div

    // Itera su ogni coppia di chiave-valore nell'oggetto "pokemon"
    for (const [pokemonIndex, pokemonData] of Object.entries(pokemon)) {
      const divPokemon = document.createElement("div");
      divPokemon.classList.add("card-pokemon");
      const pokemonName = pokemonData[0];
      const pokemonImageUrl = pokemonData[1];
      // Crea un elemento <img> per l'immagine del Pokémon
      const pokemonImage = document.createElement("img");
      pokemonImage.src = pokemonImageUrl;

      divPokemon.appendChild(pokemonImage); // Aggiungi l'immagine del Pokémon al div

      // Crea un elemento <span> per il nome del Pokémon
      const pokemonNameSpan = document.createElement("span");
      pokemonNameSpan.textContent = pokemonName;

      divPokemon.appendChild(pokemonNameSpan); // Aggiungi il nome del Pokémon al div

      teamDiv.appendChild(divPokemon);
    }

    like_div = document.createElement("div");
    like_div.classList.add("card-like");
    contieniLike = document.createElement("span");
    like_div.dataset.likeSquadra = teamName;

    var contieni_commenti = document.createElement("div");
    contieni_commenti.classList.add("container_commenti");
    contieni_commenti.dataset.commentoSquadra = teamName;

    like_div.appendChild(contieniLike);

    const pulsanteElimina = document.createElement("input");
    pulsanteElimina.type = "submit";
    pulsanteElimina.value = "Elimina";
    pulsanteElimina.addEventListener("click", eliminaSquadra);

    teamDiv.appendChild(pulsanteElimina);

    // Aggiungi il div della squadra al contenitore
    teamDiv.appendChild(like_div);
    container.appendChild(teamDiv);
    container.appendChild(contieni_commenti);
    fetch("getLikeSquadra.php?q=" + teamName)
      .then(onResponseSquadre)
      .then(onLikeSquadra);

    fetch("getCommentiSquadra.php?q=" + teamName)
      .then(onResponseSquadre)
      .then(onCommentoSquadra);
  });
}

contenitore = document.querySelector(".container");
id = contenitore.dataset.utente;

caricaSquadre(id);
