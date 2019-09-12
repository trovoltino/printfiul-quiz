<template>
  <div class="questions">
    <questioner/>
  </div>
</template>
<script>
// @ is an alias to /src
import Questioner from '@/components/QuizQuestioner.vue'

export default {
  name: 'home',
  components: {
    Questioner
  }
}
</script>