export class BaseException extends Error{
    constructor (message = "Mensaje por defecto"){
        super(message);
        this.name = this.constructor.name;
    }
}

export class InvalidAccessConstructorException extends BaseException{
    constructor(){
        super("Constructor no puede ser llamado como una funcion")
    }
}

export class EmptyValueException extends BaseException{
    constructor(param){
        super(`Error: El parámetro ${param} no puede estar vacío`);
        this.param = this.param;
    }
}

export class InvalidValueException extends BaseException{
    constructor (param, value){
        super(`Error: El parámetro ${param} tiene un valor no válido. (${param}: ${value})`);
        this.param = param;
        this.value = value;
    }
}

// Excepción personalizada para clases abstractas.
export class AbstractClassException extends BaseException {
  constructor(className, fileName, lineNumber) {
    super(`Error: La clase  ${className} es abstract.`, fileName, lineNumber);
    this.className = className;
    this.name = 'AbstractClassException';
  }
}
