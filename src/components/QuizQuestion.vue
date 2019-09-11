<template>
  <div class="question">
    {{question.title}}
  </div>
</template>

<script>
export default {
  name: "questionC",
  props: ["question"]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.question{
  text-align: center;
  text-transform: uppercase;
  font-weight: bold;
  border-radius: 80px;
  padding: 1.2em 2em;
  outline:none;
  font-size: 1em;
  color:white;
  background: $button-color;
}
</style>

