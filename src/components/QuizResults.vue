<template>
  <div class="hello">
    <div class="results-message">
      <h2 v-if="successIndex>0.8">wow you really do know this stuff, great work</h2>
      <h2 v-else-if="successIndex<0.4">your results where... well, you might want to read on the subject</h2>
      <h2 v-else>Your where results where... nothing special</h2>
    </div>
    <ul class="score-board">
      <li>correct</li>
      <li class="score">{{results.correct}} - {{results.total}}</li>
      <li class="quiz">totals</li>
    </ul>
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
      successIndex: 0
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
    this.submitAnswers();
  }
}
</script>

<style lang="scss" scoped>
@import url(https://fonts.googleapis.com/css?family=Days+One);
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
</style>
