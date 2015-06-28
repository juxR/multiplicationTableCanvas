;
(function() {
  var canvas = document.getElementById("canvas");
  var context = canvas.getContext('2d');
  var canvasWidth = canvas.width;
  var canvasHeight = canvas.height;
  var canvasX = canvas.offsetWidth;
  var canvasY = canvas.offsetHeight;
  var strokeSize = 1;
  var animationFrame;

  //Options
  var optionsForm = document.getElementsByClassName("js-form")[0];
  var stopButton = document.getElementsByClassName("js-stopAnimation")[0];

  context.translate(canvasWidth / 2, canvasHeight / 2);
  context.rotate(-Math.PI / 2);
  context.translate(-canvasWidth / 2, -canvasHeight / 2);

  var xBaseValue;
  var yBaseValue;
  var iIncrement = 0.01;
  var algorithm = function(n, k) {
    var diameter = Math.min(canvasWidth, canvasHeight) / 2;
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.strokeStyle = "rgb(40, 40, 40)";
    context.fillStyle = "rgba(140, 40, 40, 1)";
    context.lineWidth = strokeSize;
    context.beginPath();
    for (var i = 0; i < n; i++) {
      context.moveTo(canvasX / 2 + diameter * Math.cos(2 * i * (1 / n) * Math.PI), canvasY / 2 + diameter * Math.sin(2 * i * (1 / n) * Math.PI));
      context.lineTo(canvasX / 2 + diameter * Math.cos(2 * i * k * (1 / n) * Math.PI), canvasY / 2 + diameter * Math.sin(2 * i * k * (1 / n) * Math.PI));
    }
    context.stroke();

    // if (taillePoints > 0) { //on trace les n points si on veut qu'ils soient affichés
    // for (var i = 0; i < n; i++) {
    //   context.moveTo(canvasX / 2 + rayonEtoile * Math.cos(2 * i * (1 / n) * Math.PI) + taillePoints, canvasY / 2 + rayonEtoile * Math.sin(2 * i * (1 / n) * Math.PI));
    //   context.arc(canvasX / 2 + rayonEtoile * Math.cos(2 * i * (1 / n) * Math.PI), canvasY / 2 + rayonEtoile * Math.sin(2 * i * (1 / n) * Math.PI), taillePoints, 0, 2 * Math.PI);
    //   context.fill();
    // }
    // }

  }

  var run = function() {

    algorithm(xBaseValue, yBaseValue); //100, 98
    yBaseValue += iIncrement;
  }

  var activeOptions = function(e) {
    e.preventDefault();
    getOptions();
    Animator.remove(animationFrame);
    animationFrame = Animator.add(run);
  }

  var getOptions = function() {
    xBaseValue = parseInt(document.getElementsByClassName("js-numberOfPoints")[0].value);
    yBaseValue = parseInt(document.getElementsByClassName("js-multiplicationNumber")[0].value);

  }
  var stopAnimation = function(e) {
    e.preventDefault();
    if (Animator.isRunning()) {
      this.innerHTML = 'Restart';
      Animator.stop();
    } else {
      this.innerHTML = 'Stop';
      Animator.start();
    }
  }

  optionsForm.addEventListener('submit', activeOptions);
  stopButton.addEventListener('click', stopAnimation);


  getOptions();
  animationFrame = Animator.add(run);

})();
