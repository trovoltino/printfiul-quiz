<template>
<div class="questions">
  <div class="question" v-bind:key="question.id" v-for="question in questions">
    <question v-if="questionToDisplay===question.id" v-bind:question="question"/>
  </div>
  <div class="answers">
    <div v-bind:key="answer.id" v-for="answer in answers" @click="addAnswer(answer.id)">
      <answer class="answer" v-bind:answer="answer"/>
    </div>
  </div>
</div>
</template>
<script>
// @ is an alias to /src
import Question from '@/components/QuizQuestion.vue'
import Answer from '@/components/Answer.vue'
import axios from 'axios';

export default {
  name: 'home',
  components: {
    Question,
    Answer
  },
  data() {
    return{
      questions: [],
      answers: [],
      questionIndex: 0,
      questionToDisplay: 0,
      questionId: 0,
      quizId: 0,
      userAnswers: []
    }
  },
  methods: {
    // Selects quiz to display from quizes array
    changeQuestion(number){
      this.questionIndex+=number;
      if (this.questionIndex > this.questions.length-1) {
        this.$router.replace({name:'results', params:{answers:this.userAnswers, quizId:this.quizId}});
      } else {
        this.questionToDisplay = this.questions[this.questionIndex].id;
        this.getAnswers(this.questionToDisplay);
      }
     
    },
    getQuestions(quizId){
      return new Promise((resolve, reject) => {
        axios.get(`https://printful.com/test-quiz.php?action=questions&quizId=${quizId}`)
        .then(res => {
          this.questions = res.data;
          this.questionToDisplay = this.questions[0].id;
          this.getAnswers(this.questions[0].id);
          resolve();
        })
        .then(err => {
          console.log(err);
          reject();
        })
      })
    },
    getAnswers(questionId) {
      this.answers = [];
      return new Promise((resolve, reject) => {
        axios.get(`https://printful.com/test-quiz.php?action=answers&quizId=${this.quizId}&questionId=${questionId}`)
        .then(res => {
          this.answers = res.data;
          resolve();
        })
        .then(err => {
          console.log(err)
          reject();
        })
      })
    },
    addAnswer(id) {
      this.userAnswers.push(id);
      this.changeQuestion(+1);
    }
  },
  created () {
    this.quizId = this.$route.params.quizId;
    this.getQuestions(this.quizId);
  }
}
</script>

<style lang="scss" scoped>
.questions {
  @include center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: black;
  
  &::after{
    
    content: '';
    @include center;
    
    height: 30em;
    width: 54em;
    border: solid $button-color 2px;
    z-index: -1;
  }
  .question {
    width: 80%;
    margin-bottom: 0.4em;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .answers {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
    width: 42em;
    
    .answer {

      width: 20em;
      border: 2px solid $button-color;
      margin: 0.3em;
      &:hover {
        background: $button-color;
        color:white;
        cursor: pointer;
      }
    }
  }
}
  
</style>