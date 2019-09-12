<template>
    <div class="progress-bar">
      <div class="bar" :style="{ width: this.totallProgress + '%' }"></div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    data() {
      return {
        totallProgress: 0,
        questionIndex: 0
      }
    },
    props: [
      "questionCount"
    ],
    methods: {
      updateProgressBar() {
        this.totallProgress=this.questionIndex *100 / this.questionCount;
        this.questionIndex++;
      }
    },
    mounted() {
      this.updateProgressBar();
    }
}
</script>

<style lang="scss" scoped>
.progress-bar{
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  top: 2em;
  margin:0 auto;
  width: 28em;
  height: 1.2em;
  background: transparent;
  border: 2px solid orange;
  border-top-right-radius:15px;
  border-top-left-radius:15px;
  border-bottom-right-radius:15px;
  border-bottom-left-radius:15px;
}
.bar {
  background: orange;
  animation: all 2s ease-in-out;
  height: 80%;
  border-top: 1px solid rgb(228, 217, 197);
  border-bottom: 1px solid rgb(228, 217, 197);
  border-right: 1px solid rgb(119, 89, 34);
}
@media (max-width: 480px) {
.progress-bar{
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  top: 2em;
  margin:0 auto;
  width: 15em;
  height: 1.2em;
  background: transparent;
  border: 2px solid orange;
  border-top-right-radius:15px;
  border-top-left-radius:15px;
  border-bottom-right-radius:15px;
  border-bottom-left-radius:15px;
}
}
</style>
