
document.addEventListener("DOMContentLoaded", (event) => {                // permet de charger, bonne pratique
  let dogImgGauche = document.getElementById("dogImgGauche");              // selecteurs
  let dogNomGauche = document.getElementById("dogNomGauche");
  let btnGauche = document.getElementById("btnGauche");
  let dogDuVersus = document.getElementById("dogDuVersus");

  //partie score
  let compteurDog = 0;                                                    // compteurs deliminations
  let compteurCat = 0;
  let scoreDog = document.getElementById("scoreDog");                     // selecteurs pour resultat
  let scoreCat = document.getElementById("scoreCat");
  let resultat = document.getElementById("resultat");

 
  var soundCat = new Howl({                                               // utilisation de la librairie https://howlerjs.com/
    src: ["chat.mp3"],
  });                                                                      // permet de faire un son et de l'arreter une fois qu'il a fini
  var soundDog = new Howl({
    src: ["dog.mp3"],
  });

  function getRandomInt(max) {
    // fonction random bien pratique
    return Math.floor(Math.random() * max);
  }

  dogGauche(); // lance les functions avec les fetch
  catDroite();

  btnGauche.addEventListener("click", () => {                     // on elimine le dog donc on ajoute 1 au compteur dog
    compteurDog++;
    if (compteurDog >= 5) {
      resultat.innerHTML = "CATS WINS !!!!!";
      gif.src = `${tabCatGif[getRandomInt(50)]}`;                  // met un source random depuis l'api gif 
      gif.style.width = "700px";                                   // modifie la taille du gif 
      gif.style.height = "500px";

      scoreDog.innerHTML = "LOOOOOOSER";                      
      dogDuVersus.innerHTML = "";                                 // clean pour permettre d'avoir plus de place pour le gif
      catDuVersus.innerHTML = "";
    } else {
      
      setTimeout(dogGauche, 2000); // refresh quand on clique sur eliminer avec un setTimeout de 2s pour permettre le bruit
     
      soundDog.play();  // bruit du chien
      scoreDog.innerHTML = compteurDog + " Dog éliminés";  // affiche le nombre de chiens eliminés
    }
  });

  function dogGauche() {
    //function qui lance la recuperation du chien de gauche

    fetch("https://dog.ceo/api/breeds/list/all")        // va chercher dans l'api le nom de race du chien 
      .then((reponse) => reponse.json())
      .then((breed) => {
        let messageObject = breed.message; // creer une variable pour recuperer l'objet message
        const breedTab = Object.keys(messageObject); // transforme mon objet message en tableau pour avoir un tableau de nom de race de chien
        let dogBreed = breedTab[getRandomInt(50)]; // randomise le nom que j'aurais
        // console.log(dogBreed);
        dogNomGauche.innerHTML = "Race : " + dogBreed; // affiche le nom de race du chien

        fetch(`https://dog.ceo/api/breed/${dogBreed}/images/random`) // utilise le nom de race pour trouver l'image
          .then((reponse) => reponse.json())
          .then((dog) => {
            dogImgGauche.src = dog.message; // push la source dans l'image depuis l'objet
          });
      });
  }
  // la partie des chats meme procedé que pour la partie chien 

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
          // creation d'un objet cat qui va me permettre de recuperer l'id qui sera utile pour recupere l'image et le name pour afficher le name
          id: "",
          name: "",
        };
        let catData = picture[getRandomInt(60)]; // fait le random sur le tableau de la data full pour extraire un seul index du tableau
        cat.id = catData.id; // cat.id est l'id dans l'objet cat. catData est ma data random et je vais a l'interieur dans le .id
        cat.name = catData.name; // ca me permet d'entrer le l'id de la data dans l'id de mon cat

        fetch(`https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`)
          .then((reponse) => reponse.json())
          .then((photo) => {
            catImgDroite.src = photo[0].url;         // j'envoie l'url dans la source avec l'index 0 puisque de toute facon je recupere que un tableau

            catNomDroite.innerHTML = "Race : " + cat.name;   
          });
      });
  }
  let tabDogGif = [];
  let tabCatGif = [];
  let gif = document.getElementById("gif");

  fetch(
    "https://tenor.googleapis.com/v2/search?key=AIzaSyAVpVVTmWXqZnBvf1vFJbxh2Wi3Q4SLThg&q=cat&random=true&limit=50"
  ) /// API
    .then((reponse) => reponse.json()) 
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
        tabDogGif.push(picture.results[i].media_formats.gif.url); // recuperer le gif en url en fessant le chemin picture-results-etc 
      }
    });
});
