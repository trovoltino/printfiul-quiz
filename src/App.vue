<template>
  <div id="app">
    <h1 class="welcome">Welcome To <b >Printful </b>quiz</h1>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
  margin-top: 4em;
  background: url('assets/images/sona_splash.jpg') no-repeat center center fixed;
  background-size: cover;
  &::before{
    content: '';
    position: absolute;
    @include center;
    height: 100vh;
    width: 100%;
    background: rgba(51, 51, 51, 0.6);
    z-index: -3;
  }
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.welcome {
  color: white;
  b {
    color: $button-color;
  }
}
</style>
