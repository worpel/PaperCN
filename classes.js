class Person{
    constructor(name, hp){
    this._name = name;
    this._health = hp;
    this._alive = true;
    this._moves = {"hit":["fighting",10], "kick":["fighting",15],"strike":["fighting",25], "ink":["water",8], "watergun":["water",11], "waterbomb":["water",15], "fireball":["fire", 11], "firearrow": ["fire", 17], "bullet": ["fire", 30]};
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

    attack(attackType){
        return this._moves[attackType];
    }
}

//global flag for turns
playerTurn = true;
//global flag for battle state
inBattle = true;

//creates player and computer characters
const player = new Person("Harry", 150);
const computer = new Person("DrEvil", 150);

// reduces defenders health by value corresponding to attackers attackType
function dealDamage (attacker,defender, attackType){
    const damage = attacker.attack(attackType);
    defender.takeHit(damage);
}

//called on button click to make player's turn
function fight(attackType){
    if (playerTurn && inBattle){
        //players turn
        dealDamage(player, computer, attackType);
        playerTurn = false;
        if (!computer.alive){
            inBattle = false;
        }
        printHealth(computer, "healthBar2");
        console.log(computer.health)
    }
    if (!playerTurn && inBattle){
        //computers turn
        computerMove = "fireball";
        dealDamage(computer, player, computerMove);
        playerTurn = true;
        if (!player.alive){
            inBattle = false;
        }
        printHealth(player, "healthBar1");
    }
}

function printHealth(person, textId){
    playerHealth = document.getElementById(textId);
    playerHealth.innerHTML = (person.health);

    //playerText = document.getElementById(textId);
    //playerText.innerHTML = (textId + " --> health: " + person.health + " alive: " + person.alive);

}
printHealth(player, "healthBar1")
printHealth(computer, "healthBar2")
//printText(player,"player1");
//printText(computer, "player2");
console.log(player.alive);