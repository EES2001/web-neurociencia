<template>
  <div>
    <h2>Game Results</h2>
    <p>Red Team Average: {{ redAvg }}ms</p>
    <p>Blue Team Average: {{ blueAvg }}ms</p>
  </div>
</template>

<script>
export default {
  name: "ResultsView",
  props: ["redAvg", "blueAvg"],
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}
</style>
