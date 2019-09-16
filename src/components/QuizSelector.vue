<template>
  <div class="quiz">
    <div class="quiz-container">
      <input v-if="!nextStep" v-bind:class="{alert: !nameSubmited}" v-model="name" type="text" name="username" placeholder="How should we call you?">
      <p class="alert-text" v-if="!nameSubmited" >please provide your name</p>
      <button v-if="dataLoaded" class="left" @click="changeQuiz(-1)"></button>
        <div v-if="dataLoaded" class="quiz-select">
          <div v-bind:key="quiz.id" v-for="quiz in quizes">
            <transition name="fade" mode="out-in" >
              <quiz class="quiz-item" v-if="quizToDisplay===quiz.id" v-bind:quiz="quiz"/>
            </transition>
          </div>
        </div>
        <div v-else>
          <button class="select-btn" @click="getQuizes">select your quiz?</button>
        </div>
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
      name,
      nameSubmited: true,
      nextStep: false
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
      this.$router.replace({name:'questions', params:{quizId:myProp, userName: this.name}});
    },
    getQuizes() {
      if(this.name){
        this.nameSubmited = true;
        this.nextStep = true;
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
      } else {
        this.nameSubmited = false;
      }
    }
  }
}
</script>

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
  background-image: linear-gradient(rgb(221, 132, 49), rgba(235, 190, 119, 0.89));
  height: 20em;
  width: 30em;
  border-radius: 10%;
  .quiz-select {
    width: 80%;
  }
}
input {
  position: absolute;
  @include center;
  top:4em;
  appearance: none;
  text-align: center;
  padding: 0.6em 1em;
  color: white;
  box-shadow:inset 0px 0px 0px 1px #bee2f9;
  border:1px solid #f3f3f3;
  border-radius: 10px;
  background-color: transparent;
  outline: none;
  font-size: 0.9em;
  &::placeholder {
    color: rgb(231, 231, 231);
  }
}
.alert-text {
  position: relative;
  margin: 0 auto;
  top: -4em;
}
.alert {
  border:1px solid rgb(255, 91, 91);
  &::placeholder {
    color:rgb(117, 30, 30);
  }
}

// Buttons section
.select-btn{
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
  border: none;
  background: $button-grey;
  color: #ffffff ;
  font-weight: 100;
  padding: 20px;
  text-transform: uppercase;
  border-radius: 6px;
  display: inline-block;
  transition: all 0.3s ease 0s;
  cursor: pointer;
  &:hover{
    color: $button-grey ;
    font-weight: 700;
    letter-spacing: 3px;
    background: none;
    border: 1px solid $button-grey;
    box-shadow: 5px 5px 40px -10px rgba(0,0,0,0.87), 15px 10px 40px -20px rgba(0,0,0,0.87);
    transition: all 0.3s ease 0s;
  }
}
.left, .right{
  position: relative;
  border: none;
  height: 7em;
  width: 5em;
  background:rgb(238, 238, 238);
  cursor: pointer;
  &:hover {
    background: $button-color;
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
  border:solid 4px rgb(238, 238, 238);
  font-weight: bold;
  border-radius: 2em;
  margin-top: 2em;
  padding: 1em 2.6em;
  outline:none;
  font-size: 1.3em;
  color: rgb(238, 238, 238);
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
.quiz-item {
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
}

// Animation
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to{
  opacity: 0;
}
// End animation

@media(max-width: 600px){
.quiz-container {
  height: 14em;
  width: 24em;
}
.alert-text{
  position: relative;
  top: -0.2em;
}
}
@media (max-width: 480px) {
.quiz-container {
  height: 12em;
  width: 16em;
}
.select-btn {
  top:70%;
}
.right {
  right: -2em;
}
.left {
  left: -2em;
}
}
</style>
