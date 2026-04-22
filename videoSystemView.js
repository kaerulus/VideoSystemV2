import { newProductionValidation } from "./validation.js";

//En esta clase ira DOM, mostrar datos y eventos visuales
class VideoSystemView {
  constructor() {
    this.main = document.getElementsByTagName("main")[0]; //Elemento main del index.html
    this.categories = document.getElementById("categories");
    this.menu = document.querySelector(".navbar-nav");
    this.random = document.getElementById("rndmProductions");
    this.productionWindow = null;
  }

  //Metodo que crea el contenido inicial
  init() {
    this.main.replaceChildren();
    this.categories.replaceChildren();
    this.categories.insertAdjacentHTML(
      "afterbegin",
      `<div class="text-center p-2 bg-white rounded shadow-sm">
            <h2 class="display-4">VideoSystemApp</h2>
            <p class="lead">Explora nuestro catálogo de películas y series.</p>            
        </div>`,
    );
  }

  //Muestra las categorias en el div categories
  showCategories(categories) {
    //Borramos cualquier dato que haya en categorias
    if (this.categories.children.length > 1) {
      this.categories.children[1].remove();
    }
    //Creamos un div
    const container = document.createElement("div");
    container.id = "category-list";
    // "g-3" añade un espacio (gutter) elegante entre tarjetas
    container.classList.add("row", "g-3", "py-4");

    //Recorremos las categorías
    for (const category of categories) {
      container.insertAdjacentHTML(
        "beforeend",
        `
      <div class="col-6 col-md-4 col-lg-3">
        <a data-category="${category.name}" href="#category-list" class="text-decoration-none">
          <div class="card bg-dark text-white border-0 netflix-card">
            <img alt="${category.name}" src="./img/peli2.png" class="card-img" />
            <div class="card-img-overlay d-flex flex-column justify-content-end p-2">
              <h5 class="card-title mb-0 fs-6">${category.name}</h5>
              <p class="card-text small d-none d-md-block" style="font-size: 0.7rem;">
                ${category.description}
              </p>
            </div>
          </div>
        </a>
      </div>`,
      );
    }
    this.categories.append(container);
  }

  //Muestra enlaces de categorias en el navbar
  showCategoriesInMenu(categories) {
    const dropdown = document.getElementById("categories-dropdown");
    dropdown.replaceChildren();
    for (const category of categories) {
      dropdown.insertAdjacentHTML(
        "beforeend",
        `<a 
          class="dropdown-item" class="navCats" data-category="${category.name}">
          ${category.name}
      </a>
    `,
      );
    }
  }

  showActorsInMenu(actors) {
    const dropdown = document.getElementById("actors-dropdown");
    dropdown.replaceChildren();
    for (const actor of actors) {
      dropdown.insertAdjacentHTML(
        "beforeend",
        `<a 
          class="dropdown-item" id="navActors" data-actor="${actor.name}">
          ${actor.name} ${actor.lastname1}
      </a>
    `,
      );
    }
  }

  showDirectorsInMenu(directors) {
    const dropdown = document.getElementById("directors-dropdown");
    dropdown.replaceChildren();
    for (const director of directors) {
      dropdown.insertAdjacentHTML(
        "beforeend",
        `<a 
          class="dropdown-item" id="navDirectors" data-director="${director.name}">
          ${director.name} ${director.lastname1}
      </a>
    `,
      );
    }
  }

  //Muestra la ficha de la produccion
  showProductionCard(production, actors, directors) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-5");
    container.classList.add("animate_animated");
    container.classList.add("animate_fadeIn");

    const date = new Date(production.publication);
    const formattedDate = date.toLocaleDateString();

    if (production) {
      container.id = "single-production";
      container.classList.add(`${production.constructor.title}-style`);
      container.innerHTML = `<div class="card shadow-lg border-0 overflow-hidden">
      <div class="row g-0">        
        <div class="col-md-4 bg-dark d-flex align-items-center justify-content-center">
          <img src="img/peli3.png" class="img-fluid p-3" alt="${production.title}" style="max-height: 450px;">
        </div>        
        
        <div class="col-md-8">
          <div class="card-body p-4 p-lg-5">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h1 class="display-5 fw-bold text-dark mb-0">${production.title}</h1>
              <span class="badge bg-primary rounded-pill px-3 py-2">${production.constructor.name}</span>
            </div>            
            <div class="row g-3">
              <div class="col-sm-6">
                <p class="mb-1 fw-bold text-uppercase small text-muted">Fecha de publicación</p>
                <p class="text-dark">${formattedDate}</p>
              </div>
              <div class="col-sm-6">
                <p class="mb-1 fw-bold text-uppercase small text-muted">Nacionalidad</p>
                <p class="text-dark">${production.nationality || "No especificada"}</p>
              </div>
              <div class="col-sm-12">
                <p class="mb-1 fw-bold text-uppercase small text-muted">Sinopsis completa</p>
                <p class="text-secondary">${production.synopsis || "Sin sinopsis disponible actualmente."}</p>
              </div>              
              <div class="col-12 mt-4">
                  <p class="mb-2 fw-bold text-uppercase small text-muted">Dirección</p>
                  <div id="director-list" class="d-flex flex-wrap gap-2 mb-3"></div>

                  <p class="mb-2 fw-bold text-uppercase small text-muted">Reparto principal</p>
                  <div id="actor-list" class="row g-2"></div>
                </div>
            </div>
            <hr class="my-4">
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark px-4 py-2" id="btn-close-card">
                <i class="bi bi-arrow-left me-2"></i>Cerrar</button>
                <button class="btn btn-outline-dark px-4 py-2" data-title="${production.title}" id="btn-newWindow">
                <i class="bi bi-arrow-left me-2"></i>Abrir en nueva ventana</button>
            </div>            
          </div>
        </div>
      </div>
    </div>`;

      // 1. Insertar Directores
      const directorContainer = container.querySelector("#director-list");
      for (const dir of directors) {
        directorContainer.insertAdjacentHTML(
          "beforeend",
          `
          <div class="col-6 col-sm-4 col-lg-3">
          <a data-director="${dir.name}" href="#production-list" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${dir.name} ${dir.lastname1}
            </div>      
          </a>
        </div>`,
        );
      }

      // 2. Insertar Actores
      const actorContainer = container.querySelector("#actor-list");
      for (const actor of actors) {
        actorContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="col-6 col-sm-4 col-lg-3">
          <a data-actor="${actor.name}" href="#" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${actor.name} ${actor.lastname1}
            </div>      
          </a>
        </div>`,
        );
      }
      this.main.append(container);
    }
  }

  //Muestra la informacion del actor y director
  showPersonCard(actor, productions) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-5");
    container.classList.add("animate_animated");
    container.classList.add("animate_fadeIn");

    if (actor) {
      container.id = "single-actor";
      container.classList.add(`${actor.constructor.title}-style`);
      container.innerHTML = `<div class="card shadow-lg border-0 overflow-hidden">
      <div class="row g-0">        
        <div class="col-md-4 bg-dark d-flex align-items-center justify-content-center">
          <img src="img/actor.png" class="img-fluid p-3" alt="${actor.name}" style="max-height: 450px;">
        </div>
        
        <div class="col-md-8">
          <div class="card-body p-4 p-lg-5">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h1 class="display-5 fw-bold text-dark mb-0">${actor.name} ${actor.lastname1}</h1>         
            </div>            
            <div class="row g-3">              
              <div class="col-sm-6">
                <p class="mb-1 fw-bold text-uppercase small text-muted">Fecha nacimiento</p>
                <p class="text-dark">${actor.born.toLocaleDateString("es-ES") || "No especificada"}</p>
              </div>                    
              <div class="col-12 mt-4">
                  <p class="mb-2 fw-bold text-uppercase small text-muted">Peliculas</p>
                  <div id="actorProductions-list" class="row g-2"></div>
                </div>
            </div>
            <hr class="my-4">
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark px-4 py-2" id="btn-close">
                <i class="bi bi-arrow-left me-2"></i>Cerrar</button>
                <button class="btn btn-outline-dark px-4 py-2" id="btn-newWindowActor" data-actor=${actor.name}>
                <i class="bi bi-arrow-left me-2"></i>Abrir en nueva ventana</button>
            </div>            
          </div>
        </div>
      </div>
    </div>`;

      //Listado peliculas
      const productionsContainer = container.querySelector(
        "#actorProductions-list",
      );
      for (const production of productions) {
        productionsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="col-6 col-sm-4 col-lg-3">
          <a data-title="${production.title}" href="#actorProductions-list" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${production.title}
            </div>      
          </a>
        </div>`,
        );
      }
    }
    this.main.append(container);
  }

  showDirectorCard(director, productions) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-5");
    container.classList.add("animate_animated");
    container.classList.add("animate_fadeIn");

    if (director) {
      container.id = "single-director";
      container.classList.add(`${director.constructor.title}-style`);
      container.innerHTML = `<div class="card shadow-lg border-0 overflow-hidden">
      <div class="row g-0">        
        <div class="col-md-4 bg-dark d-flex align-items-center justify-content-center">
          <img src="img/actor.png" class="img-fluid p-3" alt="${director.name}" style="max-height: 450px;">
        </div>
        
        <div class="col-md-8">
          <div class="card-body p-4 p-lg-5">
            <div class="d-flex justify-content-between align-items-start mb-3">
              <h1 class="display-5 fw-bold text-dark mb-0">${director.name} ${director.lastname1}</h1>         
            </div>            
            <div class="row g-3">              
              <div class="col-sm-6">
                <p class="mb-1 fw-bold text-uppercase small text-muted">Fecha nacimiento</p>
                <p class="text-dark">${director.born.toLocaleDateString("es-ES") || "No especificada"}</p>
              </div>                    
              <div class="col-12 mt-4">
                  <p class="mb-2 fw-bold text-uppercase small text-muted">Peliculas</p>
                  <div id="directorProductions-list" class="row g-2"></div>
                </div>
            </div>
            <hr class="my-4">
            <div class="d-flex gap-2">
              <button class="btn btn-outline-dark px-4 py-2" id="btn-close">
                <i class="bi bi-arrow-left me-2"></i>Cerrar</button>
                <button class="btn btn-outline-dark px-4 py-2" id="btn-newWindowDirector" data-director=${director.name}>
                <i class="bi bi-arrow-left me-2"></i>Abrir en nueva ventana</button>
            </div>            
          </div>
        </div>
      </div>
    </div>`;

      //Listado peliculas
      const productionsContainer = container.querySelector(
        "#directorProductions-list",
      );
      for (const production of productions) {
        productionsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="col-6 col-sm-4 col-lg-3">
          <a data-title="${production.title}" href="#actorProductions-list" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${production.title}
            </div>      
          </a>
        </div>`,
        );
      }
    }
    this.main.append(container);
  }

  //Muestra produccion en nueva ventana
  showProductionInNewWindow(production, actors, directors, message) {
    const doc = this.productionWindow.document;
    const main = doc.querySelector("main");
    const header = doc.querySelector("header");
    main.replaceChildren();
    header.replaceChildren();

    let container;
    if (production) {
      doc.title = `${production.title}`;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 data-title="${production.title}">${production.title}</h1>`,
      );
      container = doc.createElement("div");
      container.id = "single-product";
      container.classList.add(`${production.constructor.name}-style`);
      container.classList.add(
        "container-fluid",
        "p-0",
        "min-vh-100",
        "bg-white",
      );

      container.innerHTML = `<div class="row g-0 min-vh-100">
        <div class="col-md-5 col-lg-4 bg-dark d-flex align-items-center justify-content-center p-5">
          <img src="img/peli3.png" class="img-fluid rounded shadow-lg" alt="${production.title}" style="max-height: 85vh; object-fit: cover;">
        </div>

        <div class="col-md-7 col-lg-8 p-4 p-lg-5 overflow-auto">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="display-3 fw-bold text-dark mb-0">${production.title}</h1>
            <span class="badge bg-primary fs-5 px-4 py-2 rounded-pill">${production.constructor.name}</span>
          </div>

          <div class="row mb-5 text-muted">
            <div class="col-sm-4">
              <p class="mb-0 fw-bold text-uppercase small">Publicación</p>
              <p class="fs-5 text-dark">${production.publication.toLocaleDateString()}</p>
            </div>
            <div class="col-sm-4">
              <p class="mb-0 fw-bold text-uppercase small">Nacionalidad</p>
              <p class="fs-5 text-dark">${production.nationality || "No especificada"}</p>
            </div>
          </div>

          <div class="mb-5">
            <h2 class="h5 fw-bold text-uppercase border-bottom pb-2 mb-3">Sinopsis Completa</h2>
            <p class="lead text-secondary" style="line-height: 1.8;">
              ${production.synopsis || "Sin sinopsis disponible actualmente."}
            </p>
          </div>

          <div class="row mt-4">
            <div class="col-12 mb-4">
              <h2 class="h5 fw-bold text-uppercase border-bottom pb-2 mb-3">Dirección</h2>
              <div id="director-list" class="d-flex flex-wrap gap-2"></div>
            </div>
            <div class="col-12">
              <h2 class="h5 fw-bold text-uppercase border-bottom pb-2 mb-3">Reparto Principal</h2>
              <div id="actor-list" class="row g-2"></div>
            </div>
          </div>         
          </div>
        </div>
      </div>`;
      // Boton cerrar NO FUNCIONA
      const closeBtn = doc.createElement("button");
      closeBtn.textContent = "Cerrar";
      closeBtn.classList.add("btn", "btn-primary", "m-2");

      closeBtn.addEventListener("click", () => {
        this.productionWindow.close();
      });
      container.append(closeBtn);
    } else {
      container = doc.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");

      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`,
      );
    }
    // 1. Insertar Directores
    const directorContainer = container.querySelector("#director-list");
    for (const dir of directors) {
      directorContainer.insertAdjacentHTML(
        "beforeend",
        `
          <div class="col-6 col-sm-4 col-lg-3">
          <a data-director="${dir.name}" href="#production-list" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${dir.name} ${dir.lastname1}
            </div>      
          </a>
        </div>`,
      );
    }

    // 2. Insertar Actores
    const actorContainer = container.querySelector("#actor-list");
    for (const actor of actors) {
      actorContainer.insertAdjacentHTML(
        "beforeend",
        `
        <div class="col-6 col-sm-4 col-lg-3">
          <a data-actor="${actor.name}" href="#" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${actor.name} ${actor.lastname1}
            </div>      
          </a>
        </div>`,
      );
    }
    main.append(container);
    doc.body.scrollIntoView();
  }

  //Pinta nueva ventana con datos de actor
  showActorInNewWindow(actor, productions, message) {
    const doc = this.productionWindow.document;
    const main = doc.querySelector("main");
    const header = doc.querySelector("header");
    main.replaceChildren();
    header.replaceChildren();

    let container;
    if (actor) {
      doc.title = `${actor.name}`;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 data-name="${actor.name}">${actor.name} ${actor.lastname1}</h1>`,
      );
      container = doc.createElement("div");
      container.id = "single-actor";
      container.classList.add(`${actor.constructor.name}-style`);
      container.classList.add(
        "container-fluid",
        "p-0",
        "min-vh-100",
        "bg-white",
      );

      container.innerHTML = `<div class="row g-0 min-vh-100">
        <div class="col-md-5 col-lg-4 bg-dark d-flex align-items-center justify-content-center p-5">
          <img src="img/actor.png" class="img-fluid rounded shadow-lg" alt="${actor.name}" style="max-height: 85vh; object-fit: cover;">
        </div>

        <div class="col-md-7 col-lg-8 p-4 p-lg-5 overflow-auto">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="display-3 fw-bold text-dark mb-0">${actor.name}${actor.lastname1}</h1>
            <span class="badge bg-primary fs-5 px-4 py-2 rounded-pill">${actor.constructor.name}</span>
          </div>

          <div class="row mb-5 text-muted">            
            <div class="col-sm-4">
              <p class="mb-0 fw-bold text-uppercase small">Fecha nacimiento</p>
              <p class="fs-5 text-dark">${actor.born.toLocaleDateString("es-ES") || "No especificada"}</p>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12 mb-4">
              <h2 class="h5 fw-bold text-uppercase border-bottom pb-2 mb-3">Peliculas</h2>
              <div id="actorProductions-list" class="d-flex flex-wrap gap-2"></div>
            </div>            
          </div>         
          </div>
        </div>
      </div>`;

      //Listado peliculas
      const productionsContainer = container.querySelector(
        "#actorProductions-list",
      );
      for (const production of productions) {
        productionsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="col-6 col-sm-4 col-lg-3">
          <a data-title="${production.title}" href="#actorProductions-list" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${production.title}
            </div>      
          </a>
        </div>`,
        );
      }

      // Boton cerrar NO FUNCIONA
      const closeBtn = doc.createElement("button");
      closeBtn.textContent = "Cerrar";
      closeBtn.classList.add("btn", "btn-primary", "m-2");

      closeBtn.addEventListener("click", () => {
        this.productionWindow.close();
      });
      container.append(closeBtn);
    } else {
      container = doc.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");

      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`,
      );
    }

    main.append(container);
    doc.body.scrollIntoView();
  }

  showDirectorInNewWindow(director, productions, message) {
    const doc = this.productionWindow.document;
    const main = doc.querySelector("main");
    const header = doc.querySelector("header");
    main.replaceChildren();
    header.replaceChildren();

    let container;
    if (director) {
      doc.title = `${director.name}`;
      header.insertAdjacentHTML(
        "beforeend",
        `<h1 data-name="${director.name}">${director.name} ${director.lastname1}</h1>`,
      );
      container = doc.createElement("div");
      container.id = "single-actor";
      container.classList.add(`${director.constructor.name}-style`);
      container.classList.add(
        "container-fluid",
        "p-0",
        "min-vh-100",
        "bg-white",
      );

      container.innerHTML = `<div class="row g-0 min-vh-100">
        <div class="col-md-5 col-lg-4 bg-dark d-flex align-items-center justify-content-center p-5">
          <img src="img/actor.png" class="img-fluid rounded shadow-lg" alt="${director.name}" style="max-height: 85vh; object-fit: cover;">
        </div>

        <div class="col-md-7 col-lg-8 p-4 p-lg-5 overflow-auto">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="display-3 fw-bold text-dark mb-0">${director.name} ${director.lastname1}</h1>
            <span class="badge bg-primary fs-5 px-4 py-2 rounded-pill">${director.constructor.name}</span>
          </div>

          <div class="row mb-5 text-muted">            
            <div class="col-sm-4">
              <p class="mb-0 fw-bold text-uppercase small">Fecha nacimiento</p>
              <p class="fs-5 text-dark">${director.born.toLocaleDateString("es-ES") || "No especificada"}</p>
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-12 mb-4">
              <h2 class="h5 fw-bold text-uppercase border-bottom pb-2 mb-3">Peliculas</h2>
              <div id="directorProductions-list" class="d-flex flex-wrap gap-2"></div>
            </div>            
          </div>         
          </div>
        </div>
      </div>`;

      //Listado peliculas
      const productionsContainer = container.querySelector(
        "#directorProductions-list",
      );
      for (const production of productions) {
        productionsContainer.insertAdjacentHTML(
          "beforeend",
          `
        <div class="col-6 col-sm-4 col-lg-3">
          <a data-title="${production.title}" href="#directorProductions-list" class="text-decoration-none">
            <div class="p-2 border rounded text-center small bg-light text-dark shadow-sm h-100">
              ${production.title}
            </div>      
          </a>
        </div>`,
        );
      }

      // Boton cerrar //NO FUNCIONA
      const closeBtn = doc.createElement("button");
      closeBtn.textContent = "Cerrar";
      closeBtn.classList.add("btn", "btn-primary", "m-2");

      closeBtn.addEventListener("click", () => {
        this.productionWindow.close();
      });
      container.append(closeBtn);
    } else {
      container = doc.createElement("div");
      container.classList.add("container", "mt-5", "mb-5");

      container.insertAdjacentHTML(
        "beforeend",
        `<div class="row d-flex justify-content-center">${message}</div>`,
      );
    }

    main.append(container);
    doc.body.scrollIntoView();
  }

  //Lista las producciones en el div categorias
  listProductions(productions, message) {
    //Limpiamos el contenedor principal
    this.categories.replaceChildren();
    this.random.replaceChildren();

    if (this.categories.children.length > 1) {
      this.categories.children[1].remove();
    }
    const container = document.createElement("div");
    container.id = "productions-list";
    container.className = "container my-3";

    const row = document.createElement("div");
    row.className = "row g-4";

    for (const production of productions) {
      const col = document.createElement("div");
      col.className = "col-md-6 col-lg-4";

      col.innerHTML = `
      <div class="card h-100 shadow-sm border-0 text-center">
        <div class="card-body d-flex flex-column justify-content-center p-4">
          <div class="icon-wrapper mb-3">
            <a data-title="${production.title}" href="#single-production">
              <img class="img-fluid" src="img/peli3.png" width="30%" alt="${production.title}">
            </a>
          </div>
          <h5 class="card-title fw-bold text-dark">${production.title}</h5>
          <p class="card-text text-muted small">${production.synopsis}</p>
        </div>
      </div>`;
      row.append(col);
    }
    container.append(row);
    this.categories.append(container);
  }

  //Lista 3 producciones aleatorias
  listRandomProductions(productions) {
    this.random.replaceChildren();

    const container = document.createElement("div");
    container.id = "rndmProductions-list";
    container.className = "container my-3";

    const randomProductions = [...productions]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const row = document.createElement("div");
    row.className = "row g-4";
    for (const production of randomProductions) {
      const col = document.createElement("div");
      col.className = "col-12 col-md-4";

      col.innerHTML = `
       <div class="card h-100 shadow-sm border-0">
        <div class="card-body text-center p-4">
          <a data-production="${production.title}" href="#detail">
          <img src="img/peli3.png" class="img-fluid mb-3 rounded" style="max-height: 200px;" alt="${production.title}">
          </a>
          <h5 class="card-title fw-bold">${production.title}</h5>
            <p class="card-text text-muted small">${production.synopsis}</p>
        </div>
      </div>`;
      row.append(col);
    }
    container.append(row);
    this.random.append(container);
  }

  //Menu cabecera Admin
  showAdminMenu() {
    const menuOption = document.createElement("li");
    menuOption.id = "menuOption.id";
    //Si ya esta creado se sale de la funcion, me daba problemas de duplicado si no lo hacia
    if (document.getElementById("menuOption.id")) return;
    menuOption.classList.add("nav-item");
    menuOption.classList.add("dropdown");
    menuOption.insertAdjacentHTML(
      "afterbegin",
      '<a class="nav-link dropdown-toggle" href="#" id="navServices" role="button" data-bs-toggle="dropdown" aria-expanded="false">	Adminitración</a>',
    );
    const suboptions = document.createElement("ul");
    suboptions.classList.add("dropdown-menu");
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="liNewProduction" class="dropdown-item" href="#new-category">Crear producción</a></li>',
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="liDelProduction" class="dropdown-item" href="#del-category">Eliminar producción</a></li>',
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="liAssignActor" class="dropdown-item" href="#new-product">Asignar actor</a></li>',
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="liDeassignActor" class="dropdown-item" href="#del-product">Desasignar actor</a></li>',
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="liAssignDirector" class="dropdown-item" href="#del-product">Asignar director</a></li>',
    );
    suboptions.insertAdjacentHTML(
      "beforeend",
      '<li><a id="liDeassignDirector" class="dropdown-item" href="#del-product">Desasignar director</a></li>',
    );
    menuOption.append(suboptions);
    this.menu.append(menuOption);
  }

  //Muestra el formulario de CREAR PRODUCCION
  showNewProductionForm(directors, actors, categories) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "new-production";

    //Desplegable de categorias
    let categoryOptions = "";

    for (const category of categories) {
      categoryOptions += `<option value= "${category.name}">
      ${category.name}
      </option>
      `;
    }

    //Desplegable de directores
    let directorOptions = "";

    for (const director of directors) {
      directorOptions += `<option value= "${director.name}">
      ${director.name} ${director.lastname1}
      </option>
      `;
    }

    //Desplegable actores
    let actorsOptions = "";

    for (const actor of actors) {
      actorsOptions += `<option value= "${actor.name}">
      ${actor.name} ${actor.lastname1}
      </option>
      `;
    }

    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Nueva produccion</h1>',
    );
    container.insertAdjacentHTML(
      "beforeend",
      `<form name="formNewProduction" role="form" class="row g-3" novalidate>

			<div class="col-md-6 mb-3">
      <input type="radio" id="movie" name="type" value="movie">
      <label for="html">Movie</label><br>
      <input type="radio" id="serie" name="type" value="serie">
      <label for="css">Serie</label><br>
      </div>

			<div class="col-md-6 mb-3">
				<label class="form-label" for="npTitle">Título *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-type"></i></span>
					<input type="text" class="form-control" id="npTitle" name="npTitle"
						placeholder="Título de la producción" value="" required>
					<div class="invalid-feedback">El título es obligatorio.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>

			<div class="col-md-6 mb-3">
				<label class="form-label" for="npPublicacion">Publicación *</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-file-image"></i></span>
					<input type="date" class="form-control" id="npPublicacion" name="npPublicacion" placeholder="Publicación"
						value="" required>
					<div class="invalid-feedback">La fecha de publicación no es válida.</div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
			<div class="col-md-12 mb-3">
				<label class="form-label" for="npNacionalidad">Nacionalidad</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="npNacionalidad" name="npNacionalidad" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>
      <div class="col-md-12 mb-3">
				<label class="form-label" for="npSinopsis">Sinopsis</label>
				<div class="input-group">
					<span class="input-group-text"><i class="bi bi-body-text"></i></span>
					<input type="text" class="form-control" id="npSinopsis" name="npSinopsis" value="">
					<div class="invalid-feedback"></div>
					<div class="valid-feedback">Correcto.</div>
				</div>
			</div>

      <select name="category" class="form-select">
      <option value="">Selecciona categoria</option>
      ${categoryOptions}
      </select>

      <select name="director" class="form-select">
      <option value="">Selecciona director</option>
      ${directorOptions}
      </select>

      <select name="actors" multiple class="form-select">
      <option value="">Selecciona actor</option>
      ${actorsOptions}
      </select>

			<div class="mb-12">
				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</div>
      
		</form>`,
    );

    this.main.append(container);
  }
  //Muestra modal de creacion de Produccion
  showNewProductionModal(done, prod, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Nueva Producción";

    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">
        La producción <strong>${prod.title}</strong> ha sido creada correctamente.
      </div>`,
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3">
        <i class="bi bi-exclamation-triangle"></i> 
        ${error.message}
      </div>`,
      );
    }
    messageModal.show();
    const listener = () => {
      if (done) {
        document.formNewProduction.reset();
      }

      document.formNewProduction.npTitle.focus(); // Mueve el foco aqui
    };

    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  //Formulario de borrar produccion
  showRemoveProductionForm(productions) {
    this.main.replaceChildren();
    if (this.categories.children.length > 1)
      this.categories.children[1].remove();

    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add("my-3");
    container.id = "remove-production";
    container.insertAdjacentHTML(
      "afterbegin",
      '<h1 class="display-5">Eliminar una produccion</h1>',
    );

    const row = document.createElement("div");
    row.classList.add("row");

    for (const production of productions) {
      row.insertAdjacentHTML(
        "beforeend",
        `<div class="col-lg-3 col-md-6">        
        <div class="cat-list-text">
          <a data-production="${production.title}" href="#category-list"><h3>${production.title}</h3></a>
					<div>${production.synopsis}</div>
        </div>
				<div><button class="btn btn-primary" data-production="${production.title}" type='button'>Eliminar</button></div>
    </div>`,
      );
    }
    container.append(row);
    this.main.append(container);
  }

  //Muestra el modal de validacion de borrar produccion
  showRemoveProductionModal(done, prod, error) {
    const messageModalContainer = document.getElementById("messageModal");
    const messageModal = new bootstrap.Modal("#messageModal");

    const title = document.getElementById("messageModalTitle");
    title.innerHTML = "Borrado de producción";
    const body = messageModalContainer.querySelector(".modal-body");
    body.replaceChildren();
    if (done) {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="p-3">La produccion <strong>${prod.title}</strong> ha sido eliminada correctamente.</div>`,
      );
    } else {
      body.insertAdjacentHTML(
        "afterbegin",
        `<div class="error text-danger p-3"><i class="bi bi-exclamation-triangle"></i> La produccion <strong>${prod.title}</strong> no se ha podido borrar.</div>`,
      );
    }
    messageModal.show();
    const listener = (event) => {
      if (done) {
        const removeProduction = document.getElementById("remove-production");
        const button = removeProduction.querySelector(
          `button.btn[data-production="${prod.title}"]`,
        );
        button.parentElement.parentElement.remove();
      }
    };
    messageModalContainer.addEventListener("hidden.bs.modal", listener, {
      once: true,
    });
  }

  //-----BINDS-----//
  //Bind enlaces inicio y logo
  bindInit(handler) {
    document.getElementById("init").addEventListener("click", (event) => {
      handler();
    });
    document.getElementById("logo").addEventListener("click", (event) => {
      handler();
    });
  }

  //Enlaza el manejador con elementos de la pagina.
  bindProductionsCategory(handler) {
    document.addEventListener("click", (event) => {
      const category = event.target.closest("[data-category]"); //REcoge los datos del dataset de categorias
      if (category) {
        event.preventDefault();
        handler(category.dataset.category);
      }
    });
  }

  //Enlaza con el hadler que muestra las categorias en el menu
  bindProductionsCategoryInMenu(handler) {
    document.addEventListener("click", (event) => {
      handler(event.target.dataset.category);
    });
  }

  //Enlaza con el hadler que muestra la card del actor
  bindShowActor(handler) {
    const actorsMenu = document.getElementById("actors-dropdown"); //Contendero de drpdown actores
    actorsMenu.addEventListener("click", (event) => {
      const actorName = event.target.dataset.actor; //Comprobamos si evento cliclado tiene atributo
      if (actorName) {
        //Si lo tiene
        event.preventDefault(); //Evita recarga de pagina
        handler(actorName); //Pasamos nombre del actor al controlado
      }
    });

    //Abre la card del actor desde la card de produccion
    const castingList = document.getElementById("actor-list");
    if (castingList) {
      const productionLinks = castingList.querySelectorAll("a");
      for (const link of productionLinks) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handler(event.currentTarget.dataset.actor);
        });
      }
    }
  }

  //Enlaza con el hadler que muestra la card del director
  bindShowDirector(handler) {
    const directorMenu = document.getElementById("directors-dropdown"); //Contendero de drpdown actores
    directorMenu.addEventListener("click", (event) => {
      const directorName = event.target.dataset.director; //Comprobamos si evento cliclado tiene atributo
      if (directorName) {
        //Si lo tiene
        event.preventDefault(); //Evita recarga de pagina
        handler(directorName); //Pasamos nombre del actor al controlado
      }
    });

    //Abre la card del actor desde la card de produccion
    const castingList = document.getElementById("director-list");
    if (castingList) {
      const productionLinks = castingList.querySelectorAll("a");
      for (const link of productionLinks) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handler(event.currentTarget.dataset.director);
        });
      }
    }
  }

  //Enlaza con el hadler que muestra la card de la produccion
  bindShowProduction(handler) {
    const productionList = document.getElementById("productions-list");
    if (productionList) {
      const links = productionList.querySelectorAll("a");
      for (const link of links) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handler(event.currentTarget.dataset.title);
        });
      }
    }
    //Abre la card de la produccion desde la card del actor
    const actorProductions = document.getElementById("actorProductions-list");
    if (actorProductions) {
      const actorLinks = actorProductions.querySelectorAll("a");
      for (const link of actorLinks) {
        link.addEventListener("click", (event) => {
          event.preventDefault();
          handler(event.currentTarget.dataset.title);
        });
      }
    }
  }

  //Enlaza el boton Abrir en nueva ventana con el handler.
  bindShowProductionInNewWindow(handler) {
    const btnNewWindow = document.getElementById("btn-newWindow");
    btnNewWindow.addEventListener("click", (event) => {
      event.preventDefault();
      const title = btnNewWindow.dataset.title;
      if (!this.productionWindow || this.productionWindow.closed) {
        this.productionWindow = window.open(
          "auxPage.html",
          "ProductionWindow",
          "width=800, height=600, top=250, left=250",
        );
        //Esperamos que se cargue el DOM de la nueva ventana
        this.productionWindow.onload = () => {
          handler(title);
        };
      } else {
        handler(title);
        this.productionWindow.focus();
      }
    });
  }

  //Enlaza el boton Abrir en nueva ventana con el handler.
  bindShowActorInNewWindow(handler) {
    const btnNewWindow = document.getElementById("btn-newWindowActor");
    if (!btnNewWindow) return;
    btnNewWindow.addEventListener("click", (event) => {
      event.preventDefault();
      const name = event.currentTarget.dataset.actor;
      console.log("ACTOR:", name);
      if (!this.productionWindow || this.productionWindow.closed) {
        this.productionWindow = window.open(
          "auxPage.html",
          "ProductionWindow",
          "width=800, height=600, top=250, left=250",
        );
        //Esperamos que se cargue el DOM de la nueva ventana
        this.productionWindow.onload = () => {
          handler(name);
        };
      } else {
        handler(name);
        this.productionWindow.focus();
      }
    });
  }

  bindShowDirectorInNewWindow(handler) {
    const btnNewWindow = document.getElementById("btn-newWindowDirector");
    if (!btnNewWindow) return;
    btnNewWindow.addEventListener("click", (event) => {
      event.preventDefault();
      const name = event.currentTarget.dataset.director;
      console.log("DIRECTOR:", name);
      if (!this.productionWindow || this.productionWindow.closed) {
        this.productionWindow = window.open(
          "auxPage.html",
          "ProductionWindow",
          "width=800, height=600, top=250, left=250",
        );
        //Esperamos que se cargue el DOM de la nueva ventana
        this.productionWindow.onload = () => {
          handler(name);
        };
      } else {
        handler(name);
        this.productionWindow.focus();
      }
    });
  }

  //Vinculo del enlace de Administracion con el manejador del formulario
  bindAdminMenu(hNewProduction, hRemoveProduction) {
    const newProductionLink = document.getElementById("liNewProduction");
    if (newProductionLink) {
      newProductionLink.addEventListener("click", (event) => {
        event.preventDefault();
        hNewProduction();
      });
    }
    const delProductionLink = document.getElementById("liDelProduction");
    if (delProductionLink) {
      delProductionLink.addEventListener("click", (event) => {
        event.preventDefault();
        hRemoveProduction();
      });
    }
  }

  //Enlaza la vista del formulario de nueva produccion con el handler
  bindNewProductionForm(handler) {
    newProductionValidation(handler);
  }

  //Enlaza la vista de borrado de producciones con el handler
  bindRemoveProductionForm(delHandler, getProductionHandler){
    const removeContainer = document.getElementById('remove-production');
    const buttons = removeContainer.getElementsByTagName('button');

    //A cada boton le asignamos un evento y recogemos el dataset de la produccion
    for(const button of buttons){
      button.addEventListener('click', (event) =>{
        delHandler(event.currentTarget.dataset.production);
      });
    }

    const productionLinks = removeContainer.querySelectorAll('a[data-production]');

    for(const link of productionLinks){
      link.addEventListener('click', (event) => {
        event.preventDefault();
        getProductionHandler(event.currentTarget.dataset.production);
      })
    }
  }

  //Bind del boton Cerrar del boton de la card
  bindCloseCard(handler) {
    const btnClose = document.getElementById("btn-close-card");

    if (btnClose) {
      btnClose.addEventListener("click", () => {
        const container = document.getElementById(
          "single-production-container",
        );
        container.replaceChildren(); // Borra la ficha
      });
    }
  }
}

export default VideoSystemView;
