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
              <a href="" class="ml-2" @click.prevent="logoutHandler">Logout</a>
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
import swal from "sweetalert2";

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
      swal
        .fire({
          title: "Log out from myDiary?",
          showDenyButton: true,
          confirmButtonText: "Yes",
        })
        .then((result) => {
          if (result.isConfirmed) {
            localStorage.clear();
            this.$router.push("/loginpage");
            swal.fire("See you!", "", "success");
          } else if (result.isDenied) {
            swal.fire("Changes are not saved", "", "info");
          }
        });
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
