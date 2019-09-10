<template>
    <div class="quiz-item">
      <h2>{{quiz.title}}</h2>
      <h3>{{quiz.id}}</h3>
      
  
      
      <!-- <button @click="$emit('del-todog')" class="del">x</button> -->
        
    </div>
</template>

<script>
export default {
    name: "quizItem",
    props: ["quiz"]
}
</script>

<style scoped>
    .todo-item {
        color:rgb(3, 0, 184);
        font-weight: bold;
    }
    .is-complete {
        text-decoration: line-through;
    }
</style>
