<template>
  <div>
    <div class="bg-white min-h-screen">
      <div class="grid place-items-center h-screen">
        <div class="flex flex-col">
          <form
            action=""
            @submit.prevent="registrationHandler"
            class="flex flex-col space-y-2"
          >
            <h1 class="font-bold text-2xl">Sign Up</h1>
            <input
              type="text"
              placeholder="Name"
              v-model="user.name"
              class="border-blue-400 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Username"
              v-model="user.username"
              class="border-blue-300 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Email"
              v-model="user.email"
              class="border-blue-300 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="password"
              placeholder="Password"
              v-model="user.password"
              class="border-blue-300 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <input
              type="text"
              placeholder="Ex: 628126097xxx"
              v-model="user.phoneNumber"
              class="border-blue-300 border-4 rounded-lg py-2 px-6 focus:outline-none focus:ring focus:ring-blue-400"
            />
            <button
              type="sumbit"
              class="bg-blue-300 hover:bg-blue-400 rounded-lg text-sm py-2 text-white drop-shadow-md"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "RegistrationPage",
  data() {
    return {
      user: {},
    };
  },
  computed: {
    ...mapState(["registrationStatus"]),
  },
  methods: {
    ...mapMutations({
      changeUserData: "CHANGE_USERDATA",
    }),
    ...mapActions(["registration"]),
    registrationHandler() {
      this.changeUserData(this.user);
      this.registration();
      setTimeout(() => {
        if (this.registrationStatus === true) {
          this.$router.push("/loginpage");
        }
      }, 5000);
    },
  },
};
</script>

<style></style>
