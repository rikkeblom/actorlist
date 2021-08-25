const doc = "/actors.json";

fetch(doc)
  .then((res) => res.json())
  .then((data) => handleActors(data));

function handleActors(data) {
  console.log(data);
  data.forEach(showActor);
}

function showActor(actor) {
  // console.log("ACTORS");
  // grab the template
  const template = document.querySelector(".actor-card-template").content;
  // clone the template
  const copy = template.cloneNode(true);
  // change the content
  copy.querySelector(".actor-name").textContent = actor.fullname;
  if (actor.movie == "Fight Club") {
    copy.querySelector(".movie-icon").src = "/icons/soap.svg";
    copy.querySelector(".movie-icon").classList.add("fightclub");
  } else if (actor.movie == "Pulp Fiction") {
    copy.querySelector(".movie-icon").src = "/icons/gun.svg";
    copy.querySelector(".movie-icon").classList.add("pulpfiction");
  } else if (actor.movie == "Goodfellas") {
    copy.querySelector(".movie-icon").src = "/icons/tie.svg";
    copy.querySelector(".movie-icon").classList.add("goodfellas");
  } else if (actor.movie == "Inception") {
    copy.querySelector(".movie-icon").src = "/icons/pill.svg";
    copy.querySelector(".movie-icon").classList.add("inception");
  }
  //adding eventlistener
  copy.querySelector(".card-div").addEventListener("click", openPopup);
  // grab the parent
  const parent = document.querySelector(".actorlist");
  // apend
  parent.appendChild(copy);
}

function openPopup(info) {
  // console.log(clicked);
  console.log(info);
  console.log(info.path[0].firstElementChild.firstChild.textContent);

  // grab the template
  const template = document.querySelector(".popup-template");

  // change the content
  template.querySelector(".selected-actor").textContent = info.path[0].firstElementChild.firstChild.textContent;

  //find out which movie
  console.log(info.path[0].lastElementChild.classList[1]);
  if (info.path[0].lastElementChild.classList[1] == "goodfellas") {
    template.querySelector(".selected-movie-icon").src = "/icons/tie.svg";
    template.querySelector(".selected-movie").textContent = "Goodfellas";
  } else if (info.path[0].lastElementChild.classList[1] == "inception") {
    template.querySelector(".selected-movie-icon").src = "/icons/pill.svg";
    template.querySelector(".selected-movie").textContent = "Inception";
  } else if (info.path[0].lastElementChild.classList[1] == "fightclub") {
    template.querySelector(".selected-movie-icon").src = "/icons/soap.svg";
    template.querySelector(".selected-movie").textContent = "Fight Club";
  } else if (info.path[0].lastElementChild.classList[1] == "pulpfiction") {
    template.querySelector(".selected-movie-icon").src = "/icons/gun.svg";
    template.querySelector(".selected-movie").textContent = "Pulp Fiction";
  }

  //show the popup
  template.classList.remove("hidden");
  template.classList.remove("behind");
  template.classList.add("front");
  document.querySelector(".actorlist").classList.add("behind");
  document.querySelector(".actorlist").classList.remove("front");

  //add transparent middleground
  document.querySelector(".transparant").classList.remove("hidden");

  //add eventlisteners to close the popup
  document.querySelector(".transparant").addEventListener("click", closePopup);
  template.addEventListener("click", closePopup);
}

function closePopup() {
  // console.log("close!");
  // grab the template
  const template = document.querySelector(".popup-template");
  //hide the popup
  template.classList.add("hidden");
  template.classList.add("behind");
  template.classList.remove("front");
  document.querySelector(".actorlist").classList.remove("behind");
  document.querySelector(".actorlist").classList.add("front");

  //remove transparent middleground
  document.querySelector(".transparant").classList.add("hidden");
}
