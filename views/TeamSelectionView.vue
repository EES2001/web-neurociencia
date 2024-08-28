<template>
  <div>
    <h2>Select Your Team</h2>
    <button @click="selectTeam('red')">Red Team</button>
    <button @click="selectTeam('blue')">Blue Team</button>
  </div>
</template>

<script>
export default {
  name: "TeamSelectionView",
  methods: {
    selectTeam(team) {
      this.$emit("teamSelected", team);
      this.$router.push("/game");
    },
  },
};
</script>

<style scoped>
button {
  margin: 10px;
  padding: 10px;
  background-color: #ddd;
}
</style>
