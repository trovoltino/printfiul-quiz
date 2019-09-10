<template>
    <div class="answer">
      <h2> {{answer.title}}</h2>
      <h5>{{answer.id}}</h5>
      
    </div>
</template>

<script>
export default {
    name: "answer",
    props: ["answer"]
}
</script>

<style scoped>
   
</style>
