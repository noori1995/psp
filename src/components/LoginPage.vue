<template>
  <div>
    <form @submit.prevent="submitLogin" class="w-50 m-auto">
      <div class="form-group mb-3">
        <label for="exampleInputEmail1">Email address</label>
        <input
          v-model="form.username"
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          required
        />
      </div>
      <div class="form-group mb-3">
        <label for="exampleInputPassword1">Password</label>
        <input
          v-model="form.password"
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
        Submit
      </button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      isLoading: false
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"])
  },
  methods: {
    ...mapActions(["login"]),
    async submitLogin() {
      this.isLoading = true
      try{
        await this.login({ body: this.form });
      } catch (err) {
        console.error(err)
      } finally{
        this.isLoading = false
      }
      
    },
  },
};
</script>
