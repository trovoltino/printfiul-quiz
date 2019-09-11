<template>
  <div class="quizSelector">
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
  }
}
</script>

<style lang="scss" scoped>
.quizSelector {
  @include center;
}
</style>