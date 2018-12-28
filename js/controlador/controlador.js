/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      this.modelo.agregarPregunta(pregunta, respuestas);
      this.modelo.guardar();
  },
  borrarPregunta: function(id){
    this.modelo.borrarPregunta(id);  
    this.modelo.guardar();    
  },
};
