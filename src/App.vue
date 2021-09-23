<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/">Product List</router-link> |
        <router-link to="/contact-form">Contact Form</router-link>
      </div>
    </header>
    <router-view />
    <footer>Footer</footer>
  </div>
</template>

<style lang="scss">
@import "assets/scss/main.scss";

html {
  background-color: $cornflowerBlue;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $secondaryColor;
  margin: 0 100px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $secondaryColor;

    &.router-link-exact-active {
      color: $primaryColor;
    }
  }
}
</style>
