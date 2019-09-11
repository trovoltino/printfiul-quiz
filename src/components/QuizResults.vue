<template>
  <div class="hello">
    <h2>There are your results...{{results}}</h2>
    {{submittedAnswers}}
  </div>
</template>

<script>

import axios from 'axios'

export default {
  name: 'QuizResults',
  data() {
    return{
      results: 'dum as fuck',
      submittedAnswers: [],
      resultRequest: '',
      quizId: 0
    }
  },
  methods: {
    submitAnswers() {
     
      const requestParams = this.generateRequestParams(this.submittedAnswers);

      return new Promise((resolve, reject) => {
        // const generateRequestParams ='';&answers%5B%5D=14030&answers%5B%5D=41132
        //&answers%5B%5D=123988&answers%5B%5D=550690&answers%5B%5D=9198261&answers%5B%5D=17639891
        // const options = { quizId:"141", answers: ["14030", "41132", "123988", "550690", "9198261", "17639891"], };
        // axios.get(`https://printful.com/test-quiz.php?action=submit`, options)
        axios.get(`https://printful.com/test-quiz.php?action=submit&quizId=${this.quizId}${requestParams}`)
        .then(res => {
          this.submittedAnswers = res.data;
          resolve();
        })
        .then(err => {
          console.log(err)
          reject();
        })
      })
    },

    // Generates request string depending on answers
    generateRequestParams(answers) {
      let resultRequest = '';
      const prefix = '&answers%5B%5D=';
      answers.forEach(answer => {
        resultRequest = [...resultRequest, prefix, `${answer}`];
      });
      return resultRequest.join('');
    }
  },
  created () {
    this.submittedAnswers = this.$route.params.answers;
    this.quizId = this.$route.params.quizId;
    submitAnswers();
    //this.submitAnswers(this.quizId);
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
