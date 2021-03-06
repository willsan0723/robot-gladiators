// Game States
// "WIN" - Player robot has defeated all enemy robots
//    * Fight all enemy robots
//    * Defeat each enemy robot
// "LOSE" - Player robot's health is zero or less


// function to generate a random numeric value
var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);

  return value;
};

var fightOrSkip = function() {
  // ask user if they'd like to fight or skip using  function
  var promptFight = window.prompt('Would you like FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
  promptFight = promptFight.toLowerCase();
  // Enter the conditional recursive function call here!
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  // if yes (true), leave fight
  
  if (promptFight === "skip") {
    // confirm user wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      // subtract money from playerMoney for skipping
      playerInfo.money = playerInfo.money - 10;
      return true;
    }
  }

  if (promptFight === "fight") {
    return false;
  }
  else {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }
  
}


var fight = function(enemy) {
  // Alert users that they are starting the round
  while (enemy.health  > 0 && playerInfo.health > 0)  {
    //ask user if they'd like to fight or run
if (fightOrSkip()){
break;
  }



  //generate a random damage value based on player's attack power
  var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

  enemy.health = Math.max(0, enemy.health - damage);
  console.log(
    playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
  );

  // check enemy's health
  if (enemy.health <= 0) {
    window.alert(enemy.name + " has died!");
  // award player money for winning
    playerInfo.money = playerInfo.money +20;
    //leave while() loop since enemy is dead
    break;
  } else {
    window.alert(enemy.name + " still has " + enemy.health + " health left.");
  }

  // remove player's health by subtracting the amount set in the enemy.attack variable
  var damage = randomNumber(enemy.attack - 3, enemy.attack);

  playerInfo.health = Math.max(0, playerInfo.health - damage);
  console.log(
    enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
  );

  // check player's health
  if (playerInfo.health <= 0) {
    window.alert(playerInfo.name + " has died!");
  } else {
    window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
  }  
}
};

// function to start a new game
var startGame = function() {
  // reset player stats
  playerInfo.reset();

  for (var i = 0; i < enemyInfo.length; i++) {
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));

      var pickedEnemyObj = enemyInfo[i];

      pickedEnemyObj.health = randomNumber(40, 60);

      fight(pickedEnemyObj);
      // if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        // ask if user wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        //if yes, take them to the store() function
        if (storeConfirm) {
        shop();
        }
      }
    }
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  endGame();
};
// function to end the entire game
var endGame = function() {
  // if player is still alive, player wins!
  window.alert("The game has now ended. Let's see how you did!");
  var highScore = localStorage.getItem("highScore");
  if (highScore === null) {
    highScore = 0;
  }
  if (playerInfo.money > highScore) {
    // Set new high score object to localStorage
      localStorage.setItem("highScore", playerInfo.money);
    // Set new player robot's name object into localStorage
      localStorage.setItem("name", playerInfo.name);
    // Send player the message that they beat the high score
      alert("You have set the new high score!");
}
else {
  alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
}

  var playAgainConfirm = window.confirm("Would you like to play again?");

  if (playAgainConfirm) {
    // restart the game
    startGame();
  } 
  else {
  window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

var shop = function() {
  // ask player what they'd like to do
  var shopOptionPrompt = window.prompt(
    "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE."
  );
  shopOptionPrompt = parseInt(shopOptionPrompt);
  // use switch to carry out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();  
      break;
    case 2:
      playerInfo.upgradeAttack();  
      break;
    case 3:
      window.alert("Leaving the store.");
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};
var getPlayerName = function() {
  var name = "";  
// ***************************************
// ADD LOOP HERE WITH PROMPT AND CONDITION
// ***************************************
while (name === "" || name === null) {
  name = prompt("What is your robot's name?");
}
console.log("Your robot's name is " + name);
return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    } 
    else {
      window.alert("You don't have enough money!");
    }
  }
}; 


var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10, 14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();