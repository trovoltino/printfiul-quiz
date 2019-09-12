<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/questions">Questions</router-link> |
      <router-link to="/results">Results</router-link>
    </div>
    <h1 class="welcome">Welcome To <b >Printful </b>quiz</h1>
    <router-view/>
  </div>
</template>

<style lang="scss">
body {
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
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
.welcome {
  color: $button-color;
  b {
    color: white;
  }
}
</style>
