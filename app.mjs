import io from 'socket.io-client';

const socket = io('https://ees.com'); // Cambia esto al dominio que obtendrás de Vercel

document.addEventListener('DOMContentLoaded', () => {
    let currentScreen = 'codeEntry';
    let selectedTeam = null;
    let countdownNumber = null;

    const appDiv = document.getElementById('app');

    function render() {
        if (currentScreen === 'codeEntry') {
            appDiv.innerHTML = `
                <h1>Ingrese el código de acceso</h1>
                <input type="text" id="accessCode" placeholder="Código de acceso">
                <button id="nextButton">SIGUIENTE</button>
            `;
            document.getElementById('nextButton').addEventListener('click', () => {
                currentScreen = 'welcome';
                render();
            });
        } else if (currentScreen === 'welcome') {
            appDiv.innerHTML = `
                <h1>Bienvenido</h1>
                <button id="startButton">EMPECEMOS</button>
            `;
            document.getElementById('startButton').addEventListener('click', () => {
                currentScreen = 'teamSelection';
                render();
            });
        } else if (currentScreen === 'teamSelection') {
            appDiv.innerHTML = `
                <h1>ELIJA SU EQUIPO</h1>
                <button id="redTeamButton">EQUIPO ROJO</button>
                <button id="blueTeamButton">EQUIPO AZUL</button>
            `;
            document.getElementById('redTeamButton').addEventListener('click', () => {
                selectedTeam = 'red';
                socket.emit('joinTeam', { team: 'red' });
                currentScreen = 'countdown';
                render();
            });
            document.getElementById('blueTeamButton').addEventListener('click', () => {
                selectedTeam = 'blue';
                socket.emit('joinTeam', { team: 'blue' });
                currentScreen = 'countdown';
                render();
            });
        } else if (currentScreen === 'countdown') {
            appDiv.innerHTML = `<h1>Esperando a los demás jugadores...</h1>`;
            socket.emit('startGame');
        } else if (currentScreen === 'game') {
            appDiv.innerHTML = `
                <h1>${countdownNumber}</h1>
                <button id="responseButton" style="background-color: ${selectedTeam === 'red' ? 'red' : 'blue'};">Oprime cuando termines</button>
            `;
            const startTime = Date.now();
            document.getElementById('responseButton').addEventListener('click', () => {
                const responseTime = Date.now() - startTime;
                socket.emit('userResponse', { team: selectedTeam, time: responseTime });
                currentScreen = 'waiting';
                render();
            });
        } else if (currentScreen === 'waiting') {
            appDiv.innerHTML = `<h1>Esperando resultados...</h1>`;
        } else if (currentScreen === 'result') {
            appDiv.innerHTML = `
                <h1>Resultados</h1>
                <div id="chartContainer"></div>
                <button id="retryButton">INTENTA DE NUEVO</button>
            `;
            document.getElementById('retryButton').addEventListener('click', () => {
                socket.emit('resetGame');
                currentScreen = 'countdown';
                render();
            });
        }
    }

    render();

    socket.on('startCountdown', (number) => {
        countdownNumber = number;
        currentScreen = 'game';
        render();
    });

    socket.on('gameResult', (data) => {
        currentScreen = 'result';
        render();
        // Aquí deberías agregar el código para generar la gráfica de barras con los resultados.
    });
});
