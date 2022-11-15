<template>
  <div>
    <TransactionsList v-if="isLoggedIn" />
    <LoginPage v-else />
  </div>
</template>

<script>
import LoginPage from './components/LoginPage'
import TransactionsList from './components/TransactionsList'
import { mapGetters } from "vuex";
export default {
  components: {
    LoginPage,
    TransactionsList
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
