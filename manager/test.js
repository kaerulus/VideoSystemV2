import VideoSystem, {
  Person,
  Category,
  Resource,
  Production,
  Movie,
  Serie,
  User,
  Coordinate,
} from "./videoSystem.js";

// ----------------------
// TEST CATEGORIES
// ----------------------
function categoryTest() {
  console.log("%cCATEGORIAS", "color: blue; font-weigth: bold");

  //Instancia de VideoSystem
  const myVideoSystem = VideoSystem.getInstance();

  //------CATEGORIAS--------//
  const actionCategory = new Category(
    "action",
    "Ritmo rápido, combates y escenas espectaculares",
  );
  const dramaCategory = new Category(
    "drama",
    "Conflictos personales y emociones",
  );
  const scifyCategory = new Category(
    "scify",
    "Tecnología, futuro y mundos imaginarios",
  );
  const comedyCategory = new Category("Comedy", "Risas y buen humor");
  const terrorCategory = new Category("Terror", "Películas que te harán saltar de la butaca");
  const duplicateCategory = new Category("comedy", "Risas y buen humor");

  //------USERS--------//
  const user1 = new User("Limbo63", "limbo63@hotmail.com", "777555888");
  const user2 = new User("MagdaX", "magda_x@hotmail.com", "playerForEver");
  const user3 = new User("Xtasis21", "xtasis21@gmail.com", "xtasis");
  const user4 = new User("LunaSpace", "luna.s@hotmail.com", "123456789");
  const userMailDuplicado = new User("LuisXV", "luna.s@hotmail.com", "luisRey");
  const usernameDuplicado = new User("Limbo63", "ratatata@gmail.com", "ratata");

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
    'Ucrania',
    new Date(2013, 6,15),
    "Basada en el accidente nuclear de Chernobyl",
    "chernobyl.jpg",
  );

  //------COORDINATES--------//
  const toscana = new Coordinate(44.38248, 111.63965);
  const marruecos = new Coordinate(31.791702, -7.09262);
  const inglaterra = new Coordinate(55.378051, -3.435973);
  const canada = new Coordinate(56.130366, -106.346771);
  const islandia = new Coordinate(64.963051, -19.020835);
  const richmond = new Coordinate(54.4036, -1.73434);
  const losAngeles = new Coordinate(34.05223, -118.24368);
  const nuevaZelanda = new Coordinate(-40.900557, 174.885971);
  const españa = new Coordinate(43.37985, -2.58556);

  //------RESOURCES MOVIES--------//
  const resourcesGladiator = new Resource(155, "netflix.com/gladiator");
  const resourcesInterstellar = new Resource(
    169,
    "amazonprime.com/interestellar",
  );
  const resourcesMatrix = new Resource(136, "paramount.com/matrix");
  const resourcesComunidadAnillo = new Resource(
    178,
    "netflix.com/esdla/lacomunidaddelanillo",
  );
  const resourcesIntocable = new Resource(112, "paramount.com/intouchables");

  //------RESOURCES MOVIES--------//
  const resourcesTronosT101 = new Resource(55, "hbo.com/jdt101");
  const resourcesTronosT102 = new Resource(54, "hbo.com/jdt102");
  const resourcesTronosT103 = new Resource(56, "hbo.com/jdt103");
  const resourcesTronosT104 = new Resource(56, "hbo.com/jdt104");
  const resourcesTronosT105 = new Resource(56, "hbo.com/jdt105");
  const resourcesTedLassoT101 = new Resource(31, "apple.com/tedLasso101");
  const resourcesTedLassoT102 = new Resource(30, "apple.com/tedLasso102");
  const resourcesTedLassoT103 = new Resource(31, "apple.com/tedLasso103");
  const resourcesInnato101 = new Resource(46, "netflix.com/innato101");
  const resourcesInnato102 = new Resource(44, "netflix.com/innato102");
  const resourcesInnato103 = new Resource(56, "netflix.com/innato103");
  const resourcesInnato104 = new Resource(49, "netflix.com/innato104");

  //------DIRECTORES--------//
  const ridley = new Person("Ridley", "Scott","", new Date(1937, 10, 30), "pic.jpg");
  const nolan = new Person("Christopher", "Nolan", "", new Date(1970, 7, 30), "pic.jpg");
  const miguel = new Person("Miguel", "Sapochnik", new Date(1974, 7, 1), "pic.jpg");
  const lana = new Person("Lana", "Wachowski", "", new Date(1965, 6, 21), "pic.jpg");
  const lilly = new Person("Lilly", "Wachowski","", new Date(1967, 12, 29), "pic.jpg");

    //------ACTORES--------//
  const russell = new Person("Russell", "Scott", "",new Date(1964, 4, 7), "pic.jpg");
  const joaquin = new Person("Joaquin", "Phoenix","", new Date(1974, 10, 7), "pic.jpg");
  const connie = new Person("Connie", "Nielsen", "",new Date(1956, 6, 3), "pic.jpg");
  const sudeikis = new Person("Jason", "Sudeikis","", new Date(1975, 6, 28), "pic.jpg");
  const hannah = new Person("Hannah", "Waddingham","", new Date(1974, 9, 18), "pic.jpg");
  const keanu = new Person("Keanu", "Reeves", "",new Date(1964, 9, 2), "pic.jpg");
  const matthew = new Person("Matthew", "McConaughey","", new Date(1937, 10, 30), "pic.jpg");
  const matt = new Person("Matt", "Damon","", new Date(1970, 10, 8), "pic.jpg");
  const kit = new Person("Kit", "Harington", "",new Date(1986, 12, 26), "pic.jpg");
  const emilia = new Person("Emillia", "Clarke","", new Date(1986, 10, 23), "pic.jpg");
  const anne = new Person("Anne", "Hathaway", "",new Date(1982, 11, 12), "pic.jpg");
  const imanol = new Person("Imanol", "Arias", "",new Date(1956, 4, 26), "pic.jpg");
  const elena = new Person("Elena", "Anaya", "", new Date(1975, 7, 17), "pic.jpg"); 
  

  try {
    //Metodo addCategory
    console.log("addCategory()");
    let addCats = myVideoSystem.addCategory(
      actionCategory,
      dramaCategory,
      scifyCategory,
      comedyCategory,
      terrorCategory,
    );
    console.log("Numero de categorías tras añadir: ", addCats);
    //myVideoSystem.addCategory(duplicateCategory); //Salta excepcion

    /*
    console.log("Iterador de categorias");
    for (const category of myVideoSystem.categories) {
      console.log(category);
    }
      */

    //No es una categoria, salta excepcion
    //let categoriaSinNombre = myVideoSystem.addCategory("Miedo y situaciones que te harán temblar en la butaca");

    //Metodo removeCategory
    let removeCats = myVideoSystem.removeCategory(dramaCategory);
    console.log("Numero de categorías tras borrar: ", removeCats);

    //USERS
    console.log("");
    console.log("%cUSERS", "color: blue; font-weigth: bold");

    //Metodo addUSer
    console.log("addUSer()");
    let addUs = myVideoSystem.addUser(user1, user2, user3, user4);
    console.log("tamaño tras añadir users: ", addUs);

    /*
    console.log("Iterador de users");
    for (const user of myVideoSystem.users) {
      console.log(user);
    }
      */

    //Añadir usuarios con campos ya existentes
    //console.log(myVideoSystem.addUser(usernameDuplicado));
    //console.log(myVideoSystem.addUser(userMailDuplicado));

    console.log("removeUSer()");
    console.log(
      "Tamaño tras borrar users: ",
      myVideoSystem.removeUser(user1, user4),
    );
    //console.log('Tamaño tras borrar: ', myVideoSystem.removeUser(user1));//Lanza excepcion Usuario no existe

    //PRODUCTIONS
    console.log("");
    console.log("%cPRODUCTIONS", "color: blue; font-weigth: bold");
    console.log("addProduction()");

    console.log('Nº producciones tras añadir: ',
      myVideoSystem.addProduction(
        gladiator,
        matrix,
        interstellar,
        tedLasso,
        juegoDeTronos,
        innato,
        batmanBegins,
        chernobyl,
        alien,
      ),
    );

    //Metemos localizaciones en las producciones
    gladiator.locations.push(marruecos, toscana, inglaterra);
    gladiator.resource = {duration: 155, link: "netflix.com/gladiator"};
    matrix.locations.push(losAngeles);
    tedLasso.resources.push(resourcesTedLassoT101);


    /*Iteramos en las producciones
    for(const production of myVideoSystem.productions){
        console.log(production);
    }
    */

    console.log("removeProduction()");
    console.log('Nº de elementos tras borrar producciones', myVideoSystem.removeProduction(matrix, juegoDeTronos));

    //ASSIGN CATEGORIES
    console.log("");
    console.log("%cASSIGN CATEGORY", "color: blue; font-weigth: bold");
    console.log("assignCategory()");

    console.log('Producciones asignadas a ciencia ficcion: ', myVideoSystem.assignCategory(scifyCategory, interstellar, matrix, alien));
    console.log('Producciones asignadas a drama: ', myVideoSystem.assignCategory(dramaCategory, innato, chernobyl));
    console.log('Producciones asignadas a accion: ', myVideoSystem.assignCategory(actionCategory, gladiator, juegoDeTronos, batmanBegins));
    console.log('Producciones asignadas a terror: ', myVideoSystem.assignCategory(terrorCategory, alien));
    console.log('Producciones asignadas a comedia: ', myVideoSystem.assignCategory(comedyCategory, tedLasso));

    //DEASSIGN CATEGORIES
    console.log("");
    console.log("%cDEASSIGN CATEGORY", "color: blue; font-weigth: bold");
    console.log("deassignCategory()");

    console.log('Producciones en drama tras deasignar', myVideoSystem.deassignCategory(dramaCategory, innato));
    console.log('Producciones en accion tras deasignar', myVideoSystem.deassignCategory(actionCategory, juegoDeTronos));
    //console.log('Producciones en drama tras deasignar', myVideoSystem.deassignCategory(dramaCategory, innato));//Lanza excepcion


    //ACTORS
    console.log("");
    console.log("%cACTORS", "color: blue; font-weigth: bold");
    console.log("addActor()");

    console.log('Nº de elementos tras añadir actores: ', myVideoSystem.addActor(russell, keanu, anne, kit, hannah));
    
    console.log("removeActor()");
    console.log('Elementos tras borrar actor: ', myVideoSystem.removeActor(hannah, kit));

    console.log("");
    console.log("%cASSIGNACTOR", "color: blue; font-weigth: bold");
    console.log("assignACTOR()");
    console.log('Producciones en Rusell Crowe tras añadir produccion: ', myVideoSystem.assignActor(russell, gladiator));
    console.log('Producciones en Matthew McConageiht tras añadir produccion: ', myVideoSystem.assignActor(matthew, interstellar));
    console.log('Producciones en Matt Damon tras añadir produccion: ', myVideoSystem.assignActor(matt, interstellar));
    console.log('Producciones en Anne Hatthaway tras añadir produccion: ', myVideoSystem.assignActor(anne, interstellar, batmanBegins));
    console.log('Producciones en Imanol Arias tras añadir produccion: ', myVideoSystem.assignActor(imanol, innato, batmanBegins));
    console.log('Producciones en Emilia Clarke tras añadir produccion: ', myVideoSystem.assignActor(emilia, juegoDeTronos, matrix));

    console.log("");
    console.log("%cDEASSIGNACTOR", "color: blue; font-weigth: bold");
    console.log("deassignACTOR()");
    console.log('Producciones en Imanol Arias tras deasignar produccion: ', myVideoSystem.deassignActor(imanol, batmanBegins));
    console.log('Producciones en Emilia Clarke tras deasignar produccion: ', myVideoSystem.deassignActor(emilia, matrix));
    

     //DIRECTORS
    console.log("");
    console.log("%cDIRECTORS", "color: blue; font-weigth: bold");
    console.log("addDirector()");
    console.log('Nº de elementos tras añadir directores: ', myVideoSystem.addDirector(ridley, nolan, miguel, lana));

    console.log("removeDirector()");
    console.log('Elementos tras borrar director: ', myVideoSystem.removeDirector(ridley));

    console.log("");
    console.log("%cASSIGNDIRECTOR", "color: blue; font-weigth: bold");
    console.log("assignDirector()");
    
    console.log('Producciones en Ridley tras añadir' , myVideoSystem.assignDirector(ridley, alien, gladiator));
    console.log('Producciones en Nolan tras añadir' , myVideoSystem.assignDirector(nolan, batmanBegins, interstellar));
    console.log('Producciones en Lana tras añadir' , myVideoSystem.assignDirector(lana, matrix, chernobyl));
    console.log('Producciones en Lilly tras añadir' , myVideoSystem.assignDirector(lilly, matrix, batmanBegins));
  
    console.log("");
    console.log("%cDEASSIGNDIRECTOR", "color: blue; font-weigth: bold");
    console.log("deassignDirector()");
    console.log('Producciones en Lana Wachosky tras deasignar' , myVideoSystem.deassignDirector(lana, chernobyl));
    console.log('Producciones en Lilly Wachosky tras deasignar' , myVideoSystem.deassignDirector(lilly, batmanBegins));
  
    console.log("");
    console.log("%cGET CAST", "color: blue; font-weigth: bold");
    console.log("getCast()");
    
    const castInterestellar = myVideoSystem.getCast(interstellar);
    for(const actor of castInterestellar){
      console.log(actor.name, actor.lastname1);
    }
    

    console.log("");
    console.log("%cGET PRODUCTIONSDIRECTOR", "color: blue; font-weigth: bold");
    console.log("getProductionsDirector()");    console.log("");

    console.log('Producciones de Ridley Scott');
    const ridleyProductions = myVideoSystem.getProductionsDirector(ridley);    
    for(const production of ridleyProductions){
      console.log(production.title);
    }
    console.log('\nProducciones de Nolan');
    const nolanProduction = myVideoSystem.getProductionsDirector(nolan);    
    for(const production of nolanProduction){
      console.log(production.title);
    }

    console.log("");
    console.log("%cGET PRODUCTIONSDIRECTOR", "color: blue; font-weigth: bold");
    console.log("getProductionsCategory()");
    console.log("");
    console.log('Producciones de Anne Hathaway');
    const anneProductions = myVideoSystem.getProductionsActor(anne);    
    for(const production of anneProductions){
      console.log(production.title);
    }
    console.log('\nProducciones de Russell Crowe');
    const russellProductions = myVideoSystem.getProductionsActor(russell);    
    for(const production of russellProductions){
      console.log(production.title);
    }

    console.log("");
    console.log("%cGET PRODUCTIONSCATEGORY", "color: blue; font-weigth: bold");
    console.log("getProductionCategory()");
    console.log("");
    console.log('Producciones de Drama');
    const dramaProductions = myVideoSystem.getProductionsCategory(dramaCategory);    
    for(const production of dramaProductions){
      console.log(production.title);
    }
    console.log('\nProducciones de Accion');
    const actionProductions = myVideoSystem.getProductionsCategory(actionCategory);    
    for(const production of actionProductions){
      console.log(production.title);
    }
    console.log('\nProducciones de Scyfi');
    const scyfiProductions = myVideoSystem.getProductionsCategory(scifyCategory);    
    for(const production of scyfiProductions){
      console.log(production.title);
    }

    console.log("");
    console.log("%cCREATE PERSON", "color: blue; font-weigth: bold");
    console.log("createPerson()");
    console.log("");
    console.log(myVideoSystem.createPerson("Connie", "Nielsen", "",new Date(1956, 6, 3), "pic.jpg"));

    const amenabar = myVideoSystem.createPerson ("Alejandro","Amenabar","Cantos", new Date(1972,3,31),"pic.jpg");
    console.log('Persona: ', amenabar);

    console.log("");
    console.log("%cCREATE PRODUCTION", "color: blue; font-weigth: bold");
    console.log("createProduction()");
    console.log("");

    const dune = myVideoSystem.createProduction("movie","Dune", "EEUU", new Date(2021,10,22), "Arrakis, también denominado Dune...","pic.jpg" );
    const fallout = myVideoSystem.createProduction("serie","Fallout", "EEUU", new Date(2024,4,10), "Tras un apocalipsis nuclear...","pic.jpg", 2 );
    console.log(dune);
    console.log(fallout);

    console.log("");
    console.log("%cCREATE USER", "color: blue; font-weigth: bold");
    console.log("createUser()");
    console.log("");
   
    const user5 = myVideoSystem.createUser("Skeleton", "heman@x.com", "greiskul88");
    console.log(user5);
    //Usuario ya existente
    console.log(myVideoSystem.createUser("LunaSpace", "luna.s@hotmail.com", "123456789"));

    console.log("");
    console.log("%cCREATE CATEGORY", "color: blue; font-weigth: bold");
    console.log("createCategory()");
    console.log("");

    const belica = myVideoSystem.createCategory("Belica", "Guerra y lucha");
    const aventura = myVideoSystem.createCategory("Aventuras", "Viajes, accion, exploracion");

    console.log(belica);
    console.log(aventura);



  } catch (error) {
    console.log(error.toString());
  }
}

categoryTest();
