<template>
  <div class="results">
    <QuizResults v-on:finalResults="quizResults" />
    <button @click="navigateToHome()" class="repeat">repeat the quiz</button>
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
  },
  methods: {
    navigateToHome() {
      this.$router.replace({name:'home'});
    }
  },
  mounted() {
    if(this.$route.params.submittedAnswers === 'undefined'){
      this.$router.replace({name:'home'});
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
    border:solid 4px white;
    font-weight: bold;
    border-radius: 2em;
    margin-top: 2em;
    padding: 1em 2.6em;
    outline:none;
    font-size: 1.3em;
    color: white;
    background: none;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    &:hover {
      color: $button-color;
      border-radius: 1em;
      border-color: $button-color;
      transition: all 0.3s ease 0s;
    }
  }
</style>