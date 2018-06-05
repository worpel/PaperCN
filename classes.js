class Person{
    constructor(name, hp, resistance, moveList){
    this._name = name;
    this._health = hp;
    this._resistance = resistance
    this._alive = true;
    // {move:[elementaryType, damage]} 0 = fighting, 1= water 2 = fire.0 beats 1 beats 2 beats 0.
    this._
    }

    get resistance(){
        return this._resistance;
    }

    get name(){
        return this._name;
    }

    get health(){
        return this._health;
    }

    get alive(){
        return this._alive;
    }

    get moves(){
        return this._moves;
    }

    set health(newHealth){
        this._health = newHealth;
    }

    set alive(aliveness){
        this._alive = aliveness;
    }

    takeHit(damage){
        this._health -= damage;
        if (this._health <= 0){
            this._health = 0;
            this._alive = false;
        }
    }
}

//global flag for turns
playerTurn = true;
//global flag for battle state
inBattle = true;
//global player image
playerImg = document.getElementById('playerimg');
//global computer image
computerImg = document.getElementById('computerimg');
//global death image 
deathImg = src = "./img/death.png";
//global move types
moves = {"hit":[0,10], "kick":[0,15],"strike":[0,25], "ink":[1,8], "watergun":[1,11], "waterbomb":[1,15], "fireball":[2, 11], "firearrow": [2, 17], "bullet": [2, 30]};


//creates player and computer characters
const player = new Person("Harry", 150, [0.5, 1, 2], ["hit","ink", "bullet"]);
const computer = new Person("DrEvil", 150, [1, 0.2, 5], ["strike","ink", "bullet"]);

//

// reduces defenders health by value corresponding to attackers attackType
function dealDamage (attacker,defender, attackType){
    //base damage
    const attack = moves[attackType];
    //with resistances
    const netDamage = attack[1]*defender.resistance[attack[0]];
    defender.takeHit(netDamage);
}

//called on button click to make player's turn
function fight(attackType){
    if (playerTurn && inBattle){
        //players turn
        dealDamage(player, computer, attackType);
        playerTurn = false;
        if (!computer.alive){
            inBattle = false;
            die(computer);
        }
        printHealth(computer, "healthBar2");
        console.log(computer.health)
    }
    if (!playerTurn && inBattle){
        //computers turn
        computerMove = "fireball";

    setTimeout(function() {
            dealDamage(computer, player, computerMove);
        playerTurn = true;
        if (!player.alive){
            inBattle = false;
            die(player);
        }
        printHealth(player, "healthBar1");
    }, 700)
    }
}

function printHealth(person, textId){
    playerHealth = document.getElementById(textId);
    playerHealth.innerHTML = (person.health);
}

function die(character){
    return character == player ? playerImg.src = deathImg : computerImg.src = deathImg;
}

    //playerText = document.getElementById(textId);
    //playerText.innerHTML = (textId + " --> health: " + person.health + " alive: " + person.alive);


printHealth(player, "healthBar1")
printHealth(computer, "healthBar2")
//printText(player,"player1");
//printText(computer, "player2");
console.log(player.alive);