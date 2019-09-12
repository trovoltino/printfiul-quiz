<template>
  <div class="quiz-results">
    <div v-if="this.submittedAnswers" class="authorized">
      <ul class="score-board">
        <li>correct</li>
        <li class="score">{{results.correct}} - {{results.total}}</li>
        <li class="quiz">total</li>
      </ul>
      <div class="results-message">
        <h2 v-if="successIndex>0.8">wow <b>{{userName}}</b> you really do know this stuff, great work</h2>
        <h2 v-else-if="successIndex<0.4"><b>{{userName}}</b> your results where... well, you might want to read on the subject</h2>
        <h2 v-else><b>{{userName}}</b> your results where... nothing special</h2>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'
import { isNumber } from 'util';

export default {
  name: 'QuizResults',
  data() {
    return{
      results: '',
      submittedAnswers: [],
      resultRequest: '',
      quizId: 0,
      successIndex: 0,
      userName: ''
    }
  },
  methods: {
    submitAnswers() {
      const requestParams = this.generateRequestParams(this.submittedAnswers);
      return new Promise((resolve, reject) => {
        axios.get(`https://printful.com/test-quiz.php?action=submit&quizId=${this.quizId}${requestParams}`)
        .then(res => {
          this.results = res.data;
          this.calculateSuccessIndex(this.results.correct, this.results.total);
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
      if (answers) {
        answers.forEach(answer => {
        resultRequest = [...resultRequest, prefix, `${answer}`];
      });

      return resultRequest.join('');
      }
      
    },
    // Calculates how successfull was test
    calculateSuccessIndex(correct, total) {
      if(isNumber(correct) && isNumber(correct)) {
        this.successIndex = correct/total;
      }
    }
  },
  created () {
    this.submittedAnswers = this.$route.params.answers;
    this.quizId = this.$route.params.quizId;
    this.userName = this.$route.params.userName;
    this.submitAnswers();
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Days+One);
b {
  color: $button-color;
  text-transform: uppercase;
}
.score-board{
  font-family: 'Days One', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding:0;
  margin: 1.6em auto;
  position: relative;
  width: 14em;
  height: 1.6em;
  font-size: 2.4em;
  border-radius: 5px 5px 30px 30px;
  color: #0E1326;
  @include orange-gradient;
  li{
    width: 30%;
  }
  .quiz {
    text-align: start;
  }
  .score{
    color: white;
    margin: 0em 0.2em;
    padding: 0.1em 0.7em;
    width: 20%;
    border-radius: 10px 10px 100px 100px;
    @include blue-gradient;
  }
}
h2 {
  color: white;
}
@media(max-width: 900px){
.score-board{
  margin: 1.6em auto;
  width: 14em;
  height: 1.4em;
  font-size:  1.8em;
  .score{
    padding: 0.1em 0.5em;
  }
}
}
@media (max-width: 480px) {
.score-board{
  margin: 1.6em auto;
  width: 14em;
  height: 1.4em;
  font-size:  1.4em;
  .score{
    padding: 0em 0.4em;
  }
}
}
</style>
