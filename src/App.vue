<template>
  <div id="app">
    <header>
      <div id="nav">
        <router-link to="/">Product List</router-link> |
        <router-link to="/contact-form">Contact Form</router-link>
      </div>
    </header>
    <router-view class="content" />
    <footer class="footer">Footer</footer>
  </div>
</template>

<style lang="scss">
@import "assets/scss/main.scss";
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
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
.content {
  flex: 1 0 auto;
}
.footer {
  height: 50px;
  display: flex;
  align-items: center;
}
@media (min-width: $breakpointSm) {
  #app {
    margin: 0 100px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
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
