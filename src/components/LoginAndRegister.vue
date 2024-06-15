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
import { useRouter } from "vue-router";
import { sendRequest } from "@/services/apiService";
import Swal from "sweetalert2";

const router = useRouter();

const failedLoginAlert = (text) => {
  Swal.fire({
    title: "登入失敗",
    text,
    icon: "error",
    confirmButtonText: "確認",
  });
};

const failedRegisterAlert = (text) => {
  Swal.fire({
    title: "註冊失敗",
    text,
    icon: "error",
    confirmButtonText: "確認",
  });
};

const loginUserName = ref("");
const loginPassword = ref("");

const submitLoginForm = async () => {
  const data = await sendRequest("post", "auth/login", {
    account: loginUserName.value,
    password: loginPassword.value,
  });
  console.log(data);

  if (data.code != 200) {
    if (data.code == 404002) {
      failedLoginAlert("無此帳號");
      return;
    } else if (data.code == 401002) {
      failedLoginAlert("密碼錯誤");
      return;
    } else {
      failedLoginAlert("未知錯誤");
      return;
    }
  }

  localStorage.setItem("token", data.accessToken);
  router.push({ name: "Device" });
};

const registerAccount = ref("");
const registerPassword = ref("");
const registerPasswordRepeat = ref("");
const registerName = ref("");
const registerEmail = ref("");

const submitRegisterForm = async () => {
  if (registerPassword.value != registerPasswordRepeat.value) {
    failedRegisterAlert("密碼不相同");
    return;
  }

  const result = await sendRequest("post", "auth/register", {
    account: registerAccount.value,
    password: registerPassword.value,
    name: registerName.value,
    email: registerEmail.value,
  });

  if (result.code != 200) {
    // console.log({ result });
    if (result.code == 409001) {
      failedRegisterAlert("帳號已存在");
    } else if (result.code == 400001) {
      failedRegisterAlert("請填寫正確欄位");
    } else {
      failedRegisterAlert("未知的錯誤");
    }

    return;
  }
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
