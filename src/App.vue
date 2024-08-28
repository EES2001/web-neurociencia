<template>
  <div id="app">
    <h1>Brain to Brain</h1>

    <div class="teams">
      <div class="team red">
        <h2>Red Team</h2>
        <ul>
          <li v-for="(member, index) in redTeam" :key="index">
            ID: {{ member.id }} | Time: {{ member.time || "Waiting..." }}
          </li>
        </ul>
      </div>
      <div class="team blue">
        <h2>Blue Team</h2>
        <ul>
          <li v-for="(member, index) in blueTeam" :key="index">
            ID: {{ member.id }} | Time: {{ member.time || "Waiting..." }}
          </li>
        </ul>
      </div>
    </div>

    <div class="controls">
      <button @click="joinTeam('red')">Join Red Team</button>
      <button @click="joinTeam('blue')">Join Blue Team</button>
      <button @click="startGame">Start Game</button>
      <button @click="resetGame">Reset Game</button>
    </div>

    <div class="results" v-if="gameResult">
      <h2>Game Results</h2>
      <p>Red Team Average Time: {{ gameResult.redAvg }} ms</p>
      <p>Blue Team Average Time: {{ gameResult.blueAvg }} ms</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      redTeam: [],
      blueTeam: [],
      gameResult: null,
    };
  },
  methods: {
    joinTeam(team) {
      this.$socket.emit("joinTeam", { team });
    },
    startGame() {
      this.$socket.emit("startGame");
    },
    resetGame() {
      this.$socket.emit("resetGame");
      this.redTeam = [];
      this.blueTeam = [];
      this.gameResult = null;
    },
  },
  mounted() {
    this.$socket.on("updateTeams", (teamsData) => {
      this.redTeam = teamsData.redTeam;
      this.blueTeam = teamsData.blueTeam;
    });

    this.$socket.on("gameResult", (result) => {
      this.gameResult = result;
    });

    this.$socket.on("resetGame", () => {
      this.redTeam = [];
      this.blueTeam = [];
      this.gameResult = null;
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.teams {
  display: flex;
  justify-content: space-around;
}

.team {
  width: 45%;
  border: 1px solid #ccc;
  padding: 10px;
}

.red {
  background-color: #ffdddd;
}

.blue {
  background-color: #ddddff;
}

.controls {
  margin: 20px 0;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
}

.results {
  margin-top: 20px;
}
</style>
