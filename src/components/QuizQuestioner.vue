<template>
<div class="main">
  <div class="progress-bar" v-bind:class="{invisible : inProgress}">
    <ProgressBar v-if="questions.length>0"  ref="progressBar" v-bind:questionCount="this.questions.length"/>
  </div>
  <div class="questions">
    <div v-bind:class="{invisible: inProgress}" class="question-wrapper">
      <div class="question" v-bind:key="question.id" v-for="question in questions">
        <question v-if="questionToDisplay===question.id" v-bind:question="question"/>
      </div>
    </div>
    
    <div class="answers-container">
      <div class="answers">
        <div v-bind:key="answer.id" v-for="answer in answers" @click="addAnswer(answer.id)">
          <answer class="answer" v-bind:answer="answer"/>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
// @ is an alias to /src
import Question from '@/components/QuizQuestion.vue'
import Answer from '@/components/QuizAnswer.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import axios from 'axios';

export default {
  name: 'home',
  components: {
    Question,
    Answer,
    ProgressBar
  },
  data() {
    return{
      questions: [],
      answers: [],
      questionIndex: 0,
      questionToDisplay: 0,
      questionId: 0,
      quizId: 0,
      userAnswers: [],
      userName: '',
      inProgress: false
    }
  },
  methods: {
    // Selects quiz to display from quizes array
    changeQuestion(number){
      this.questionIndex+=number;
      if (this.questionIndex > this.questions.length-1) {
        this.$router.replace({name:'results', params:{answers:this.userAnswers, quizId:this.quizId, userName: this.userName}});
      } else {
        this.questionToDisplay = this.questions[this.questionIndex].id;
        this.getAnswers(this.questionToDisplay);
        this.progressIndex++;
        this.$refs.progressBar.updateProgressBar();
      }
     
    },
    getQuestions(quizId){
      return new Promise((resolve, reject) => {
        axios.get(`https://printful.com/test-quiz.php?action=questions&quizId=${quizId}`)
        .then(res => {
          this.questions = res.data;
          this.questionToDisplay = this.questions[0].id;
          this.getAnswers(this.questions[0].id);
          this.$refs.progressBar.updateProgressBar();
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
      this.inProgress = true;
      return new Promise((resolve, reject) => {
        axios.get(`https://printful.com/test-quiz.php?action=answers&quizId=${this.quizId}&questionId=${questionId}`)
        .then(res => {
          this.answers = res.data;
          this.inProgress = false;
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
    this.userName = this.$route.params.userName;
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
    background: rgba($color: #a3a3a3, $alpha: 0.4)
  }
  .question-wrapper {
    min-width: 42em;
    margin-bottom: 0.8em;
  }
  .question {
    min-width: 80%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .answers-container {
    width: 42em;
    height: 100%;
  }
  .answers {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
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
.invisible {
  visibility: hidden;
}

@media (max-width: 900px) {
.questions {
  &::after{
    content: '';
    @include center;
    height: 120%;
    width: 120%;
    border: solid $button-color 2px;
    z-index: -1;
    background: rgba($color: #a3a3a3, $alpha: 0.4)
  }
  .question-wrapper {
    min-width: 22em;
    margin-bottom: 0.8em;
  }
  .answers-container {
    width: 22em;
    height: 100%;
  }
}
}
@media (max-width: 480px) {
.questions {
  &::after{
    content: '';
    @include center;
    height: 120%;
    width: 120%;
    border: solid $button-color 2px;
    z-index: -1;
    background: rgba($color: #a3a3a3, $alpha: 0.4)
  }
  .question-wrapper {
    min-width: 16em;
    margin-bottom: 0.8em;
  }
  .answers-container {
    width: 16em;
    height: 100%;
    .answer {
      width: 15em;
    }
  }
}
}
</style>