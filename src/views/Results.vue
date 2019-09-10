<template>
  <div class="results">
    <h1>This is an RESULTS page</h1>
    <QuizResults/>
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
      selectedQuiz: 'bestQuiz'
    }
  }
}
</script>