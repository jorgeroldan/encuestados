/*
 * Modelo
 */
var Modelo = function () {
  this.preguntas = [];
  this.ultimoId = 0;

  this.localStorage()

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.preguntasEliminadas = new Evento(this);
  this.preguntaEditada = new Evento(this);
};

Modelo.prototype = {
  obtenerUltimoId: function () {
    return this.ultimoId
  },
  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function (nombre, respuestas) {
    this.ultimoId = this.obtenerUltimoId() + 1;
    var nuevaPregunta = {
      'textoPregunta': nombre,
      'id': this.ultimoId,
      'cantidadPorRespuesta': respuestas
    };
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function () {
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    localStorage.setItem("ultimoId", JSON.stringify(this.ultimoId));
  },
  localStorage: function () {
    const ultimoId = JSON.parse(localStorage.getItem("ultimoId"));

    if (ultimoId >= 1) {
      this.ultimoId = ultimoId;
      this.preguntas = JSON.parse(localStorage.getItem("preguntas"));
    }
  },
  //se elimina una pregunta dado un id
  borrarPregunta: function (idPregunta) {
    for (let i = 0; i < this.preguntas.length; i++) {
      if (this.preguntas[i].id === idPregunta) {
        this.preguntas.splice(i, 1);
        this.guardar();
        this.preguntaEliminada.notificar();
        break;
      }
    };
  },
  borrarTodo: function() {
    this.preguntas = [];
    this.ultimoId = 0;
    this.guardar();
    this.preguntasEliminadas.notificar();
  },
  editarPregunta: function (id) {
    let preguntaAEditadar = this.preguntas.find(pregunta => pregunta.id === id);
    const edicionPregunta = prompt('Editar pregunta:')
    preguntaAEditadar.textoPregunta = edicionPregunta;
    this.preguntaEditada.notificar();    
  },
};