<template>
  <div>
    <div class="mx-auto">
      <form @submit.prevent="createDiary">
        <div class="bg-indigo-50 min-h-screen md:px-20 pt-20">
          <div class="bg-white rounded-md px-6 py-10 max-w-2xl mx-auto">
            <h1 class="text-center text-2xl font-bold text-gray-500 mb-10">
              MY NEW DIARY
            </h1>
            <div class="space-y-4">
              <div class="flex flex-start">
                <input
                  type="text"
                  placeholder="Title"
                  id="Title"
                  class="ml-2 outline-none py-1 px-2 text-sm border-2 w-full rounded-md"
                  v-model="diary.title"
                />
              </div>
              <div class="flex flex-start">
                <input
                  type="text"
                  placeholder="Image Url"
                  id="name"
                  class="ml-2 outline-none py-1 px-2 text-sm border-2 w-full rounded-md"
                  v-model="diary.imageUrl"
                />
              </div>
              <div>
                <textarea
                  id="description"
                  cols="30"
                  rows="10"
                  placeholder="Your story goes here.."
                  class="w-full p-4 text-gray-600 text-sm bg-indigo-50 outline-none rounded-md"
                  v-model="diary.story"
                ></textarea>
              </div>
              <div>
                <select
                  name="TagId"
                  id=""
                  v-model="diary.TagId"
                  class="ml-2 outline-none py-1 px-2 text-sm border-2 w-full rounded-md"
                >
                  <option :value="tag.id" v-for="tag in getTag" :key="tag.id">
                    {{ tag.name }}
                  </option>
                </select>
              </div>
              <button
                class="px-6 py-2 mx-auto block rounded-md text-lg font-semibold text-white bg-blue-300 hover:bg-blue-500"
              >
                ADD POST
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
  name: "CreateDiary",
  data() {
    return {
      diary: {},
    };
  },
  computed: {
    ...mapState(["getTag", "newDiaryStatus"]),
  },
  methods: {
    ...mapActions(["newDiary", "fetchTag"]),
    ...mapMutations({
      changeNewDiary: "CHANGE_NEWDIARY",
    }),
    async createDiary() {
      this.changeNewDiary(this.diary);
      await this.newDiary();
      if (this.newDiaryStatus === true) {
        this.$router.push("/");
      }
    },
  },
  created() {
    this.fetchTag();
  },
};
</script>

<style></style>
