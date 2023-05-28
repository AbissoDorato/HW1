let id_scelte = {};
let id_utente;

async function createCards(ini, fin) {
  container = document.querySelector(".container-pokemon");
  container.innerHTML = "";
  loader = document.getElementById("load");
  loader.classList.remove("hidden");

  for (var i = ini; i < fin; i++) {
    await fetch("fetch_data.php?q=" + i)
      .then(onResponseCreate)
      .then(OnJsonCreate);
    //fetch("http://pokeapi.co/api/v2/pokemon/"+encodeURIComponent(i));
  }
  loader.classList.add("hidden");
  container.classList.remove("hidden");

  //fetch("http://pokeapi.co/api/v2/pokemon/"+encodeURIComponent(i));
}

// Utilizzo della funzione createCards

function onResponseCreate(response) {
  return response.json();
}

function rimuoviDaScelte(event) {
  div = event.target.parentNode;
  id = div.id;

  delete squadra_container.removeChild(div);
  delete id_scelte[id];
  console.log(id_scelte);
}

function salvaID(event) {
  var check_box = event.currentTarget;
  img = check_box.parentNode.querySelector("img").src;
  box_squadra = squadra_container;
  var id = check_box.parentElement.dataset.id;
  pokemon = check_box.parentElement.querySelector("span").innerHTML;

  //creo un div con le stesse informazioni di quello selezionato e poi lo appendo alla squadra
  div_ap = document.createElement("div");
  div_ap.classList.add("card-pokemon");
  div_ap.id = id;
  img_ap = document.createElement("img");
  img_ap.src = img;
  div_ap.appendChild(img_ap);
  pokemon_ap = document.createElement("span");
  pokemon_ap.innerText = pokemon;
  div_ap.appendChild(pokemon_ap);
  bottone_elimina = document.createElement("button");
  bottone_elimina.innerText = "rimuovi";
  bottone_elimina.addEventListener("click", rimuoviDaScelte);
  div_ap.appendChild(bottone_elimina);

  //decido che non ci possono essere due pokemon uguali
  if (Object.keys(id_scelte).length >= 6 || id_scelte.hasOwnProperty(id)) {
    window.alert(
      "hai finito gli slot/hai messo un pokemon già presente in squadra, deseleziona se vuoi cambiare squadra"
    );
    return;
  } else {
    id_scelte[id] = Array(pokemon, img);
    box_squadra.appendChild(div_ap);
  }

  console.log(id_scelte);
}

function onclickImage(event) {
  divPadre = event.target.parentNode;
  arrimg = divPadre.querySelectorAll("img");
  titolo = divPadre.querySelector("span");
  titolo_mod = document.createElement("h2");
  titolo_mod.innerText = titolo.innerText;
  modal_view.appendChild(titolo_mod);

  infotext = document.createElement("p");
  infotext.innerHTML = divPadre.querySelector(".informazioni").innerHTML;

  divInfo.appendChild(infotext);
  divImage = document.createElement("div");
  divImage.classList.add("contieniModal");

  for (let i = 0; i < arrimg.length; i++) {
    const imgP = document.createElement("img");
    const imageUrl = arrimg[i].src;
    imgP.src = imageUrl;
    divImage.appendChild(imgP);
  }
  modal_view.appendChild(divImage);

  modal_view.style.top = window.pageYOffset + "px";

  modal_view.appendChild(infotext);

  document.body.classList.add("no-scroll");
  modal_view.classList.remove("hidden");
}

function validaInput(event) {
  event.preventDefault();
  container_pok = document.querySelector(".container-pokemon");
  nome = event.currentTarget.querySelector("input").value;
  if (nome.length === 0 || Object.keys(id_scelte).length < 6) {
    window.alert("Completa la squadra / assegna un nome alla squadra");
  } else {
    container_pok.innerHTML = "";
    squadra_container.innerHTML = "";
    salvaSquadra(nome);
    form.reset();
  }
}

function OnJsonCreate(json) {
  //pokimg.src = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"+i+".png";
  console.log(json);
  squadra = document.querySelector("#squadra");
  dati_pokemon = json;
  id_p = document.createElement("p");
  id_p.innerText = "#" + dati_pokemon.id;
  peso = dati_pokemon.weight + " lb";
  esperienza_base = "esperienza base:" + dati_pokemon.base_experience;
  array_abilita = dati_pokemon.abilities;
  var ab_string = "abilità:";
  for (let i = 0; i < array_abilita.length; i++) {
    ab_string = ab_string + "," + array_abilita[i].ability.name;
  }

  //informazioni da passare alla modale
  divInfo = document.createElement("div");
  divInfo.classList.add("informazioni");
  divInfo.classList.add("hidden");
  par = document.createElement("p");
  par.innerText =
    esperienza_base + " xp" + "\n" + "peso:" + peso + "\n" + ab_string;
  divInfo.appendChild(par);

  let card = document.createElement("div");
  card.dataset.id = dati_pokemon.id;

  card.classList.add("card-pokemon");
  card.innerHTML = "";
  pokimg = document.createElement("img");
  pokimg.addEventListener("click", onclickImage);
  pokimg.src = dati_pokemon.sprites.front_default;

  pokShiny = document.createElement("img");
  pokShiny.addEventListener("click", onclickImage);
  pokShiny.src = dati_pokemon.sprites.front_shiny;
  pokShiny.classList.add("hidden");

  let name = document.createElement("span");
  name.innerText = dati_pokemon.name;

  let button = document.createElement("button");
  button.innerText = "aggiungi";
  button.addEventListener("click", salvaID);

  card.appendChild(divInfo);
  card.appendChild(pokimg);
  card.appendChild(pokShiny);
  card.appendChild(id_p);
  card.appendChild(name);
  card.appendChild(button);
  if (cercaPokemon.value !== "") {
    container.innerHTML = "";
    container.appendChild(card);
    cercaPokemon.value = "";
    return;
  } else {
    container.appendChild(card);
  }
}

function infoUtente() {
  fetch("get_userInfo.php").then(onResponseCreate).then(onUserJson);
}

//funzione non utilizzata
function onUserJson(json) {
  console.log(json);
  const card = document.createElement("div");
  id_utente = json.id;

  const present = document.querySelector(".presentazione");
  utente = json;
  var nome_utente = document.createElement("h2");
  nome_utente.innerText = "Benvenuto " + json.utente + "!";

  card.appendChild(nome_utente);
  //present.appendChild(card);
}

function salvaSquadra(squadra) {
  formData = new FormData();
  scelteJSON = JSON.stringify(id_scelte);

  formData.append("id", id_utente);
  formData.append("nome_squadra", squadra);
  formData.append("pokemon", scelteJSON);
  fetch("insert_squadra.php", { method: "post", body: formData }).then(
    onResponseCreate
  );
  id_scelte = {};
}

infoUtente();

function caricaPokemon(event) {
  scelta = event.currentTarget.value.toLowerCase();
  container = document.querySelector(".container-pokemon");

  container.innerHTML = "";
  container.classList.add("hidden");

  switch (scelta) {
    case "johto":
      createCards(152, 251); //152-251
      break;
    case "kanto":
      createCards(1, 151); //1-150
      break;
    case "unima":
      createCards(494, 646); //494-646
      break;
    case "hoenn":
      createCards(252, 386); //252-386
      break;
    case "sinnoh":
      createCards(387, 493); //387-493
      break;
    default:
      createCards(1, 151);
      break;
  }
}

function ricercaSingola(event) {
  container = document.querySelector(".container-pokemon");
  valore = event.currentTarget.value;
  container.innerHTML = "";
  if (valore === "") {
    return;
  }

  console.log(valore);
  fetch("fetch_data.php?q=" + valore)
    .then(onResponseCreate)
    .then(OnJsonCreate);
}

function ricercaPokemon(event) {
  search_div = document.querySelector(".search");
  search_bar = document.createElement("input");
  search_bar.type = "text";
  search_bar.id = "cercaPokemon";
  search_bar.placeholder = "Cerca Pokemon";
  search_bar.addEventListener("click", ricercaSingola);
  search_div.appendChild(search_bar);
  regione.removeEventListener("change", ricercaPokemon);
}

function onModalClick() {
  document.body.classList.remove("no-scroll");
  modal_view.classList.add("hidden");
  modal_view.innerHTML = "";
}

regione = document.querySelector("#regione");
regione.addEventListener("change", caricaPokemon);
regione.addEventListener("change", ricercaPokemon);

form = document.forms["form_poke"];
form.addEventListener("submit", validaInput);

modal_view.addEventListener("click", onModalClick);
