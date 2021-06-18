import {INVALID_MOVE} from 'boardgame.io/core';

export const TicTacToe = {
    // setup: () => ({cells: Array(40).fill(null)}),
    setup: (ctx) => ({
        cells: Array(40).fill(null), playOrder: ctx.playOrder,
        playOrderPos: 0,
    }),


    moves: {
        clickCell: (G, ctx, id) => {
            // console.log("tomato");
            G.cells[id] = ctx.currentPlayer;
        },
        endTurn: () => {

        },
        eliminate: (G, ctx, playerIdToEliminate) => {
            // Find index of player to remove.
            // console.log(playerIdToEliminate);
            // G.playOrder.push(0);
            // console.log(G.playOrder);
            const index = G.playOrder.indexOf(playerIdToEliminate);

            // The move should be invalid if we can’t find the player to remove.
            // console.log("crash");
            // console.log(playerIdToEliminate);
            if (index < 0) return INVALID_MOVE;
            G.playOrder.splice(index, 1);

            // Decrement position if the eliminated position is lower in the order.
            if (index < G.playOrderPos) G.playOrderPos--;
        }
    },
    turn: {
        // moveLimit: 1,
        //Added
        onEnd: (G) => {
            G.playOrderPos = (G.playOrderPos + 1) % G.playOrder.length;
        },
        order: {
            // Calculate the first player.
            first: (G, ctx) => {
                const playerID = G.playOrder[G.playOrderPos];
                return ctx.playOrder.indexOf(playerID);
            },

            // Calculate the next player.
            next: (G, ctx) => {
                // Look up the next player’s ID from the custom order.
                const playerID = G.playOrder[G.playOrderPos];
                // Find the position of the ID in boardgame.io’s play order.
                return ctx.playOrder.indexOf(playerID);
            },
        },
        moveLimit: 1,
    },
    clickCell: (G, ctx, id) => {
        if (G.cells[id] !== null) {
            return INVALID_MOVE;
        }

        G.cells[id] = ctx.currentPlayer;
    },
    endIf: (G, ctx) => {
        if (IsVictory(G.cells)) {
            return {winner: ctx.currentPlayer};
        }
        if (IsDraw(G.cells)) {
            return {draw: true};
        }
    },

};

// Return true if `cells` is in a winning configuration.
function IsVictory(cells) {
    const positions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];

    const isRowComplete = row => {
        const symbols = row.map(i => cells[i]);
        return symbols.every(i => i !== null && i === symbols[0]);
    };

    return positions.map(isRowComplete).some(i => i === true);
}

// Return true if all `cells` are occupied.
function IsDraw(cells) {
    return cells.filter(c => c === null).length === 0;
}

