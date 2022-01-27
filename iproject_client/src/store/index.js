import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import swal from "sweetalert2";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    registrationStatus: false,
    newDiaryStatus: false,
    username: "",
    title: "",
    diaryId: 0,
    chats: [],
    userData: {},
    newDiary: {},
    diaryList: {},
    userList: {},
    friendList: {},
    getTag: {},
  },
  mutations: {
    GET_TAG(state, payload) {
      state.getTag = payload;
    },
    GET_FRIENDLIST(state, payload) {
      state.friendList = payload;
    },
    GET_CHATS(state, payload) {
      state.chats = payload;
    },
    CHANGE_USERDATA(state, payload) {
      state.userData = payload;
    },
    CHANGE_REGISTRATION_STATUS(state, payload) {
      state.registrationStatus = payload;
    },
    CHANGE_DIARY_LIST(state, payload) {
      state.diaryList = payload;
    },
    CHANGE_USERNAME(state, payload) {
      state.username = payload;
    },
    CHANGE_USERLIST(state, payload) {
      state.userList = payload;
    },
    CHANGE_TITLE(state, payload) {
      state.title = payload;
    },
    CHANGE_NEWDIARY(state, payload) {
      state.newDiary = payload;
    },
    CHANGE_NEW_DIARY_STATUS(state, payload) {
      state.newDiaryStatus = payload;
    },
    CHANGE_DIARY_ID(state, payload) {
      state.diaryId = payload;
    },
    SOCKET_RECEIVEMESSAGEFROMSERVER(state, payload) {
      console.log(payload);
      state.chats = payload;
    },
  },
  actions: {
    socket_connect() {
      console.log("connected", this._vm.$socket);
    },
    socket_disconnect() {
      console.log("disconnected", this._vm.$socket);
    },
    socket_customEventFromServer(_, payload) {
      console.log("customEventFromServer", payload);
    },
    sendCustomEventToServer(_, payload) {
      this._vm.$socket.client.emit("customEventFromClient", payload);
    },
    setUsername({ commit }, payload) {
      commit("CHANGE_USERNAME", payload);
      this._vm.$socket.client.emit("setUsername", payload);
    },
    sendMessage(_, payload) {
      this._vm.$socket.client.emit("sendMessageToServer", {
        user: localStorage.getItem("userName"),
        UserId: localStorage.getItem("userId"),
        message: payload,
      });
    },
    async login(context) {
      try {
        const userData = context.state.userData;
        const login = await axios({
          url: "http://localhost:3000/login",
          method: "post",
          data: {
            email: userData.email,
            password: userData.password,
          },
        });
        localStorage.setItem("access_token", login.data.access_token);
        localStorage.setItem("userId", login.data.userId);
        localStorage.setItem("userName", login.data.userName);
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
        });
      }
    },
    async registration(context) {
      try {
        const userData = context.state.userData;
        const registerUser = await axios({
          url: "http://localhost:3000/register",
          method: "post",
          data: {
            name: userData.name,
            username: userData.username,
            password: userData.password,
            email: userData.email,
            phoneNumber: userData.phoneNumber,
          },
        });
        console.log(registerUser);
        context.commit("CHANGE_REGISTRATION_STATUS", true);
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Registration success!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
        });
      }
    },
    async getDiary(context) {
      try {
        let baseUrl = "http://localhost:3000/diaries";
        if (context.state.title) {
          baseUrl = `http://localhost:3000/diaries?title=${context.state.title}`;
        }
        const diaryList = await axios.get(baseUrl, {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.commit("CHANGE_DIARY_LIST", diaryList.data);
      } catch (err) {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
        });
      }
    },
    async searchUser(context) {
      try {
        const findUsername = context.state.username;
        const findUser = await axios.get(
          `http://localhost:3000/findUser?username=${findUsername}`,
          {
            headers: { access_token: localStorage.getItem("access_token") },
          }
        );
        console.log(findUser.data);
        context.commit("CHANGE_USERLIST", findUser.data);
      } catch (err) {
        console.log(err);
      }
    },
    async newDiary(context) {
      try {
        const diaryData = context.state.newDiary;
        await axios({
          url: "http://localhost:3000/diaries",
          method: "post",
          data: {
            title: diaryData.title,
            story: diaryData.story,
            imageUrl: diaryData.imageUrl,
            TagId: diaryData.TagId,
          },
          headers: { access_token: localStorage.getItem("access_token") },
        });
        console.log(diaryData);
        context.commit("CHANGE_NEW_DIARY_STATUS", true);
        context.dispatch("getDiary");
        swal.fire({
          position: "top-end",
          icon: "success",
          title: "Diary uploaded!",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (err) {
        swal.fire({
          icon: "error",
          title: "Oops...",
          text: err.response.data,
        });
      }
    },
    async fetchTag(context) {
      try {
        const fetchTag = await axios.get("http://localhost:3000/getTag", {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.commit("GET_TAG", fetchTag.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getMovieById(context) {
      try {
        const diaryId = context.state.diaryId;
        const getMovieDetail = await axios.get(
          `http://localhost:3000/diaries/${diaryId}`,
          { headers: { access_token: localStorage.getItem("access_token") } }
        );
        context.commit("CHANGE_DIARY_LIST", getMovieDetail.data);
      } catch (err) {
        console.log(err);
      }
    },
    async updateDiary(context) {
      try {
        const diaryData = context.state.newDiary;
        console.log(diaryData);
        const diaryId = context.state.diaryId;
        await axios({
          url: `http://localhost:3000/diaries/${diaryId}`,
          method: "put",
          data: {
            title: diaryData.title,
            imageUrl: diaryData.imageUrl,
            story: diaryData.story,
            TagId: diaryData.TagId,
          },
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.dispatch("getDiary");
      } catch (err) {
        console.log(err);
      }
    },
    async getFriendList(context) {
      try {
        const mutualList = await axios.get("http://localhost:3000/mutualList", {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.commit("GET_FRIENDLIST", mutualList.data);
      } catch (err) {
        console.log(err);
      }
    },
    async getChat(context) {
      try {
        const fetchChat = await axios.get("http://localhost:3000/getChats", {
          headers: { access_token: localStorage.getItem("access_token") },
        });
        context.commit("GET_CHATS", fetchChat.data);
      } catch (err) {
        console.log(err);
      }
    },
  },
  modules: {},
});
