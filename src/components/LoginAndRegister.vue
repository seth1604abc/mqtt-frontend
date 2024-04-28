<template>
  <div class="container">
    <div class="form-container">
      <div class="form-wrapper">
        <div class="title-wrapper">
          <h1 style="display: block">Sign in</h1>
        </div>
        <form @submit.prevent="submitLoginForm">
          <div class="input-line">
            <label for="loginUserName">帳號: </label>
            <input type="text" id="loginUserName" v-model="loginUserName" />
          </div>
          <div class="input-line">
            <label for="loginPassword">密碼: </label>
            <input type="text" id="loginPassword" v-model="loginPassword" />
          </div>
          <div class="btn-submit">
            <button type="submit">登入</button>
          </div>
        </form>
      </div>
    </div>
    <div class="form-container">
      <div class="form-wrapper">
        <div class="title-wrapper">
          <h1 style="display: block">Sign up</h1>
        </div>
        <form @submit.prevent="submitRegisterForm">
          <div class="input-line">
            <label for="registerAccount">帳號: </label>
            <input type="text" id="registerAccount" v-model="registerAccount" />
          </div>
          <div class="input-line">
            <label for="registerPassword">密碼: </label>
            <input
              type="text"
              id="registerPassword"
              v-model="registerPassword"
            />
          </div>
          <div class="input-line">
            <label for="registerPasswordRepeat">再次輸入密碼: </label>
            <input
              type="text"
              id="registerPasswordRepeat"
              v-model="registerPasswordRepeat"
            />
          </div>
          <div class="input-line">
            <label for="registerName">名字: </label>
            <input type="text" id="registerName" v-model="registerName" />
          </div>
          <div class="input-line">
            <label for="registerEmail">Email: </label>
            <input type="text" id="registerEmail" v-model="registerEmail" />
          </div>
          <div class="btn-submit">
            <button type="submit">註冊</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { sendRequest } from "@/services/apiService";

const loginUserName = ref("");
const loginPassword = ref("");

const submitLoginForm = async () => {
  // console.log("username:", loginUserName.value);
  // console.log("password:", loginPassword.value);
};

const registerAccount = ref("");
const registerPassword = ref("");
const registerPasswordRepeat = ref("");
const registerName = ref("");
const registerEmail = ref("");

const submitRegisterForm = async () => {
  await sendRequest("post", "auth/register", {
    account: registerAccount,
    password: registerPassword,
    name: registerName,
    email: registerEmail,
  });

  // console.log(res);
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100vh;
  background-image: url(/public/images/background.jpg);
}

.form-container {
  height: 70%;
  width: 20%;
  background-color: #fff;
  border-radius: 6%;
}

.input-line {
  display: flex;
  justify-content: space-between;
  margin: 60px 10px;
}

.btn-submit {
  display: flex;
  justify-content: center;
}

.btn-submit > button {
  font-size: 24px;
  background-color: green;
  color: white;
  border: 0px;
  width: 30%;
  border-radius: 6%;
}

.btn-submit > button:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 35%;
  font-size: 32px;
}

.form-wrapper {
  height: 100%;
  width: 100%;
  font-weight: bold;
  font-size: 24px;
}

.title-wrapper {
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url(/public/images/title.png);
  background-size: contain;
  background-position: center;
  font-size: 32px;
}
</style>
