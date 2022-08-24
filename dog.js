
document.addEventListener("DOMContentLoaded", (event) => {
  let dogImgGauche = document.getElementById("dogImgGauche");
  let dogNomGauche = document.getElementById("dogNomGauche");
  let btnGauche = document.getElementById("btnGauche");
  let dogDuVersus = document.getElementById("dogDuVersus");

  //partie score
  let compteurDog = 0;
  let compteurCat = 0;
  let scoreDog = document.getElementById("scoreDog");
  let scoreCat = document.getElementById("scoreCat");
  let resultat = document.getElementById("resultat");

 
  var soundCat = new Howl({
    src: ["chat.mp3"],
  });
  var soundDog = new Howl({
    src: ["dog.mp3"],
  });

  function getRandomInt(max) {
    // fonction random bien pratique
    return Math.floor(Math.random() * max);
  }

  dogGauche(); // lance les functions avec les fetch
  catDroite();

  btnGauche.addEventListener("click", () => {
    compteurDog++;
    if (compteurDog >= 5) {
      resultat.innerHTML = "CATS WINS !!!!!";
      gif.src = `${tabCatGif[getRandomInt(50)]}`;
      gif.style.width = "700px";
      gif.style.height = "500px";

      scoreDog.innerHTML = "LOOOOOOSER";
      dogDuVersus.innerHTML = "";
      catDuVersus.innerHTML = "";
    } else {
      
      setTimeout(dogGauche, 2000); // refresh quand on clique sur eliminer
     
      soundDog.play();
      scoreDog.innerHTML = compteurDog + " Dog éliminés";
    }
  });

  function dogGauche() {
    //function qui lance la recuperation du chien de gauche

    fetch("https://dog.ceo/api/breeds/list/all")
      .then((reponse) => reponse.json())
      .then((breed) => {
        let messageObject = breed.message; // creer une variable pour recuperer l'objet message
        const breedTab = Object.keys(messageObject); // transforme mon objet message en tableau
        let dogBreed = breedTab[getRandomInt(50)]; // randomise le nom que j'aurais
        console.log(dogBreed);
        dogNomGauche.innerHTML = "Ma race : " + dogBreed; // affiche le nom

        fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`) // utilise le nom pour trouver l'image
          .then((reponse) => reponse.json())
          .then((dog) => {
            dogImgGauche.src = dog.message; // push la source dans l'image depuis l'objet
          });
      });
  }
  // la partie des chats

  let catImgDroite = document.getElementById("catImgDroite");
  let catNomDroite = document.getElementById("catNomDroite");
  let btnDroite = document.getElementById("btnDroite");
  let catDuVersus = document.getElementById("catDuVersus");

  btnDroite.addEventListener("click", () => {
    compteurCat++;
    if (compteurCat >= 5) {
      resultat.innerHTML = "Dogs WINS !!!!!";
      gif.src = `${tabDogGif[getRandomInt(50)]}`;
      gif.style.width = "700px";
      gif.style.height = "500px";

      scoreCat.innerHTML = "LOOOOOOSER";
      dogDuVersus.innerHTML = "";
      catDuVersus.innerHTML = "";
    } else {
      // monTime = setTimeout(catDroite, 2000); // refresh quand on clique sur eliminer
      setTimeout(catDroite, 2000);
      scoreCat.innerHTML = compteurCat + " Cat éliminés";
      soundCat.play();
    }
  });

  function catDroite() {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((reponse) => reponse.json())
      .then((picture) => {
        cat = {
          // on aurait pu faire un tableau mais comme j'avais deja l'objet du projet pile ou face
          id: "",
          name: "",
        };
        let catData = picture[getRandomInt(60)]; // fait le random sur le tableau de la data full
        cat.id = catData.id; // cat.id est l'id dans l'objet cat. catData est ma data random et je vais a l'interieur dans le .id
        cat.name = catData.name; // ca me permet d'entrer le l'id de la data dans l'id de mon cat

        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`)
          .then((reponse) => reponse.json())
          .then((photo) => {
            catImgDroite.src = photo[0].url;

            catNomDroite.innerHTML = "Ma race : " + cat.name;
          });
      });
  }
  let tabDogGif = [];
  let tabCatGif = [];
  let gif = document.getElementById("gif");

  fetch(
    "https://tenor.googleapis.com/v2/search?key=AIzaSyAVpVVTmWXqZnBvf1vFJbxh2Wi3Q4SLThg&q=cat&random=true&limit=50"
  ) /// API
    .then((reponse) => reponse.json()) // double then que j'ai pas bien saissi
    .then((picture) => {
      for (let i = 0; i < 50; i++) {
        // boucle pour push dans un tableau et cree le random tabCatGif
        tabCatGif.push(picture.results[i].media_formats.gif.url); // recuperer le gif en url
      }
    });

  fetch(
    "https://tenor.googleapis.com/v2/search?key=AIzaSyAVpVVTmWXqZnBvf1vFJbxh2Wi3Q4SLThg&q=dog&random=true&limit=50"
  ) /// API
    .then((reponse) => reponse.json())
    .then((picture) => {
      for (let i = 0; i < 50; i++) {
        // boucle pour push dans un tableau et cree le random tabDoggif
        tabDogGif.push(picture.results[i].media_formats.gif.url); // recuperer le gif en url
      }
    });
});
