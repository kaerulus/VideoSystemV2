import VideoSystem, {
  Person,
  Category,
  Resource,
  Production,
  Movie,
  Serie,
  User,
  Coordinate,
} from "./videoSystemModel.js";

class VideoSystemController {
  //Parámetros privados
  #model;
  #view;
  //Se reciben en el constructor porque el Controlador no debe crear el Modelo ni la Vista
  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    this.onLoad();
    //Eventos iniciales con Controlador
    this.onInit();

    //Enlzamos handlers con la vista
    this.#view.bindInit(this.handleInit);
  }

  //Pinta la vista inicial
  onInit = () => {
    this.#view.init();
    this.#view.showCategories(this.#model.categories); //Metodo que genera el html de las categorias
    this.#view.listRandomProductions(this.#model.productions);
  };

  //Carga los objetos, menu Administracion
  onLoad = () => {
    this.#loadVideoSystemObjects(); //Carga de objetos
    this.onAddCategory(); //Metodo que pinta en el menu
    this.#view.showAdminMenu(); //muestra menu Administracion

    this.#view.bindAdminMenu(
      this.handleNewProductionForm,
      this.handleRemoveCategoryForm,
      this.handleAssignDeassignCastForm,
    );
    this.#view.bindProductionsCategory(this.handleProductionsCategoryList);
    this.#view.bindShowActor(this.handleShowActor);
    this.#view.bindShowDirector(this.handleShowDirector);
  };

  //Pinta los menus de categorias, actores y directores y en la parte central
  onAddCategory = () => {
    this.#view.showCategoriesInMenu(this.#model.categories); //Genera categorias en menu
    this.#view.showActorsInMenu(this.#model.actors); //Pinta actores en menu
    this.#view.showDirectorsInMenu(this.#model.directors); //pinta directores en menu

    this.#view.bindProductionsCategoryInMenu(
      this.handleProductionsCategoryList,
    );
  };

  //-----HANDLE-----//
  //handle de onInit
  handleInit = () => {
    this.onInit();
  };

  //Manejador, recibe el nombre de la categoría y obtiene el iterador de producciones
  handleProductionsCategoryList = (name) => {
    for (const category of this.#model.categories) {
      //Recorremos las categorias
      if (category.name === name) {
        this.#view.listProductions(
          this.#model.getProductionsCategory(category),
        );
      }
    }
    this.#view.bindShowProduction(this.handleShowProduction);
  };

  //Manejador, recibe el nombre del actor y le pide al modelo la relacion de peliculas en las que sale
  handleShowActor = (name) => {
    let productions = []; //array de produccion
    let actorP = "";
    for (const actor of this.#model.actors) {
      if (actor.name === name) {
        //Si es el mismo actor
        actorP = actor;
        productions = this.#model.getProductionsActor(actor);
      }
    }
    this.#view.showPersonCard(actorP, productions);
    this.#view.bindShowProduction(this.handleShowProduction);
    this.#view.bindShowActorInNewWindow(this.handleShowActorInNewWindow);
  };

  handleShowDirector = (name) => {
    let productions = []; //array de produccion
    let directorP = "";
    for (const director of this.#model.directors) {
      if (director.name === name) {
        //Si es el mismo actor
        directorP = director;
        productions = this.#model.getProductionsDirector(director);
      }
    }
    this.#view.showDirectorCard(directorP, productions);
    this.#view.bindShowProduction(this.handleShowProduction);
    this.#view.bindShowDirectorInNewWindow(this.handleShowDirectorInNewWindow);
  };

  //Manejador de la card de la produccion
  handleShowProduction = (title) => {
    let prod = null;
    let actors = []; //array de actores
    let dir = []; //array de directores

    for (const production of this.#model.productions) {
      if (production.title === title) {
        //Produccion que coincide
        prod = production;
        actors = this.#model.getCast(production); //Actores que salen en la produccion
      }
    }
    //Directores de la pelicula
    for (const director of this.#model.directors) {
      if (director) {
        for (const production of this.#model.getProductionsDirector(director)) {
          if (production.title === title) {
            dir.push(director);
            break;
          }
        }
      }
    }
    //Muestra la card
    this.#view.showProductionCard(prod, actors, dir);
    this.#view.bindShowActor(this.handleShowActor);
    this.#view.bindShowDirector(this.handleShowDirector);
    this.#view.bindShowActorInNewWindow(this.handleShowActorInNewWindow);
    this.#view.bindShowDirectorInNewWindow(this.handleShowDirectorInNewWindow);
    this.#view.bindShowProductionInNewWindow(
      this.handleShowProductionInNewWindow,
    );
    this.#view.bindCloseCard(this.handleInit);
  };

  handleShowProductionInNewWindow = (title) => {
    let prod = null;
    let actors = []; //array de actores
    let dir = []; //array de directores

    for (const production of this.#model.productions) {
      if (production.title === title) {
        //Produccion que coincide
        prod = production;
        actors = this.#model.getCast(production); //Actores que salen en la produccion
      }
    }
    //Directores de la pelicula
    for (const director of this.#model.directors) {
      if (director) {
        for (const production of this.#model.getProductionsDirector(director)) {
          if (production.title === title) {
            dir.push(director);
            break;
          }
        }
      }
    }
    if (prod) {
      this.#view.showProductionInNewWindow(prod, actors, dir);
    } else {
      this.#view.showProductionInNewWindow(
        null,
        "No existe esta producción en la página.",
      );
    }
  };

  handleShowActorInNewWindow = (name) => {
    let productions = [];
    let actorP = null;

    for (const actor of this.#model.actors) {
      if (actor.name === name) {
        actorP = actor;
        productions = this.#model.getProductionsActor(actor);
        break;
      }
    }
    if (actorP) {
      this.#view.showActorInNewWindow(actorP, productions);
    } else {
      this.#view.showActorInNewWindow(null, [], "Actor no encontrado");
    }
  };

  handleShowDirectorInNewWindow = (name) => {
    let productions = [];
    let dir = null;
    for (const director of this.#model.directors) {
      if (director.name === name) {
        dir = director;
        productions = this.#model.getProductionsDirector(dir);
        break;
      }
    }
    if (dir) {
      this.#view.showDirectorInNewWindow(dir, productions);
    } else {
      this.#view.showDirectorInNewWindow(null, [], "Director no encontrado");
    }
  };

  //Manejador del formulario de nueva Produccion
  handleNewProductionForm = () => {
    this.#view.showNewProductionForm(
      this.#model.directors,
      this.#model.actors,
      this.#model.categories,
    );
    this.#view.bindNewProductionForm(this.handleCreateProduction);
  };

  //Manejador del formulario de borrar produccion
  handleRemoveCategoryForm = () => {
    this.#view.showRemoveProductionForm(this.#model.productions);
    this.#view.bindRemoveProductionForm(
      this.handleRemoveProduction,
      this.handleProductionsCategoryList,
    );
  }; 

  //Manejador de crear Produccion, recibe los parametros de validation.js
  handleCreateProduction = (
    title,
    nacionality,
    publication,
    synopsis,
    categoryName,
    director,
    actors,
    type,
  ) => {
    let production;
    let done;
    let error;

    try {
      if (type === "movie") {
        production = new Movie(title, nacionality, publication);
      } else {
        production = new Serie(title, nacionality, publication);
      }
      production.synopsis = synopsis;

      this.#model.addProduction(production); //Añade la production

      //Buscamos la categoria que coincide con el nombre del select
      const categoryArray = Array.from(this.#model.categories);
      const category = categoryArray.find((c) => c.name === categoryName);

      this.#model.assignCategory(category, production); //Signamos categoria a la produccion

      //Buscamos el director que coincida y lo asignamos
      for (const dir of this.#model.directors) {
        if (dir.name === director) {
          this.#model.assignDirector(dir, production); //Asignamos director a la categoria
        }
      }

      //Buscamos actor que coincida y asignamos
      for (const actorName of actors) {
        for (const act of this.#model.actors) {
          if (act.name === actorName) {
            this.#model.assignActor(act, production);
          }
        }
      }

      done = true;
      this.onAddCategory(); //Llamamos al metodo que pinta de nuevo las categorias
    } catch (exception) {
      done = false;
      error = exception;
    }
    //Informar a la vista
    this.#view.showNewProductionModal(done, production, error);
  };

  //Manejador que hace el borrado de produccion, recibe por parámetro el titulo
  handleRemoveProduction = (title) => {
    let done = false;
    let error;
    let production = "";

    try {
      for (const prod of this.#model.productions) {
        if (prod.title === title) {
          production = prod;

          this.#model.removeProduction(prod);
          done = true;
          break;
        }
      }
      this.onAddCategory();
    } catch (exception) {
      done = false;
      error = exception;
    }
    this.#view.showRemoveProductionModal(done, production, error);
  };

   //Manejador del formulario de asignar y deasignar reparto y director
  handleAssignDeassignCastForm = (action, productionName, actorName, directorName) =>{

    let production ="";
    let actor ="";
    let director ="";
    let done = false;
    let error;

    try {
      for(const prod of this.#model.productions){
        if(prod.title === productionName){
          production = prod;
        }

        //Dependiendo del boton
        if(action === "assignDirector"){
          for(const dir of this.#model.directors){
            if(dir.name === directorName){
              director = dir;
              this.#model.assignDirector(director, production);
            }
          }
        }

      }
    } catch (error) {
      
    }

    this.#view.showAssignDeassignForm(this.#model.directors,this.#model.actors,this.#model.productions);
  }

  //Carga inicial de datos
  #loadVideoSystemObjects() {
    //------CATEGORIAS--------//
    const actionCategory = new Category(
      "Action",
      "Ritmo rápido, combates y escenas espectaculares",
    );
    const dramaCategory = new Category(
      "Drama",
      "Conflictos personales y emociones",
    );
    const scifiCategory = new Category(
      "Scify",
      "Tecnología, futuro y mundos imaginarios",
    );
    const comedyCategory = new Category("Comedy", "Risas y buen humor");
    const terrorCategory = new Category(
      "Terror",
      "Películas que te harán saltar de la butaca",
    );

    //Añadimos categorias
    this.#model.addCategory(
      actionCategory,
      dramaCategory,
      scifiCategory,
      comedyCategory,
      terrorCategory,
    );

    //------MOVIES--------//
    const matrix = new Movie(
      "Matrix",
      "USA",
      new Date(1999, 2, 31),
      "Un programador descubre que la realidad es una simulación.",
      "matrix.jpg",
    );
    const gladiator = new Movie(
      "Gladiator",
      "USA",
      new Date(1999, 2, 31),
      "Un general romano busca venganza en contra del Emperador",
      "gladiator.png",
    );
    const interstellar = new Movie(
      "Interstellar",
      "USA",
      new Date(2014, 10, 7),
      "Un hombre viaja al espacio en una misión para salvar a la humanidad",
      "interstellar.jpg",
    );

    const batmanBegins = new Movie(
      "Batman Begins",
      "USA",
      new Date(2012, 10, 7),
      "El justiciero de Gotham bajo la batuta del gran Nolan",
      "batmanbegins.jpg",
    );

    const alien = new Movie(
      "Alien",
      "USA",
      new Date(1979, 1, 25),
      "En una nave espacial un monstruo siembra el terror",
      "alien.jpg",
    );
    const bladeRunner = new Movie(
      "Blade Runner",
      "USA",
      new Date(1982, 5, 25),
      "Un detective debe dar caza a replicantes rebeldes en un futuro distópico.",
      "bladerunner.jpg",
    );

    const elPadrino = new Movie(
      "El Padrino",
      "USA",
      new Date(1972, 2, 24),
      "El patriarca de una dinastía de crímenes organizados transfiere el control a su hijo.",
      "padrino.jpg",
    );

    const elResplandor = new Movie(
      "El Resplandor",
      "USA",
      new Date(1980, 4, 23),
      "Una familia se queda aislada en un hotel donde fuerzas siniestras influyen en el padre.",
      "resplandor.jpg",
    );

    const lista = new Movie(
      "La Lista de Schindler",
      "USA",
      new Date(1993, 11, 15),
      "Salvación en el Holocausto.",
      "schindler.jpg",
    );

    const terminator = new Movie(
      "Terminator",
      "USA",
      new Date(1984, 9, 26),
      "Un cyborg asesino es enviado del futuro para eliminar a la madre del líder de la resistencia.",
      "terminator.jpg",
    );

    const madMax = new Movie(
      "Mad Max",
      "Australia",
      new Date(2015, 4, 15),
      "En un mundo postapocalíptico, una mujer se rebela contra un tirano en una persecución eterna.",
      "madmax.jpg",
    );

    const it = new Movie(
      "It",
      "USA",
      new Date(2017, 8, 8),
      "Un payaso malvado atormenta a un grupo de niños en un pequeño pueblo.",
      "it.jpg",
    );

    const warren = new Movie(
      "Expediente Warren",
      "USA",
      new Date(2013, 6, 19),
      "Investigadores paranormales ayudan a una familia acosada por una presencia oscura.",
      "conjuring.jpg",
    );

    const resacon = new Movie(
      "Resacón en Las Vegas",
      "USA",
      new Date(2009, 5, 5),
      "Tres amigos despiertan tras una despedida de soltero sin recordar nada y habiendo perdido al novio.",
      "resacon.jpg",
    );

    //------SERIES--------//
    const tedLasso = new Serie(
      "Ted Lasso",
      "UK",
      new Date(2020, 8, 14),
      "Un entrenador de futbol americano coge las riendas de un equipo ingles de fútbol",
      "tedLasso.jpg",
    );
    const juegoDeTronos = new Serie(
      "Juego de Tronos",
      "UK",
      new Date(2011, 4, 17),
      "La serie basada en los bestsellers Canción y Fuego",
      "tedLasso.jpg",
    );
    const innato = new Serie(
      "Innato",
      "España",
      new Date(2025, 11, 17),
      "Una serie de asesinatos similares a otros que hubo hace 25 años vuelven a sucederse",
      "innato.jpg",
    );
    const chernobyl = new Serie(
      "Chernobyl",
      "Ucrania",
      new Date(2013, 6, 15),
      "Basada en el accidente nuclear de Chernobyl",
      "chernobyl.jpg",
    );

    const blackMirror = new Serie(
      "Black Mirror",
      "UK",
      new Date(2011, 11, 4),
      "Distopía tecnológica actual.",
      "blackmirror.jpg",
    );

    const friends = new Serie(
      "Friends",
      "USA",
      new Date(1994, 8, 22),
      "Amistad y café en Nueva York.",
      "friends.jpg",
    );

    const hillHouse = new Serie(
      "The Haunting of Hill House",
      "USA",
      new Date(2018, 9, 12),
      "Hermanos que crecieron en una casa embrujada se reúnen tras una tragedia.",
      "hillhouse.jpg",
    );

    const modern = new Movie(
      "Modern Family",
      "USA",
      new Date(2009, 8, 23),
      "Tres estructuras familiares diferentes enfrentan los retos del día a día con un estilo de falso documental.",
      "modernfamily.jpg",
    );

    //Añadimos producciones
    this.#model.addProduction(
      matrix,
      gladiator,
      interstellar,
      batmanBegins,
      alien,
      tedLasso,
      juegoDeTronos,
      innato,
      chernobyl,
      elPadrino,
      elResplandor,
      blackMirror,
      bladeRunner,
      friends,
      hillHouse,
      it,
      madMax,
      lista,
      terminator,
      warren,
      resacon,
      modern,
    );

    //Añadimos producciones a categorias
    this.#model.assignCategory(
      actionCategory,
      matrix,
      gladiator,
      batmanBegins,
      madMax,
    );
    this.#model.assignCategory(
      dramaCategory,
      chernobyl,
      juegoDeTronos,
      innato,
      lista,
      elPadrino,
    );
    this.#model.assignCategory(
      scifiCategory,
      interstellar,
      terminator,
      blackMirror,
      bladeRunner,
    );
    this.#model.assignCategory(
      comedyCategory,
      tedLasso,
      friends,
      resacon,
      modern,
    );
    this.#model.assignCategory(
      terrorCategory,
      alien,
      hillHouse,
      it,
      warren,
      elResplandor,
    );

    //USERS//
    const user1 = new User("Limbo63", "limbo63@hotmail.com", "777555888");
    const user2 = new User("MagdaX", "magda_x@hotmail.com", "playerForEver");
    const user3 = new User("Xtasis21", "xtasis21@gmail.com", "xtasis");
    const user4 = new User("LunaSpace", "luna.s@hotmail.com", "123456789");

    this.#model.addUser(user1, user2, user3, user4);

    //------DIRECTORES--------//
    const ridley = new Person(
      "Ridley",
      "Scott",
      "",
      new Date(1937, 10, 30),
      "pic.jpg",
    );
    const nolan = new Person(
      "Christopher",
      "Nolan",
      "",
      new Date(1970, 7, 30),
      "pic.jpg",
    );
    const miguel = new Person(
      "Miguel",
      "Sapochnik",
      new Date(1974, 7, 1),
      "pic.jpg",
    );
    const lana = new Person(
      "Lana",
      "Wachowski",
      "",
      new Date(1965, 6, 21),
      "pic.jpg",
    );
    const stevenSpielberg = new Person(
      "Steven",
      "Spielberg",
      "",
      new Date(1946, 11, 18),
      "spielberg.jpg",
    );
    const georgeMiller = new Person(
      "George",
      "Miller",
      "",
      new Date(1945, 2, 3),
      "miller.jpg",
    );
    const francisCoppola = new Person(
      "Francis Ford",
      "Coppola",
      "",
      new Date(1939, 3, 7),
      "coppola.jpg",
    );
    const andyMuschietti = new Person(
      "Andy",
      "Muschietti",
      "",
      new Date(1973, 7, 26),
      "muschietti.jpg",
    );
    const jamesWan = new Person(
      "James",
      "Wan",
      "",
      new Date(1977, 0, 30),
      "wan.jpg",
    );
    const stanleyKubrick = new Person(
      "Stanley",
      "Kubrick",
      "",
      new Date(1928, 6, 26),
      "kubrick.jpg",
    );
    // --- SERIES (Creadores/Showrunners) ---
    const craigMazin = new Person(
      "Craig",
      "Mazin",
      "",
      new Date(1971, 3, 8),
      "mazin.jpg",
    );
    const davidBenioff = new Person(
      "David",
      "Benioff",
      "",
      new Date(1970, 8, 25),
      "benioff.jpg",
    );
    const charlieBrooker = new Person(
      "Charlie",
      "Brooker",
      "",
      new Date(1971, 2, 3),
      "brooker.jpg",
    );
    const jasonSudeikis = new Person(
      "Jason",
      "Sudeikis",
      "",
      new Date(1975, 8, 18),
      "sudeikis.jpg",
    );
    const christopherLloyd = new Person(
      "Christopher",
      "Lloyd",
      "",
      new Date(1960, 5, 18),
      "lloyd.jpg",
    );
    const davidCrane = new Person(
      "David",
      "Crane",
      "",
      new Date(1957, 7, 13),
      "crane.jpg",
    );

    this.#model.assignDirector(
      ridley,
      gladiator,
      terminator,
      bladeRunner,
      alien,
    );
    this.#model.assignDirector(nolan, batmanBegins, interstellar);
    this.#model.assignDirector(lana, matrix);
    this.#model.assignDirector(stevenSpielberg, lista);
    this.#model.assignDirector(georgeMiller, madMax);
    this.#model.assignDirector(francisCoppola, elPadrino);
    this.#model.assignDirector(andyMuschietti, it);
    this.#model.assignDirector(jamesWan, warren);
    this.#model.assignDirector(stanleyKubrick, elResplandor);
    this.#model.assignDirector(craigMazin, chernobyl);
    this.#model.assignDirector(davidBenioff, juegoDeTronos);
    this.#model.assignDirector(miguel, juegoDeTronos);
    this.#model.assignDirector(charlieBrooker, blackMirror);
    this.#model.assignDirector(jasonSudeikis, tedLasso);
    this.#model.assignDirector(christopherLloyd, modern);
    this.#model.assignDirector(davidCrane, friends);

    //------ACTORES--------//
    const russell = new Person(
      "Russell",
      "Crowe",
      "",
      new Date(1964, 4, 7),
      "pic.jpg",
    );
    const joaquin = new Person(
      "Joaquin",
      "Phoenix",
      "",
      new Date(1974, 10, 7),
      "pic.jpg",
    );
    const connie = new Person(
      "Connie",
      "Nielsen",
      "",
      new Date(1956, 6, 3),
      "pic.jpg",
    );
    const hannah = new Person(
      "Hannah",
      "Waddingham",
      "",
      new Date(1974, 9, 18),
      "pic.jpg",
    );
    const keanu = new Person(
      "Keanu",
      "Reeves",
      "",
      new Date(1964, 9, 2),
      "pic.jpg",
    );
    const matthew = new Person(
      "Matthew",
      "McConaughey",
      "",
      new Date(1937, 10, 30),
      "pic.jpg",
    );
    const matt = new Person(
      "Matt",
      "Damon",
      "",
      new Date(1970, 10, 8),
      "pic.jpg",
    );
    const kit = new Person(
      "Kit",
      "Harington",
      "",
      new Date(1986, 12, 26),
      "pic.jpg",
    );
    const emilia = new Person(
      "Emillia",
      "Clarke",
      "",
      new Date(1986, 10, 23),
      "pic.jpg",
    );
    const anne = new Person(
      "Anne",
      "Hathaway",
      "",
      new Date(1982, 11, 12),
      "pic.jpg",
    );
    const imanol = new Person(
      "Imanol",
      "Arias",
      "",
      new Date(1956, 4, 26),
      "pic.jpg",
    );
    const elena = new Person(
      "Elena",
      "Anaya",
      "",
      new Date(1975, 7, 17),
      "pic.jpg",
    );
    const liamNeeson = new Person(
      "Liam",
      "Neeson",
      "",
      new Date(1952, 5, 7),
      "neeson.jpg",
    );
    const charlizeTheron = new Person(
      "Charlize",
      "Theron",
      "",
      new Date(1975, 7, 7),
      "theron.jpg",
    );
    const alPacino = new Person(
      "Al",
      "Pacino",
      "",
      new Date(1940, 3, 25),
      "pacino.jpg",
    );
    const jackNicholson = new Person(
      "Jack",
      "Nicholson",
      "",
      new Date(1937, 3, 22),
      "nicholson.jpg",
    );
    const billSkarsgard = new Person(
      "Bill",
      "Skarsgård",
      "",
      new Date(1990, 7, 9),
      "skarsgard.jpg",
    );
    const veraFarmiga = new Person(
      "Vera",
      "Farmiga",
      "",
      new Date(1973, 7, 6),
      "farmiga.jpg",
    );
    const arnoldSchwarzenegger = new Person(
      "Arnold",
      "Schwarzenegger",
      "",
      new Date(1947, 6, 30),
      "arnold.jpg",
    );
    const jaredHarris = new Person(
      "Jared",
      "Harris",
      "",
      new Date(1961, 7, 24),
      "harris.jpg",
    );
    const emiliaClarke = new Person(
      "Emilia",
      "Clarke",
      "",
      new Date(1986, 9, 23),
      "clarke.jpg",
    );
    const sofiaVergara = new Person(
      "Sofía",
      "Vergara",
      "",
      new Date(1972, 6, 10),
      "vergara.jpg",
    );
    const jenniferAniston = new Person(
      "Jennifer",
      "Aniston",
      "",
      new Date(1969, 1, 11),
      "aniston.jpg",
    );
    const bryceDallas = new Person(
      "Bryce Dallas",
      "Howard",
      "",
      new Date(1981, 2, 2),
      "howard.jpg",
    );

    this.#model.assignActor(russell, gladiator);
    this.#model.assignActor(joaquin, gladiator);
    this.#model.assignActor(connie, gladiator);
    this.#model.assignActor(jasonSudeikis, tedLasso);
    this.#model.assignActor(hannah, tedLasso);
    this.#model.assignActor(keanu, matrix);
    this.#model.assignActor(matthew, interstellar);
    this.#model.assignActor(matt, interstellar);
    this.#model.assignActor(kit, juegoDeTronos);
    this.#model.assignActor(anne, interstellar, batmanBegins);
    this.#model.assignActor(imanol, innato);
    this.#model.assignActor(elena, innato);
    this.#model.assignActor(liamNeeson, lista);
    this.#model.assignActor(charlizeTheron, madMax);
    this.#model.assignActor(alPacino, elPadrino);
    this.#model.assignActor(jackNicholson, elResplandor);
    this.#model.assignActor(billSkarsgard, it);
    this.#model.assignActor(veraFarmiga, warren);
    this.#model.assignActor(arnoldSchwarzenegger, terminator);
    this.#model.assignActor(jaredHarris, chernobyl);
    this.#model.assignActor(emiliaClarke, terminator, juegoDeTronos);
    this.#model.assignActor(sofiaVergara, modern);
    this.#model.assignActor(jenniferAniston, friends);
    this.#model.assignActor(bryceDallas, blackMirror);
  }
}

export default VideoSystemController;
