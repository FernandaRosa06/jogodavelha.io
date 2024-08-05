document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const startButton = document.getElementById('start-btn');
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    let currentPlayer = 'x';

    // Função para iniciar o jogo
    const startGame = () => {
        startScreen.classList.add('hidden');
        gameScreen.classList.remove('hidden');
        cells.forEach(cell => cell.addEventListener('click', handleClick));
    };

    // Função para verificar vitória
    const checkWin = () => {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombinations) {
            const [a, b, c] = combo;
            if (cells[a].classList.contains(currentPlayer) &&
                cells[b].classList.contains(currentPlayer) &&
                cells[c].classList.contains(currentPlayer)) {
                alert(`${currentPlayer === 'x' ? 'Grêmio' : 'Inter'} venceu!`);
                cells.forEach(cell => cell.removeEventListener('click', handleClick));
                return;
            }
        }

        if ([...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('o'))) {
            alert('Empate!');
        }
    };

    // Função para manipular o clique nas células
    const handleClick = (event) => {
        const cell = event.target;
        if (cell.classList.contains('x') || cell.classList.contains('o')) return;

        cell.classList.add(currentPlayer);
        checkWin();
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    };

    // Função para reiniciar o jogo
    const resetGame = () => {
        cells.forEach(cell => {
            cell.classList.remove('x', 'o');
            cell.addEventListener('click', handleClick);
        });
        currentPlayer = 'x';
    };

    // Inicialização dos eventos
    startButton.addEventListener('click', startGame);
    resetButton.addEventListener('click', resetGame);
});
