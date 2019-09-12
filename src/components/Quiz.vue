<template>
    <div class="quiz-item">
      <h2>{{quiz.title}}</h2>
    </div>
</template>

<script>
export default {
    name: "quizItem",
    props: ["quiz"]
}
</script>

<style scoped>
h2 {
    font-family: cursive;
    font-size: 3em;
}
@media (max-width: 480px){
h2 {
  font-size: 2.1em;
}
}
</style>
