// //////////////////////////////////// loading play:
var boy = document.getElementById("boy");
var deadsnd = new Audio("die.mp3");

function playdie(){

  deadsnd.play();

}

idleImageNumber = 1;
idleAnimationeNumber = 0;
var backgroundImageposition = 0;
var moveBackgroundAnimationId = 0;
var score = 0;
var jumped = false;

function idleAnimation() {
  idleImageNumber = idleImageNumber + 1;

  if (idleImageNumber == 11) {
    idleImageNumber = 1;
  }
  boy.src = "images/Idle (" + idleImageNumber + ").png";
}

function idleAnimationstart() {
  idleAnimationeNumber = setInterval(idleAnimation, 200);

}
///////////////////////////////////////////////////////// running play:
runImageNumber = 1;
runAnimationeNumber = 0;
function runAnimation() {
  // console.log(boy.x);
  // console.log(boy.x);

  runImageNumber = runImageNumber + 1;
  if (runImageNumber == 11) {
    runImageNumber = 1;
  }                
  boy.src = "images/Run ("+runImageNumber +").png";
  setInterval(function () { boy.style.marginLeft = "200px", 500 })

}

function runAnimationstart() {
  clearInterval(idleAnimationeNumber);
  runAnimationeNumber = setInterval(runAnimation, 100);

}
// /////////////////////////////////////////////////////////////////// jumping character (boy):
jumbImageNumber = 1;
jumpAnimationNumber = 0;
function jumpAnimation() {

  jumbImageNumber = jumbImageNumber + 1;
  if (jumbImageNumber <= 6) {
    boymarginTop = 347;

    boymarginTop = boymarginTop - 150;
    boy.style.marginTop = boymarginTop + "px";
  }
  if (jumbImageNumber >= 7) {
    boymarginTop = 347;

    boymarginTop = boymarginTop + 60;
    jumped = false;
    boy.style.marginTop = boymarginTop + "px";
  }



  if (jumbImageNumber == 11
    
    ) {

    jumbImageNumber = 1;
    clearInterval(jumpAnimationNumber);
    jumpAnimationNumber = 0;

    runImageNumber = 0;
    runAnimationstart();
  }
  boy.src = "images/JumpAttack (" + jumbImageNumber + ").png";

}
function jumpAnimationstart() {
  clearInterval(idleAnimationeNumber);
  runImageNumber = 0;
  clearInterval(runAnimationeNumber);
  jumpAnimationNumber = setInterval(jumpAnimation, 200);

}
//////////////////////////////////////////////////////////////  //  start games:

var entered = 0;
function keycheck(event) {

  var keyCode = event.which;
  if (keyCode == 13) {
    if (runAnimationeNumber == 0) {
      runAnimationstart();
      entered = 1;
    }
  }
  if (moveBackgroundAnimationId == 0) {
    moveBackgroundAnimationId = setInterval(moveBackground, 100)
  }
  if (boxAnimationId == 0) {
    boxAnimationId = setInterval(boxAnimation, 100);
  }
  //////////////////////////////////////////////////////  // space=jumb:

  if (keyCode == 32) {
    if (jumpAnimationNumber == 0) {
      jumped = true;
      jumpAnimationstart();
    }
  }
  if (moveBackgroundAnimationId == 0) {
    moveBackgroundAnimationId = setInterval(moveBackground, 100)
  }
  if (boxAnimationId == 0) {
    boxAnimationId = setInterval(boxAnimation, 100);
  }
}

function moveBackground() {
  backgroundImageposition += 2;
  document.getElementById("background").style.cssText = "background-position:" + backgroundImageposition + "%;";
  score = score + 1;
  document.getElementById("score").innerHTML = score;
  if (score == 1000) {



  }
}
boxMarginleft = 1540;
////////////////////////////////////////////////////  enemy:

function createBoxes() {
  
  var enemy = setInterval(function () {
    
    var mymargin = 1200;
    for (var i = 0; i < 10; i++) {
      var box = document.createElement("div");
      box.className = "box";
      if (entered == 1) {
        setInterval(function () {
          box.style.marginLeft = `${mymargin}px`; mymargin -= 10;
          document.getElementById("background").appendChild(box);
          
          if(box.style.marginLeft == boy.style.marginLeft && jumped==false){
            clearInterval(enemy)
            clearInterval(boxAnimationId);
            clearInterval(runAnimationeNumber);
            runAnimationeNumber=-1;
            clearInterval(jumpAnimationNumber);
            jumpAnimationNumber=-1;
            clearInterval(moveBackgroundAnimationId);
            moveBackgroundAnimationId=-1;
            setInterval(boyDeadAnimation,100);
            boyDeadAnimation();
            playdie();
            setTimeout(function()
            {
              alert("You lose And Your Score Is = "+score) //console.log("hello")
              location.reload();

            },3000);
          
          }
        }, 500)

      }
    
      box.style.marginLeft = boxMarginleft + "px";
      box.id = "box" + 1

      if (i < 5) {
        boxMarginleft = boxMarginleft + 2000;
      }
      if (i >= 5) {
        boxMarginleft = boxMarginleft + 1000;
      }
      

    }
  }, 4000)


}
var boxAnimationId = 0;
function boxAnimation() {
  for (var i = 0; i < 10; i++) {
    var box = document.getElementById("box" + 1);
    box.log(box.event);
    var currentMarginleft = getComputedStyle(box).marginLeft;
    var newMarginleft = currentMarginleft - 20;
    box.style.marginLeft = newMarginleft + "px";
    if (newMarginleft>-110&& newMarginleft<=100){
      if(boymarginTop>300){
        
        boyDeadAnimationNumber=setInterval(boyDeadAnimation,100);

      }
    }
  }
}
deadImageNumber=1;
boyDeadAnimationNumber=0;
function boyDeadAnimation()
{
  deadImageNumber=deadImageNumber+1;
  if(deadImageNumber==11){
    deadImageNumber=10;
  }
  boy.src="images/Dead ("+deadImageNumber+").png";

}
