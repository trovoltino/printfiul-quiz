<template>
  <div class="quiz">
    <div class="quiz-container">
      <button v-if="dataLoaded" class="left" @click="changeQuiz(-1)"></button>
      <transition name="slide">
        <div v-if="dataLoaded" class="quiz-select">
          <div v-bind:key="quiz.id" v-for="quiz in quizes">
            <quiz v-if="quizToDisplay===quiz.id" v-bind:quiz="quiz"/>
          </div>
        </div>
        <div v-else>
          <button class="select-btn" @click="getQuizes">select your quiz?</button>
        </div>
      </transition>
      <button v-if="dataLoaded" class="right" @click="changeQuiz(+1)"></button>
    </div>
    <button v-if="dataLoaded" @click="startQuiz" class="start">lets go</button>
  </div>
</template>

<script>

import axios from 'axios'
import Quiz from '@/components/Quiz'
import { Promise } from 'q';

export default {
  name: 'QuizSelector',
  components: {
    Quiz
  },
  data(){
    return{
      quizIndex: 0,
      quizToDisplay: 0,
      quizes: [],
      dataLoaded: false,
    }
  },
  methods: {
    // Selects quiz to display from quizes array
    changeQuiz(number){
      this.quizIndex+=number;
      if (this.quizIndex > this.quizes.length-1) {
        this.quizIndex = 0;
      } else if(this.quizIndex < 0) {
        this.quizIndex = this.quizes.length-1;
      }
      this.quizToDisplay = this.quizes[this.quizIndex].id;
    },
    startQuiz(){
      let myProp = this.quizToDisplay;
      this.$router.replace({name:'questions', params:{quizId:myProp}});
    },
    getQuizes() {
      return new Promise((resolve, reject)=> {
      axios.get('https://printful.com/test-quiz.php?action=quizzes')
        .then(res => {
          this.quizes = res.data;
          this.dataLoaded = true;
          this.quizToDisplay = this.quizes[0].id;
          resolve();
          
        })
        .catch(err => {
          console.log(err);
          reject();
        })
    })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.quiz {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  
}
.quiz-container {
  display: flex;
  align-items: center;
  background-image: linear-gradient(rgb(228, 146, 69), rgba(230, 172, 80, 0.89));
  height: 20em;
  width: 30em;
  border-radius: 10%;
  .quiz-select {
    width: 80%;
  }
}
.select-btn{
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  border: none;
  background: #404040;
  color: #ffffff ;
  font-weight: 100;
  padding: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  display: inline-block;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  &:hover{
    color: #404040 ;
    font-weight: 700;
    letter-spacing: 3px;
    background: none;
    border: 1px solid #404040;
    box-shadow: 5px 5px 40px -10px rgba(0,0,0,0.87), 15px 10px 40px -20px rgba(0,0,0,0.87);
    transition: all 0.3s ease 0s;
  }
}
.left, .right{
  position: relative;
    border: none;
    height: 7em;
    width: 5em;
    background:$main-grey;
    cursor: pointer;
    &:hover {
      background: $grey-hover;
    }
    &:active {
      background: rgb(139, 139, 139);
    }
  }
  .left {
    left: -2.5em;
    clip-path: polygon(50% 0%, 34% 50%, 50% 100%, 0% 50%);
  }
  .right {
    right: -2.5em;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 66% 50%);
  }
  .start {
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
