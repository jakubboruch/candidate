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
* {
  box-sizing: border-box;
}
html {
  background-color: $cornflowerBlue;
}
#app {
  font-family: $fontFamilySansSerif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $secondaryColor;
  margin: 0 10px;
}

@media (min-width: $breakpointSm) {
  #app {
    margin: 0 100px;
  }
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
