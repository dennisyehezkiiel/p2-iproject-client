<template>
  <div>
    <div class="bg-white min-h-screen">
      <div class="grid place-items-center h-screen">
        <div class="flex flex-col">
          <form
            action=""
            @submit.prevent="loginHandler"
            class="flex flex-col space-y-2"
          >
            <h1 class="font-bold text-2xl">Sign In</h1>
            <input
              type="text"
              placeholder="Email"
              v-model="user.email"
              class="border-blue-300 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              class="border-blue-300 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
              type="password"
              placeholder="Password"
              v-model="user.password"
            />
            <button
              type="submit"
              class="bg-blue-400 hover:bg-blue-500 rounded-md text-sm py-2 text-white drop-shadow-md"
            >
              Login
            </button>
            <router-link
              to="/registrationpage"
              type="sumbit"
              class="bg-green-300 hover:bg-green-400 rounded-md text-sm py-2 text-white drop-shadow-md"
            >
              Sign Up
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  name: "LoginPage",
  data() {
    return {
      user: {},
      token: localStorage.getItem("access_token"),
      username: localStorage.getItem("userName"),
    };
  },
  methods: {
    ...mapMutations({
      changeUserData: "CHANGE_USERDATA",
    }),
    ...mapActions(["login"]),
    async loginHandler() {
      this.changeUserData(this.user);
      await this.login();
      if (localStorage.getItem("access_token")) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
