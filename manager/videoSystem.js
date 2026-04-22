import {
  BaseException,
  InvalidAccessConstructorException,
  InvalidValueException,
  EmptyValueException,
} from "./exceptions.js";

import {
  Person,
  Category,
  Resource,
  Production,
  Movie,
  Serie,
  User,
  Coordinate,
} from "./entities.js";

//Excepciones
class VideoSystemException extends BaseException {
  constructor(message = "Error: VideoSystem Exception") {
    super(message);
    this.name = this.constructor.name;
  }
}

class ObjectVideoSystemException extends VideoSystemException {
  constructor(param) {
    super(`Error: El parámetro ${param} no puede estar vacío`);
    this.param = param;
    this.name = "ObjectVideoSystemException";
  }
}

//Excepciones Category
class CategoryExistsException extends VideoSystemException {
  constructor(message = "Error: La categoría ya existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class CategoryNotExistsException extends VideoSystemException {
  constructor(message = "Error: La categoría no existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class ProductionExistsInCategory extends VideoSystemException {
  constructor(message = "Error: La produccion ya existe en la categoría") {
    super(message);
    this.name = this.constructor.name;
  }
}

//Excepciones User
class UserExitsException extends VideoSystemException {
  constructor(message = "Error: Es usuario ya existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class UserNotExitsException extends VideoSystemException {
  constructor(message = "Error: Es usuario no existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class UserMailExitsException extends VideoSystemException {
  constructor(message = "Error: El mail ya existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

//Excepciones producciones
class ProductionExistsException extends VideoSystemException {
  constructor(message = "Error: La produccion ya existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class ProductionNotExistsException extends VideoSystemException {
  constructor(message = "Error: La produccion no existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class ProductionExistsInPersonException extends VideoSystemException {
  constructor(message = "Error: La produccion ya existe en esta Persona") {
    super(message);
    this.name = this.constructor.name;
  }
}

//Excepciones actores
class PersonExistsException extends VideoSystemException {
  constructor(message = "Error: La persona ya existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

class PersonNotExistsException extends VideoSystemException {
  constructor(message = "Error: La persona no existe") {
    super(message);
    this.name = this.constructor.name;
  }
}

//Estructura Singleton
const VideoSystem = (function () {
  let instanciated;

  //Objeto VideoSystem detro del metodo anonimo
  class VideoSystem {
    #persons = new Map();
    #categories = new Map();
    #resources = new Map();
    #productions = new Map();
    #movies = new Map();
    #series = new Map();
    #users = new Map();
    #coordinates = new Map();
    #actors = new Map();
    #directors = new Map();

    constructor() {
      if (!new.target) throw new InvalidAccessConstructorException();

      //Getter Categories. Devuelve iterador que permite recorrer categorias
      Object.defineProperty(this, "categories", {
        enumerable: true,
        get() {
          const values = this.#categories.values();
          return {
            *[Symbol.iterator]() {
              for (const storedCategory of values) {
                yield storedCategory.category;
              }
            },
          };
        },
      });

      //Getter User. Devuelve iterador que permite recorrer users
      Object.defineProperty(this, "users", {
        enumerable: true,
        get() {
          const values = this.#users.values();
          return {
            *[Symbol.iterator]() {
              for (const storedUsers of values) {
                yield storedUsers;
              }
            },
          };
        },
      });

      //Getter Productions. Devuelve iterador que permite recorrer las producciones
      Object.defineProperty(this, "productions", {
        enumerable: true,
        get() {
          const values = this.#productions.values();
          return {
            *[Symbol.iterator]() {
              for (const storedProductions of values) {
                yield storedProductions;
              }
            },
          };
        },
      });

      //Getter actors. Devuelve iterador que permite recorrer los actores
      Object.defineProperty(this, "actors", {
        enumerable: true,
        get() {
          const values = this.#actors.values();
          return {
            *[Symbol.iterator]() {
              for (const storedActors of values) {
                yield storedActors;
              }
            },
          };
        },
      });

      //Getter actors. Devuelve iterador que permite recorrer los actores
      Object.defineProperty(this, "directors", {
        enumerable: true,
        get() {
          const values = this.#directors.values();
          return {
            *[Symbol.iterator]() {
              for (const storedDirectors of values) {
                yield storedDirectors;
              }
            },
          };
        },
      });
    }

    //Añade una neva categoría
    //Devuelve nº de elementos
    addCategory(...categories) {
      for (const category of categories) {
        if (!(category instanceof Category)) {
          //Categoria no puede ser null o no ser un objeto Category
          throw new ObjectVideoSystemException("category");
        }
        if (!this.#categories.has(category.name)) {
          //Si no existe la categoria la añadimos
          this.#categories.set(category.name, {
            category,
            productions: new Map(),
          });
        } else {
          //Si ya existe
          throw new CategoryExistsException();
        }
      }
      return this.#categories.size;
    }

    //Añade un usuario y devuelve el número de elementos
    addUser(...users) {
      for (const user of users) {
        if (!(user instanceof User)) {
          throw new ObjectVideoSystemException(user.username, user.email);
        }
        if (this.#users.has(user.username)) {
          //Si ya existe el username en el map
          throw new UserExitsException();
        }
        for (const u of this.#users.values()) {
          if (u.email === user.email) {
            throw new UserMailExitsException();
          }
        }
        this.#users.set(user.username, user);
      }
      return this.#users.size;
    }

    //Añade una nueva produccion, devuelve numero de elementos
    //Recibe objeto produccion
    addProduction(...productions) {
      for (const production of productions) {
        if (!(production instanceof Production)) {
          throw new ObjectVideoSystemException();
        }
        if (!this.#productions.has(production.title)) {
          //Si no existe la creamos
          this.#productions.set(production.title, production);
        } else {
          throw new ProductionExistsException(); //Salta excepcion si existe
        }
      }
      return this.#productions.size;
    }

    //Añade un actor
    addActor(...actors) {
      for (const actor of actors) {
        if (!(actor instanceof Person)) {
          throw new ObjectVideoSystemException();
        }
        if (!this.#actors.has(actor.name)) {
          this.#actors.set(actor.name, {
            actor,
            productions: new Map(),
          });
        } else {
          throw new PersonExistsException();
        }
      }
      return this.#actors.size;
    }

    //Añade un actor
    addDirector(...directors) {
      for (const director of directors) {
        if (!(director instanceof Person)) {
          throw new ObjectVideoSystemException();
        }
        if (!this.#directors.has(director.name)) {
          this.#directors.set(director.name, {
            director,
            productions: new Map(),
          });
        } else {
          throw new PersonExistsException();
        }
      }
      return this.#directors.size;
    }

    //Asigna una o mas producciones a una categoria
    //Si objeto Category o Production no existen se añaden al sistema
    assignCategory(category, ...productions) {
      if (!(category instanceof Category)) {
        throw new ObjectVideoSystemException();
      }
      if (!this.#categories.has(category.name)) {
        //Si la categoria no existe se añade

        this.addCategory(category);
      }
      const storedCategory = this.#categories.get(category.name); //Obtenemos categoria.name del map

      //recorremos map de productions y comprobamos que sea objeto Production
      for (const production of productions) {
        if (!(production instanceof Production)) {
          throw new ObjectVideoSystemException();
        }
        if (!this.#productions.has(production.title)) {
          //Si la production no existe la crea
          this.addProduction(production);
        }
        const storedProduction = this.#productions.get(production.title); //Obtenemos production.name del map

        //Si no existe la production en la categoría, la creamos
        if (!storedCategory.productions.has(production.title)) {
          storedCategory.productions.set(production.title, storedProduction);
        } else {
          throw new ProductionExistsException();
        }
      }
      return storedCategory.productions.size;
    }

    //Asigna una o mas producciones a un director
    //Si el objeto Director u objeto Production no existen lo crea
    assignDirector(director, ...productions) {
      if ((!director) instanceof Person) {
        throw new ObjectVideoSystemException();
      }
      if (!this.#directors.has(director.name)) {
        //Si no existe el Director lo creamos
        this.addDirector(director);
      }
      const storedDirector = this.#directors.get(director.name); //Guardamos director

      //recorremos map de producciones
      for (const production of productions) {
        if ((!production) instanceof Production) {
          throw new ObjectVideoSystemException();
        }
        if (!this.#productions.has(production.title)) {
          //Si no existe la produccion la creamos
          this.addProduction(production);
        }
        const storedProduction = this.#productions.get(production.title); //Guardamos produccion
        if (!storedDirector.productions.has(production.title)) {
          //Si no existe ya la produccion en el director, la creamos
          storedDirector.productions.set(production.title, storedProduction);
        } else {
          throw new ProductionExistsInPersonException();
        }
      }
      return storedDirector.productions.size;
    }

    //Asigna una o mas producciones a un actor
    //Si el objeto Director u objeto Production no existen lo crea
    assignActor(actor, ...productions) {
      if ((!actor) instanceof Person) {
        throw new ObjectVideoSystemException();
      }
      if (!this.#actors.has(actor.name)) {
        //Si no existe el Actor lo creamos
        this.addActor(actor);
      }
      const storedActor = this.#actors.get(actor.name); //Guardamos director

      //recorremos map de producciones
      for (const production of productions) {
        if ((!production) instanceof Production) {
          throw new ObjectVideoSystemException();
        }
        if (!this.#productions.has(production.title)) {
          //Si no existe la produccion la creamos
          this.addProduction(production);
        }
        const storedProduction = this.#productions.get(production.title); //Guardamos produccion
        if (!storedActor.productions.has(production.title)) {
          //Si no existe ya la produccion en el director, la creamos
          storedActor.productions.set(production.title, storedProduction);
        } else {
          throw new ProductionExistsInPersonException();
        }
      }
      return storedActor.productions.size;
    }

    //Elimina una categoria
    //Al eliminar sus productos pasan a la de por defecto
    removeCategory(...categories) {
      for (const category of categories) {
        if (!(category instanceof Category)) {
          //Categoria no puede ser null o no ser un objeto Category
          throw new ObjectVideoSystemException();
        }
        if (this.#categories.has(category.name)) {
          //Si la categoría existe la borramos
          this.#categories.delete(category.name);
        } else {
          //Si no existe la categoría lanzamos excepcion
          throw new CategoryNotExistsException();
        }
      }
      return this.#categories.size;
    }

    //Elimina usuario y Devuelve numero de elementos
    removeUser(...users) {
      for (const user of users) {
        if (!(user instanceof User)) {
          throw new ObjectVideoSystemException(user.username, user.email);
        }
        if (this.#users.has(user.username)) {
          this.#users.delete(user.username);
        } else {
          //En caso de no existir el usr
          throw new UserNotExitsException();
        }
      }
      return this.#users.size;
    }

    //Elimina una produccion y devuelve numero de elementos
    removeProduction(...productions) {
      for (const production of productions) {
        if (!(production instanceof Production)) {
          throw new ObjectVideoSystemException(production.title);
        }
        if (this.#productions.has(production.title)) {
          this.#productions.delete(production.title);
        } else {
          //En caso de no existir la produccion
          throw new ProductionNotExistsException();
        }
      }
      return this.#productions.size;
    }

    //Elimina un actor y devuelve numero de elementos
    removeActor(...actors) {
      for (const actor of actors) {
        if (!(actor instanceof Person)) {
          throw new ObjectVideoSystemException(actor.name);
        }
        if (this.#actors.has(actor.name)) {
          this.#actors.delete(actor.name);
        } else {
          //En caso de no existir actor
          throw new PersonNotExistsException();
        }
      }
      return this.#actors.size;
    }

    //Elimina un director y devuelve numero de elementos
    removeDirector(...directors) {
      for (const director of directors) {
        if (!(director instanceof Person)) {
          throw new ObjectVideoSystemException(director.name);
        }
        if (this.#directors.has(director.name)) {
          this.#directors.delete(director.name);
        } else {
          //En caso de no existir actor
          throw new PersonNotExistsException();
        }
      }
      return this.#directors.size;
    }

    //deasigna una o mas producciones de una categoria
    deassignCategory(category, ...productions) {
      if (!(category instanceof Category)) {
        throw new ObjectVideoSystemException();
      }
      //Comprobamos si no existe la categoria
      if (!this.#categories.has(category.name)) {
        throw new CategoryNotExistsException();
      }

      const storedCategory = this.#categories.get(category.name);
      //Recorremos productions
      for (const production of productions) {
        if (!(production instanceof Production)) {
          throw new ObjectVideoSystemException();
        }
        const storedProduction = this.#productions.get(production.title);
        //Si no encontramos la produccion en la categoria salta excepcion
        if (!storedCategory.productions.has(production.title)) {
          throw new ProductionNotExistsException();
        } else {
          storedCategory.productions.delete(production.title);
        }
      }
      return storedCategory.productions.size;
    }

    //Deasigna una o mas producciones de un Director
    deassignDirector(director, ...productions) {
      if (!(director instanceof Person)) {
        throw new ObjectVideoSystemException();
      }
      //Comprobamos si no existe el director
      if (!this.#directors.has(director.name)) {
        throw new PersonNotExistsException();
      }
      //Guardamos director
      const storedDirector = this.#directors.get(director.name);
      //Recorremos productions
      for (const production of productions) {
        if (!(production instanceof Production)) {
          throw new ObjectVideoSystemException();
        }
        const storedProduction = this.#productions.get(production.title);
        //Si no encontramos la produccion en el director salta excepcion
        if (!storedDirector.productions.has(production.title)) {
          throw new ProductionNotExistsException();
        } else {
          storedDirector.productions.delete(production.title);
        }
      }
      return storedDirector.productions.size;
    }

    //Deasigna una o mas producciones de un Director
    deassignActor(actor, ...productions) {
      if (!(actor instanceof Person)) {
        throw new ObjectVideoSystemException();
      }
      //Comprobamos si no existe el director
      if (!this.#actors.has(actor.name)) {
        throw new PersonNotExistsException();
      }
      //Guardamos director
      const storedActor = this.#actors.get(actor.name);
      //Recorremos productions
      for (const production of productions) {
        if (!(production instanceof Production)) {
          throw new ObjectVideoSystemException();
        }
        const storedProduction = this.#productions.get(production.title);
        //Si no encontramos la produccion en el director salta excepcion
        if (!storedActor.productions.has(production.title)) {
          throw new ProductionNotExistsException();
        } else {
          storedActor.productions.delete(production.title);
        }
      }
      return storedActor.productions.size;
    }

    //Devuelve iterador con la relacion de los actores del reparto y una produccion.
    *getCast(production) {
      if (!(production instanceof Production)) {
        throw new ObjectVideoSystemException();
      }
      //Almacenamos la produccion
      const storedProduction = this.#productions.get(production.title);
      //Si no existe lanza excepcion
      if (!storedProduction) {
        throw new ProductionNotExistsException();
      }
      const actors = this.#actors.values(); //Valores del mapa de actores
      //Iteramos sobre los actores
      for (const actorEntry of actors) {        
        if (actorEntry.productions.has(storedProduction.title)) {
          yield actorEntry.actor;
        }
      }
    }

    //Itereador con las producciones de un director
    *getProductionsDirector(director) {
      if (!(director instanceof Person)) {
        throw new ObjectVideoSystemException();
      }
      if (this.#directors.has(director.name)) {
        //Si existe el director lo almacenamos
        const storedDirector = this.#directors.get(director.name);
        const values = storedDirector.productions.values(); //Map de los directores
        for (const production of values) {
          yield production;
        }
      } else {
        throw new PersonNotExistsException();
      }
    }

    //Iterador con las producciones de un actor
    *getProductionsActor(actor) {
      if (!(actor instanceof Person)) {
        throw new ObjectVideoSystemException();
      }
      if (this.#actors.has(actor.name)) {
        const storedActor = this.#actors.get(actor.name);
        const values = storedActor.productions.values();
        for (const production of values) {
          yield production;
        }
      } else {
        throw new PersonNotExistsException();
      }
    }

    //Iterador con las producciones de una categoria
    *getProductionsCategory(category) {
      if (!(category instanceof Category)) {
        throw new ObjectVideoSystemException();
      }
      if (this.#categories.has(category.name)) {
        const storedCategory = this.#categories.get(category.name);
        const values = storedCategory.productions.values();
        for (const production of values) {
          yield production;
        }
      } else {
        throw new CategoryNotExistsException();
      }
    }

    //Devuelve objeto Person si esta registrado, si no lo crea.
    createPerson(name, lastname1, lastname2, born, picture) {
      //Si no se pasan los argumentos lanza excepcion
      if ((!name, !lastname1)) {
        throw new VideoSystemException();
      }
      const key = `${name}|${lastname1}`; //Clave pra buscar en el map
      //Si existe esa clave en el map y la devuelve
      if (this.#persons.has(key)) {
        return this.#persons(key);
      }
      //Guardamos la persona en una constante
      const person = new Person(name, lastname1, lastname2, born, picture);
      this.#persons.set(key, person); // Metemos en el map con la clave

      return person; //Devuelve la persona
    }

    //Crea una produccion, si ya existe la devuelve y si no hay que diferenciar entre movie o serie
    createProduction(
      type,
      title,
      nationality,
      publication,
      synopsis,
      image,
      seasons,
    ) {
      //Si no se pasan los argumentos lanza excepcion
      if ((!title, !publication)) {
        throw new VideoSystemException();
      }
      //Si existe la produccion la devuelve
      if (this.#productions.has(title)) {
        return this.#productions(title);
      }

      let productionType; //Variable que guarda si es movie o serie

      //Hacemos switch para diferenciar entre peli o serie
      switch (type.toLowerCase()) {
        case "movie":
          productionType = new Movie(
            title,
            nationality,
            publication,
            synopsis,
            image,
          );
          break;

        case "serie":
          productionType = new Serie(
            title,
            nationality,
            publication,
            synopsis,
            image,
            seasons,
          );
          break;

        default:
          throw new ObjectVideoSystemException();
      }
      this.#productions.set(title, productionType);

      return productionType; //Devuelve la produccion
    }

    //Devuelve un objeto User si está creado y si no lo crea, pero no lo añade al manager
    createUser(username, email, password) {
      //Si no se pasan los argumentos lanza excepcion
      if ((!username, !email, !password)) {
        throw new VideoSystemException();
      }
      const key = `${username}|${email} | ${password}`; //Clave pra buscar en el map
      //Si existe esa clave en el map y la devuelve
      if (this.#users.has(key)) {
        return this.#users(key);
      }
      //Guardamos el user en una constante
      const user = new User(username, email, password);
      this.#users.set(key, user); // Metemos en el map con la clave

      return user; //Devuelve el user
    }

    //Devuelve un objeto User si está creado y si no lo crea, pero no lo añade al manager
    createCategory(name, description) {
      //Si no se pasan los argumentos lanza excepcion
      if (!name) {
        throw new VideoSystemException();
      }
      const key = `${name}`; //Clave pra buscar en el map
      //Si existe esa clave en el map la devuelve
      if (this.#categories.has(key)) {
        return this.#categories(key);
      }
      //Guardamos la categoria en una constante
      const category = new Category(name, description);
      this.#categories.set(key, category); // Metemos en el map con la clave

      return category; //Devuelve la categoria
    }

    //Obtiene iterador que cumple criterio concreto en base a funcion callback
    findProductions() {
      //no he sido capaz de hacerla
    }

    
  }

  //Creamos objeto y lo devolvemos congelado
  function init() {
    const videoSystem = new VideoSystem();
    Object.freeze(videoSystem);
    return videoSystem;
  }
  return {
    getInstance() {
      if (!instanciated) {
        instanciated = init();
      }
      return instanciated;
    },
  };
})();

export default VideoSystem;
export {
  Person,
  Category,
  Resource,
  Production,
  Movie,
  Serie,
  User,
  Coordinate,
} from "./entities.js";
