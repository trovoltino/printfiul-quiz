<template>
  <div class="home">
    
    <QuizSelector/>
    
  </div>
</template>

<script>
// @ is an alias to /src
import QuizSelector from '@/components/QuizSelector.vue'

export default {
  name: 'home',
  components: {
    QuizSelector
  },
  data() {
    return{
      selectedQuiz: 'bestQuiz'
    }
  }
}
</script>
