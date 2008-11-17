/*
 * Canvas example
 * Free-hand drawing
 */

var NONE = 0;
var DRAW = 1;

var DrawLine = {
  x : function (evt) {
    return evt.clientX - this.cxt.canvas.offsetLeft;
  },
  
  y : function (evt) {
    return evt.clientY - this.cxt.canvas.offsetTop;
  },
  
  onmousedown : function(evt) {
    this.state = DRAW;
    this.cxt.beginPath();
    this.cxt.moveTo(this.x(evt), this.y(evt));
  },

  onmousemove : function (evt) {
    if (this.state == DRAW) {
      this.cxt.lineTo(this.x(evt), this.y(evt));
      this.cxt.stroke();
    }
  },

  onmouseup : function (evt) {
    this.state = NONE;
    this.cxt.closePath();
  }
};

function draw() {
  var canvas = document.getElementById('cv');
  canvas.height = 400;
  canvas.width = 600;
  var liner = {
    __proto__ : DrawLine,
    state : NONE,
    cxt : canvas.getContext('2d')
  };
  var reg = function (what, evt_name) {
    what[evt_name] = function (evt) { liner[evt_name](evt); };
  };
  reg(canvas, 'onmousedown');
  reg(canvas, 'onmousemove');
  reg(canvas, 'onmouseup');
}
