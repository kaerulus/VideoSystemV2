//input campo que validas, valid booleano.
function showFeedBack(input, valid, message) {
  const validClass = valid ? "is-valid" : "is-invalid"; //true, clase valida, false no valida
  //Busca el div.valid-feedback o invalid-feedback
  const messageDiv = valid
    ? input.parentElement.querySelector("div.valid-feedback")
    : input.parentElement.querySelector("div.invalid-feedback");

  //Oculta todos los mensajes
  for (const div of input.parentElement.getElementsByTagName("div")) {
    div.classList.remove("d-block");
  }
  //Muestra el mensaje correcto
  messageDiv.classList.remove("d-none");
  messageDiv.classList.add("d-block");
  //Limpia las clases del input
  input.classList.remove("is-valid");
  input.classList.remove("is-invalid");
  input.classList.add(validClass);
  if (message) {
    messageDiv.innerHTML = message;
  }
}

function defaultCheckElement(event) {
  this.value = this.value.trim();
  if (!this.checkValidity()) {
    showFeedBack(this, false);
  } else {
    showFeedBack(this, true);
  }
}

function newProductionValidation(handler) {
  const form = document.forms.formNewProduction;//De aqui sacamos los valores del formulario

  form.setAttribute("novalidate", true); //Evita la validacion automatica del navegador

  form.addEventListener("submit", function (event) {
    //se ejecuta cunado se envia formulario
    let isValid = true;
    let firstInvalidElement = null;
  
    //VAlLIDACIONES DE LOS VALORES DEL FORMULARIO
    //Si checkvalidity falla isValid pasa el input a la funcion showFeedBack y valid = false.

    //Validacion campo sinopsis
    this.npSinopsis.value = this.npSinopsis.value.trim();
    showFeedBack(this.npSinopsis, true);  

    //Validacion campo Nombre
    if (!this.npTitle.checkValidity()) {
      isValid = false;
      showFeedBack(this.npTitle, false);
      firstInvalidElement = this.npTitle;
    } else {
      showFeedBack(this.npTitle, true);
    }

    //Validacion campo Publicacion
    if (!this.npPublicacion.checkValidity()) {
      isValid = false;
      showFeedBack(this.npPublicacion, false);
      firstInvalidElement = this.npPublicacion;
    } else {
      //Si pasa lo guarda como true
      showFeedBack(this.npPublicacion, true);
    }

    //Validacion campo Nacionalidad
    if (!this.npNacionalidad.checkValidity()) {
      isValid = false;
      showFeedBack(this.npNacionalidad, false);
      firstInvalidElement = this.npNacionalidad;
    } else {
      showFeedBack(this.npNacionalidad, true);
    }    

    //Validacion campo Categoria
    if (!this.category.value) {
      isValid = false;
      showFeedBack(this.category, false);
      firstInvalidElement = this.category;
    }else {
      showFeedBack(this.category, true);
    }

    //VAlor del radio de  tipo de produccion
    const type = this.type.value;

    if (!this.director.value) {
      isValid = false;
      showFeedBack(this.director, false);
      firstInvalidElement = this.director;
    }else {
      showFeedBack(this.director, true);
    }    

    const selectedActors = Array.from(this.actors.selectedOptions);
    if (selectedActors.length === 0) {
      isValid = false;
      firstInvalidElement ??= this.actors;
    }

    //Si isValid es false vuelve el foco al elemento incorrecto
    if (!isValid) {
      firstInvalidElement.focus();
    } else {
      const actors = selectedActors.map(option => option.value); //Valores de los actores

      handler(
        this.npTitle.value,
        this.npNacionalidad.value,
        this.npPublicacion.value,
        this.npSinopsis.value,
        this.category.value,
        this.director.value,
        actors,
        type
      );
      
    }
    event.preventDefault();
    event.stopPropagation();
  });

  form.addEventListener("reset", function (event) {
    for (const div of this.querySelectorAll(
      "div.valid-feedback, div.invalid-feedback",
    )) {
      div.classList.remove("d-block");
      div.classList.add("d-none");
    }
    for (const input of this.querySelectorAll("input")) {
      input.classList.remove("is-valid");
      input.classList.remove("is-invalid");
    }
    this.npTitle.focus();
  });

  form.npTitle.addEventListener("change", defaultCheckElement);
  form.npNacionalidad.addEventListener("change", defaultCheckElement);
}

export { newProductionValidation };
