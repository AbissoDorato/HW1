function caricaBacheca(user) {
  fetch("bacheca_load.php?q=" + user)
    .then(onResponseBacheca)
    .then(onJSONBacheca);
}

function onResponseBacheca(response) {
  return response.json();
}

function caricaLike(event) {
  valore = event.currentTarget.value;
  contieniSquadre = event.currentTarget.parentNode;
  formData = new FormData();
  formData.append("nome_squadra", contieniSquadre.dataset.likeSquadra);
  //formData.append("id_utente"); lid utente non mi serve lo prendo dalla session
  formData.append("valore", valore);
  fetch("caricalike.php", { method: "post", body: formData })
    .then(onResponseBacheca)
    .then(onLikeSquadra);
}

function onLikeSquadra(json) {
  console.log(json);
  var divsLike = document.querySelectorAll(".card-like");
  var divsArray = Array.from(divsLike); // Converti il NodeList in un array

  for (var i = 0; i < divsArray.length; i++) {
    var div = divsArray[i];

    if (div.dataset.likeSquadra === json.nome_squadra) {
      span_like = div.querySelector("span");
      span_like.innerText = json.count;
      return;
    }
  }
}
// il problema sta qui
function aggiornaCommenti(commenti) {
  console.log(commenti);
  const containerCommenti = document.querySelectorAll(".container_commenti");

  for (let i = 0; i < containerCommenti.length; i++) {
    const divCommento = containerCommenti[i];
    nomeSquadra = divCommento.dataset.commentoSquadra;
    if (commenti[nomeSquadra]) {
      divCommento.innerHTML = "";
      for (let j = 0; j < commenti[nomeSquadra].length; j++) {
        const commentoElement = document.createElement("p");
        commentoElement.textContent =
          commenti[nomeSquadra][j]["nome_utente"] +
          ": " +
          commenti[nomeSquadra][j]["commento"];

        divCommento.appendChild(commentoElement);
      }
      return;
    }
  }
}

function InviaCommento(event) {
  padre = event.currentTarget.parentNode;
  formData = new FormData();
  casella_invio = padre.querySelector("input");
  valore = casella_invio.value;
  squadra_commento = padre.dataset.commentiSquadra;
  formData.append("nome_squadra", squadra_commento);
  formData.append("commento", valore);
  fetch("aggiungiCommento.php", { method: "POST", body: formData })
    .then(onResponseBacheca)
    .then(aggiornaCommenti);
  casella_invio.value = "";
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

function onJSONBacheca(json) {
  console.log(json);
  var contieniSquadre = document.querySelector(".container");

  json.forEach(function (item) {
    var allenatore = item.nome_allenatore;
    var squadra = item.nome_squadra;

    var contieni_commenti = document.createElement("div");
    contieni_commenti.classList.add("container_commenti");

    //add event listener aggiunta
    var like = document.createElement("input");
    like.type = "button";
    like.value = "like";
    like.addEventListener("click", caricaLike);

    var header = document.createElement("h2");
    header.textContent = allenatore + ":" + squadra;

    var pokemonContainer = document.createElement("div");
    pokemonContainer.dataset.nomeSquadra = squadra;
    pokemonContainer.classList.add("team-container");

    for (var key in item.pokemon) {
      var pokemon = item.pokemon[key];
      var pokemonName = pokemon[0];
      var pokemonImage = pokemon[1];

      var pokemonCard = document.createElement("div");
      pokemonCard.classList.add("card-pokemon");

      var nameElement = document.createElement("p");
      nameElement.textContent = pokemonName;

      var imageElement = document.createElement("img");
      imageElement.src = pokemonImage;

      pokemonCard.appendChild(imageElement);
      pokemonCard.appendChild(nameElement);

      pokemonContainer.appendChild(pokemonCard);
    }
    like_div = document.createElement("div");
    like_div.classList.add("card-like");
    contieniLike = document.createElement("span");
    like_div.dataset.likeSquadra = item.nome_squadra;
    contieni_commenti.dataset.commentoSquadra = item.nome_squadra;

    like_div.appendChild(like);
    like_div.appendChild(contieniLike);

    contieniSquadre.appendChild(header);
    contieniSquadre.appendChild(pokemonContainer);
    contieniSquadre.appendChild(like_div);
    contieniSquadre.appendChild(contieni_commenti);

    fetch("getLikeSquadra.php?q=" + squadra)
      .then(onResponseBacheca)
      .then(onLikeSquadra);
    fetch("getCommentiSquadra.php?q=" + squadra)
      .then(onResponseBacheca)
      .then(onCommentoSquadra);

    divContieniInput = document.createElement("div");
    divContieniInput.dataset.commentiSquadra = squadra;
    //aggiungi una classe per gli input
    input_commenti = document.createElement("input");
    input_commenti.type = "text";
    input_commenti.placeholder = "aggiungi un commento";
    button_commenti = document.createElement("button");
    button_commenti.textContent = "aggiungi commento";
    button_commenti.addEventListener("click", InviaCommento);

    divContieniInput.appendChild(input_commenti);
    divContieniInput.appendChild(button_commenti);

    contieniSquadre.appendChild(divContieniInput);
  });
}

container = document.querySelector(".container");
id = container.dataset.utente;
caricaBacheca(id);
