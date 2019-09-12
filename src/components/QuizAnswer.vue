<template>
    <div class="answer">
      <h2> {{answer.title}}</h2>
    </div>
</template>

<script>
export default {
    name: "answer",
    props: ["answer"]
}
</script>

<style lang="scss" scoped>
.answer {
  @include flex-column;
  height: 6.2em;
}
h2 {
 
  top: 0.6em;
}
@media(max-width: 900px){
.answer {
  @include flex-column;
  height: 4.2em;
}
h2 {
  font-size: 1.2em;
}
}
@media(max-width: 480px){
.answer {
  @include flex-column;
  height: 2.2em;
}
h2 {
  font-size: 0.9em;
}
}
</style>
