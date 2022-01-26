<template>
  <div>
    <div class="mx-auto">
      <form @submit.prevent="editDiary">
        <div class="bg-indigo-50 min-h-screen md:px-20 pt-20">
          <div class="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
            <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
              MY NEW DIARY
            </h1>
            <div
              class="space-y-4"
              v-for="myDiary in diaryList"
              :key="myDiary.id"
            >
              <div class="flex flex-start">
                <input
                  type="text"
                  placeholder="Title"
                  id="Title"
                  :value="myDiary.title"
                  class="ml-2 outline-none py-1 px-2 text-sm border-2 w-full rounded-md"
                  v-on:input="diary.title = $event.target.value"
                />
              </div>
              <div class="flex flex-start">
                <input
                  type="text"
                  placeholder="Image Url"
                  id="name"
                  :value="myDiary.imageUrl"
                  class="ml-2 outline-none py-1 px-2 text-sm border-2 w-full rounded-md"
                  v-on:input="diary.imageUrl = $event.target.value"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="Your story goes here.."
                  :value="myDiary.story"
                  class="w-full p-4 text-gray-600 text-sm bg-indigo-50 outline-none rounded-md"
                  v-on:input="diary.story = $event.target.value"
                ></textarea>
              </div>
              <div>
                <select
                  name="TagId"
                  id=""
                  :value="myDiary.TagId"
                  v-on:input="diary.TagId = $event.target.value"
                  class="ml-2 outline-none py-1 px-2 text-sm border-2 w-full rounded-md"
                >
                  <option selected disabled>-Select Tag-</option>
                  <option :value="tag.id" v-for="tag in getTag" :key="tag.id">
                    {{ tag.name }}
                  </option>
                </select>
              </div>
              <button
                class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-white bg-blue-300 hover:bg-blue-500"
              >
                EDIT DIARY
              </button>
              <router-link to="/" class="text-xs text-green-300 font-semibold"
                >HOME</router-link
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
  name: "EditPage",
  data() {
    return {
      diary: {},
      diaryId: this.$route.params.diaryId,
    };
  },
  computed: {
    ...mapState(["getTag", "diaryList"]),
  },
  methods: {
    ...mapActions(["fetchTag", "getMovieById", "updateDiary"]),
    ...mapMutations({
      changeDiaryId: "CHANGE_DIARY_ID",
      changeNewDiary: "CHANGE_NEWDIARY",
    }),
    editDiary() {
      this.changeDiaryId(this.diaryId);
      this.changeNewDiary(this.diary);
      this.updateDiary();
      this.$router.push("/");
    },
  },
  created() {
    this.fetchTag();
    this.changeDiaryId(this.diaryId);
    this.getMovieById();
  },
};
</script>

<style></style>
