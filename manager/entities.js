import {
  BaseException,
  InvalidValueException,
  EmptyValueException,
  InvalidAccessConstructorException,
  AbstractClassException,
} from "./exceptions.js";

//Clase Person
class Person {
  //Atributos privados
  #name;
  #lastname1;
  #lastname2;
  #born;
  #picture;

  //Constructor de la clase
  constructor(name, lastname1, lastname2 = "", born, picture = "") {
    //Control de excepciones
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!name) throw new EmptyValueException();
    if (!lastname1) throw new EmptyValueException();    
    if (!born) throw new EmptyValueException();

    this.#name = name;
    this.#lastname1 = lastname1;
    this.#lastname2 = lastname2;
    this.#born = born;
    this.#picture = picture;
  }

  //Getter y Setters
  get name() {
    return this.#name;
  }

  set name(valor) {
    if (!valor) throw new EmptyValueException("name");
    this.#name = valor;
  }

  get lastname1() {
    return this.#lastname1;
  }

  set lastname1(valor) {
    if (!valor) throw new EmptyValueException("lastname1");
    this.#lastname1 = valor;
  }

  get lastname2() {
    return this.#lastname2;
  }

  set lastname2(valor) {
    if (!valor) throw new EmptyValueException("lastname2");
    this.#lastname2 = valor;
  }

  get born() {
    return this.#born;
  }

  set born(valor) {
    if (!valor) throw new EmptyValueException("born");
    this.#born = valor;
  }

  get picture() {
    return this.#picture;
  }

  set picture(valor) {
    if (!valor) throw new EmptyValueException("picture");
    this.#picture = valor;
  }

  toString() {
    return (
      this.#name +
      " " +
      this.#lastname1 +
      " " +
      this.#lastname2 +
      " " +
      this.#born +
      " " +
      this.#picture
    );
  }
}

//Podemos crear la estructura de categorias
class Category {
  #name;
  #description;

  constructor(name, description) {
    //Control expcemciones
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!name) throw new EmptyValueException("name");
    if (!description) throw new EmptyValueException("description");

    this.#name = name;
    this.#description = description;
  }

  //Getter y setter
  get name() {
    return this.#name;
  }

  set name(valor) {
    if (!valor) throw new EmptyValueException("name");
    this.#name = valor;
  }

  get description() {
    return this.#description;
  }

  set description(valor) {
    if (!valor) throw new EmptyValueException("description");
    this.#description = valor;
  }

  toString() {
    return this.#name + " " + this.#description;
  }
}

//Clase Resource
class Resource {
  #duration;
  #link;

  constructor(duration, link) {
    //Control expcemciones
    if (!new.target) throw new InvalidAccessConstructorException();
    if (!duration) throw new EmptyValueException("duration");
    if (!link) throw new EmptyValueException("link");
  }

  //Getter y setter
  get duration() {
    return this.#duration;
  }

  set duration(valor) {
    if (!valor) throw new EmptyValueException("duration");
    this.#duration = valor;
  }

  get link() {
    return this.#link;
  }

  set link(valor) {
    if (!valor) throw new EmptyValueException("link");
    this.#link = valor;
  }

  toString() {
    return this.#duration + " " + this.#link;
  }
}

//Clase Production, clase padre de Movie y Serie. OBJETO ABSTRACTO
class Production {
  #title;
  #nationality;
  #publication;
  #synopsis;
  #image;

  constructor(title, nationality, publication, synopsis, image = "") {
    //Control excepciones
    if (!new.target) throw new InvalidAccessConstructorException();
    if (new.target === Production)
      throw new AbstractClassException("Production");
    if (!title) throw new EmptyValueException("title");
    if (!publication) throw new EmptyValueException("title");

    this.#title = title;
    this.#nationality = nationality;
    this.#publication = publication;
    this.#synopsis = synopsis;
    this.#image = image;
  }

  get title() {
    return this.#title;
  }

  set title(valor) {
    if (!valor) throw new EmptyValueException("title");
    this.#title = valor;
  }

  get nationality() {
    return this.#nationality;
  }

  set nationality(valor) {
    if (!valor) throw new EmptyValueException("nationality");
    this.#nationality = valor;
  }

  get publication() {
    return this.#publication;
  }

  set publication(valor) {
    if (!valor) throw new EmptyValueException("publication");
    this.#publication = valor;
  }

  get synopsis() {
    return this.#synopsis;
  }

  set synopsis(valor) {
    if (!valor) throw new EmptyValueException("synopsis");
    this.#synopsis = valor;
  }

  get image() {
    return this.#image;
  }

  set image(valor) {
    if (!valor) throw new EmptyValueException("image");
    this.#image = valor;
  }

  toString() {
    return (
      this.#title +
      " " +
      this.#nationality +
      " " +
      this.#publication +
      " " +
      this.#synopsis +
      " " +
      this.#image
    );
  }
}

//Clase Movie. Hereda de Production
class Movie extends Production {
  #resource;
  #locations = []; //Array con diferentes localizaciones

  constructor(
    title = "",
    nationality = "",
    publication = new Date(),
    synopsis = "",
    image = "",
    resource = "",
    locations = [],
  ) {
    if (!new.target) throw new InvalidAccessConstructorException(); //Se invoca con el operador new
    //Lamada al constructor del padre
    super(title, nationality, publication, synopsis, image);

    //Control excepciones
    if (!new.target) throw new InvalidAccessConstructorException();

    //Atributos privados
    this.#resource = resource;
    this.#locations = locations;
  }

  //Getter y setter
  get resource() {
    return this.#resource;
  }

  set resource(valor) {
    this.#resource = valor;
  }

  get locations() {
    return this.#locations;
  }

  set locations(valor) {
    this.#locations = valor;
  }

  toString() {
    return this.#resource + " " + this.#locations;
  }
}

//Clase Serie. Hereda de Production
class Serie extends Production {
  #resources = [];
  #locations = []; //Array con diferentes localizaciones
  #seasons;

  constructor(
    title = "",
    nationality = "",
    publication = new Date(),
    synopsis = "",
    image = "",
    resources = [],
    locations = [],
    seasons = 0,
  ) {
    if (!new.target) throw new InvalidAccessConstructorException(); //Se invoca con el operador new
    //Lamada al constructor del padre
    super(title, nationality, publication, synopsis, image);

    //Atributos privados
    this.#resources = resources;
    this.#locations = locations;
    this.#seasons = seasons;
  }

  //Getter y setter
  get resources() {
    return this.#resources;
  }

  set resources(valor) {
    this.#resources = valor;
  }

  get locations() {
    return this.#locations;
  }

  set locations(valor) {
    this.#locations = valor;
  }

  get seasons() {
    return this.#seasons;
  }

  set seasons(valor) {
    this.#seasons = valor;
  }

  toString() {
    return this.#resources + " " + this.#locations + " " + this.#seasons;
  }
}

//Clase User. Ususario de sistema
class User {
  #username;
  #email;
  #password;

  constructor(username, email, password) {
    if (!new.target) throw new InvalidAccessConstructorException(); //Se invoca con el operador new
    //Validacion datos
    if (!username) throw new EmptyValueException();
    if (!email) throw new EmptyValueException();
    if (!password) throw new EmptyValueException();

    //Atributos privados
    this.#username = username;
    this.#email = email;
    this.#password = password;
  }

  //Getter y setter
  get username() {
    return this.#username;
  }

  set username(valor) {
    if (!valor) throw new EmptyValueException("username");
    this.#username = valor;
  }

  get email() {
    return this.#email;
  }

  set email(valor) {
    if (!valor) throw new EmptyValueException("email");
    this.#email = valor;
  }

  get password() {
    return this.#password;
  }

  set password(valor) {
    if (!valor) throw new EmptyValueException("password");
    this.#password = valor;
  }

  toString() {
    return this.#username + " " + this.#email + " " + this.#password;
  }
}

//Clase Coordinate. Coordenadas para localizar una ubicacion
class Coordinate {
  #latitude;
  #longitude;

  constructor(latitude, longitude) {
    if (!new.target) throw new InvalidAccessConstructorException(); //Se invoca con el operador new
    //Validacion datos
    if (!latitude) throw new EmptyValueException();
    if (!longitude) throw new EmptyValueException();

    //Atributos privados
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  //Getter y setter
  get latitude() {
    return this.#latitude;
  }

  set latitude(valor) {
    if (!valor) throw new EmptyValueException("latitude");
    this.#latitude = valor;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(valor) {
    if (!valor) throw new EmptyValueException("longitude");
    this.#longitude = longitude;
  }

  toString() {
    return this.#latitude + " " + this.#longitude;
  }
}

export {
  Person,
  Category,
  Resource,
  Production,
  Movie,
  Serie,
  User,
  Coordinate,
};
