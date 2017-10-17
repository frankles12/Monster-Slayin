new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
        round: 1
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
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

        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                playerType: 'human',
                text: 'Player hits monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                playerType: 'human',
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
            this.appendCurrentRounds();
        },

        giveUp: function () {
            this.gameIsRunning = false;
        },

        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                playerType: 'monster',
                text: 'Monster hits player for ' + damage
            });
        },

        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min)
        },

        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;

                }
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