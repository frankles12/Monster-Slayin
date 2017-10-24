new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        playerMana: 100,
        gameIsRunning: false,
        turns: [],
        round: 1,
        monsters: [
            {
                name: 'DOG',
                img: '/images/dog.gif',
                health: 60,
                mana: 60,
                originalHealth: 60,
                originalMana: 60,
            },
            {
                name: 'EMERALD',
                img: '/images/emerald.gif',
                health: 80,
                mana: 80,
                originalHealth: 80,
                originalMana: 80,
            },
            {
                name: 'CHAR',
                img: '/images/char.gif',
                health: 100,
                mana: 100,
                originalHealth: 100,
                originalMana: 100,
            }
        ],
        currentMonsterIdx: 0
    },
    computed: {
        currentMonster: function() {
            return this.monsters[this.currentMonsterIdx];
        }
    },
    methods: {
        startNewGame: function () {
            window.location.href = 'index.html';
            this.startGame();
        },
        startGame: function () {
            for(var m in this.monsters) {
                this.monsters[m].health = this.monsters[m].originalHealth;
                this.monsters[m].mana = this.monsters[m].originalMana;
            }
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.playerMana = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.reduceMonsterHealth(damage);
            this.turns.unshift({
                playerType: 'human',
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.appendCurrentRounds();
        },
        reduceMonsterHealth: function(damage) {
            this.monsters[this.currentMonsterIdx].health -= damage;
        },
        specialAttack: function () {
            if (this.playerMana >= 25) {
                this.playerMana -= 25;
                var damage = this.calculateDamage(10, 20);
                this.reduceMonsterHealth(damage);
                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player hits ' + this.currentMonster.name + ' hard for ' + damage
                });
                if (this.checkWin()) {
                    return;
                }
            }
            else {
                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player doesn\'t have enough mana!'
                });
            }
            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        heal: function () {

            if (this.playerMana - 10 >= 0) {
                this.playerMana -= 10;

                var heal = this.calculateDamage(5, 20);
                if (this.playerHealth <= 90) {
                    this.playerHealth += heal;
                } else {
                    this.playerHealth = 100;
                }
                if (this.playerMana - 10 >= 0) {
                    this.playerMana -= 10;
                }

                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player heals for ' + heal
                });
            } else {
                this.turns.unshift({
                    playerType: 'human',
                    text: 'Player doesn\'t have enough mana!'
                });
            }

            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        giveUp: function () {
            this.gameIsRunning = false;
            this.startNewGame();
        },

        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                playerType: 'monster',
                text: this.currentMonster.name + ' hits player for ' + damage
            });
        },

        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },

        checkWin: function () {
            if (this.currentMonster.health <= 0) {
                if (this.currentMonsterIdx === this.monsters.length -1) {
                    window.location.href = 'victory.html';
                    return true;
                } else {
                    this.playerHealth = 100;
                    this.playerMana = 100;
                    this.currentMonsterIdx++;
                    return true;
                }
            } else if (this.playerHealth <= 0) {
                window.location.href = 'defeat.html';
                return true;
            }
            return false;
        },

        appendCurrentRounds: function () {
            this.turns.unshift({
                playerType: 'log',
                text: 'Round: #' + this.round
            });
            this.round++;
        }
    }
});