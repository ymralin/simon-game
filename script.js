$(document).on("keypress", start);

var level = 0;
var sequence = [];
var inputSequence = [];

function start(){
    level = 0;
    sequence = [];
    inputSequence = [];
    $(".btn").off();
    $(".btn").on("click", getClick);
    $(document).off();
    setTimeout(addSequence, 700);
}

function addSequence(){
    level++;
    inputSequence=[];
    $("h1").text("Level " + level);
    let newRandom = Math.ceil(Math.random()*4);
    let newTarget = "";
    switch (newRandom) {
        case 1:
            newTarget = "green";
            break;
        case 2:
            newTarget = "red";
            break;
        case 3:
            newTarget = "yellow";
            break;
        case 4:
            newTarget = "blue";
            break;        
    }
    sequence.push(newTarget);
    setTimeout(function(){animateButton(newTarget)}, 700);
}

function animateButton(color){
    clicked(color);
    $("#" + color).addClass("pressed");
    setTimeout(function(){$("#" + color).removeClass("pressed")}, 100);
}

function getClick(){
    inputSequence.push(this.id);
    checkClick();
    animateButton(this.id);
}

function clicked(button){
    soundEffect = new Audio("./sounds/" + button + ".mp3");
    soundEffect.play();
}

function checkClick(){
    for(i=0;i<inputSequence.length;i++){
        if(inputSequence[i]!=sequence[i]){
            failed();
        }
    }
    if(compareLists(inputSequence, sequence)){
        setTimeout(addSequence, 0);
    }
}

function compareLists(l1,l2){
    if(l1.length!=l2.length){
        return(false);
    }
    for(i=0;i<l1.length;i++){
        if(l1[i]!=l2[i]){
            return(false);
        }
    }
    return(true);
}

function failed(){
    $(".btn").off();
    $(".btn").on("click", gameOver);
    gameOver();
    $(document).on("keypress", start);
}

function gameOver(){
    var sfx = new Audio("./sounds/wrong.mp3");
    sfx.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over")}, 100);
}