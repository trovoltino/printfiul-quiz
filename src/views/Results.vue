<template>
  <div class="results">
    <QuizResults v-on:finalResults="quizResults" />
    <button class="repeat">repeat the quiz</button>
  </div>
</template>

<script>
// @ is an alias to /src
import QuizResults from '@/components/QuizResults.vue'

export default {
  name: 'results',
  components: {
    QuizResults
  },
  data() {
    return{
      quizResults: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.results {
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.repeat {
    text-align: center;
    text-transform: uppercase;
    border:solid 2px $button-hover;
    font-weight: bold;
    border-radius: 2em;
    margin-top: 2em;
    padding: 1em 2.6em;
    outline:none;
    font-size: 1.3em;
    color:$button-hover;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      color: #494949;
      border-radius: 1em;
      border-color: #494949;
      transition: all 0.3s ease 0s;
    }
  }
</style>