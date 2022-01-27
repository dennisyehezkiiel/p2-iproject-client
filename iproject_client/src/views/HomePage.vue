<template>
  <div>
    <div class="bg-white min-h-screen">
      <navbar></navbar>
      <div class="flex justify-end px-10">
        <input
          type="text"
          class="text-sm border-2 border-slate-300 h-8 w-auto pr-8 pl-5 rounded-full z-0 focus:shadow focus:outline-none"
          placeholder="Search title..."
          v-model="title"
          @keyup.enter="searchTitle"
        />
      </div>

      <div class="flex justify-center flex-row flex-wrap space-x-4">
        <div
          class="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20 fill-blue-200 bg-slate-50 transition ease-in-out delay-150 hover:translate-y-1 hover:scale-110 duration-330 rounded"
          v-for="diary in diaryList"
          :key="diary.id"
        >
          <div class="flex justify-center md:justify-end -mt-16">
            <img
              class="w-20 h-20 object-cover rounded-full border-2 border-indigo-500"
              :src="diary.imageUrl"
            />
          </div>
          <div>
            <h2 class="text-gray-800 text-3xl font-semibold">
              {{ diary.title }}
            </h2>
            <p class="mt-2 text-gray-600">
              {{ diary.story }}
            </p>
          </div>
          <div class="flex justify-end mt-4">
            <a
              href=""
              class="text-sm font-medium text-indigo-500"
              @click="seeDetail(diary.id)"
            >
              SEE DETAIL
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "HomePage",
  data() {
    return {
      title: "",
      usernameToServer: localStorage.getItem("userName"),
    };
  },
  components: {
    Navbar,
  },
  computed: {
    ...mapState(["diaryList", "userList"]),
  },
  methods: {
    ...mapActions(["getDiary", "searchUser", "setUsername"]),
    ...mapMutations({
      changeTitle: "CHANGE_TITLE",
    }),
    searchTitle() {
      this.changeTitle(this.title);
      this.getDiary();
    },
    chatButtonHandler() {
      this.setUsername(this.usernameToServer);
      this.$router.push("/chatpage");
    },
    seeDetail(diaryId) {
      this.$router.push(`/editpage/${diaryId}`);
    },
  },
  created() {
    this.getDiary();
  },
};
</script>

<style></style>
