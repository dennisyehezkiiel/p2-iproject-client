<template>
  <nav
    class="relative flex flex-wrap items-center justify-between px-2 py-5 bg-slate-100 mb-3"
  >
    <div
      class="container px-4 mx-auto flex flex-wrap items-center justify-between"
    >
      <div
        class="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start"
      >
        <a
          class="text-xl font-semibold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-slate-500"
          href=""
        >
          myDiary
        </a>
        <button
          class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
        >
          <span class="block relative w-6 h-px rounded-sm bg-white"></span>
          <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
          <span class="block relative w-6 h-px rounded-sm bg-white mt-1"></span>
        </button>
      </div>
      <div class="lg:flex flex-grow items-center" id="example-navbar-warning">
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li class="nav-item">
            <a
              class="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
              href=""
            >
              <i
                class="fab fa-facebook-square text-lg leading-lg text-white opacity-75"
              />
            </a>
          </li>
          <li class="nav-item">
            <a
              class="px-3 py-2 flex items-center text-sm uppercase font-light leading-snug text-slate-500 hover:opacity-75"
              href=""
            >
              <i
                class="fab fa-twitter text-lg leading-lg text-white opacity-75"
              />
              <a href="" @click="homeHandler" class="ml-2">Home</a>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="px-3 py-2 flex items-center text-sm uppercase font-light leading-snug text-slate-500 hover:opacity-75"
              href=""
            >
              <a href="" class="ml-2" @click="logoutHandler">Logout</a>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="px-3 py-2 flex items-center text-sm uppercase font-light leading-snug text-slate-500 hover:opacity-75"
              href=""
            >
              <router-link to="/creatediary" class="ml-2"
                >New Diary</router-link
              >
            </a>
          </li>
          <div class="group inline-block relative">
            <button
              class="text-sm text-slate-500 font-light py-2 px-3.5 rounded inline-flex items-center"
            >
              <span class="mr-1">FRIENDLIST</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </button>
            <ul class="absolute hidden text-gray-700 pt-1 group-hover:block">
              <div v-for="friend in friendList" :key="friend.id">
                <li class="">
                  <router-link
                    to="/chatpage"
                    class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                    >{{ friend.user2.username }}</router-link
                  >
                </li>
              </div>
            </ul>
          </div>
        </ul>
        <div
          class="relative flex w-full sm:w-7/12 md:w-5/12 px-4 flex-wrap items-stretch lg:ml-auto"
        >
          <div class="flex">
            <span
              class="font-normal leading-snug flex text-center white-space-no-wrap border border-solid border-blueGray-600 rounded-full text-sm bg-white items-center rounded-r-none pl-2 py-1 text-blueGray-800 border-r-0 placeholder-blueGray-300"
            >
              <i class="fas fa-search"></i>
            </span>
          </div>
          <input
            v-model="username"
            type="text"
            class="px-2 py-1 h-8 border border-solid border-blueGray-600 rounded-full text-sm leading-snug text-blueGray-700 bg-white shadow-none outline-none focus:outline-none w-full font-normal rounded-l-none flex-1 border-l-0 placeholder-blueGray-300"
            placeholder="Search username"
            @keyup.enter="searchUsername"
          />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      username: "",
    };
  },
  computed: {
    ...mapState(["friendList"]),
  },
  methods: {
    ...mapMutations({
      changeUsername: "CHANGE_USERNAME",
    }),
    ...mapActions(["searchUser", "getFriendList"]),
    searchUsername() {
      this.changeUsername(this.username);
      this.searchUser();
      this.$router.push("/findpage");
    },
    logoutHandler() {
      localStorage.clear();
      this.$router.push("/loginpage");
    },
    homeHandler() {
      this.$router.push("/");
    },
  },
  created() {
    this.getFriendList();
  },
};
</script>

<style></style>
