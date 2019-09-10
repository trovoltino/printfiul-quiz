<template>
  <div class="hello">
    <h2>There are your results...{{results}}</h2>
    
  </div>
</template>

<script>
export default {
  name: 'QuizResults',
  data() {
    return{
      results: 'dum as fuck',
      submittedAnswers: []
    }
  },
  methods: {
    submitAnswers() {

    }
  },
  created () {
    this.submittedAnswers = this.$route.params.answers;
    this.submitAnswers(this.quizId);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
