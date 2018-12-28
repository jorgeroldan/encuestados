/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  if (localStorage.preguntas) {
    this.preguntas = JSON.parse(localStorage.getItem('preguntas'));    
  }

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {
    let id = [0];
    this.preguntas.forEach(e => id.push(e.id));
    
    let max = id.reduce((valorInicial, valorActual) => {
          if (valorActual > valorInicial) {
            return valorActual;
          }else{
            return valorInicial;
          }
        });
      return max;
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },

  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem("preguntas", JSON.stringify(this.preguntas));
    localStorage.setItem("ultimoId", JSON.stringify(this.ultimoId));
  },

};
