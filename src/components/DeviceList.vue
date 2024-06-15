<template>
  <div id="device">
    <header>
      <button @click="logout">登出</button>
    </header>
    <main>
      <h1>Device</h1>
      <button @click="showModal = true">新增設備</button>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span class="close" @click="showModal = false">&times;</span>
          <form @submit.prevent="submitDeviceForm">
            <div class="input-line">
              <label for="deviceName">設備名稱: </label>
              <input type="text" id="deviceName" v-model="deviceName" />
            </div>
            <div class="btn-submit">
              <button type="submit">新增</button>
            </div>
          </form>
          <!-- 可以在這裡添加你的表單或其他內容 -->
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { sendRequest } from "@/services/apiService";

const token = ref(null);
const router = useRouter();

const showModal = ref(false);

const failedCreateAlert = (text) => {
  Swal.fire({
    title: "新增失敗",
    text,
    icon: "error",
    confirmButtonText: "確認",
  });
};

const logout = () => {
  // 這裡處理登出邏輯
  localStorage.removeItem("token");
  router.push({ name: "Login" });
};

const deviceName = ref("");

const submitDeviceForm = async () => {
  console.log({ token: token.value });

  const data = await sendRequest(
    "post",
    "api/device",
    {
      deviceName: deviceName.value,
    }
    // `Bearer ${token.value}`
  );

  console.log(data);

  if (data.code != 200) {
    failedCreateAlert("新增設備失敗");
    return;
  } else {
    failedCreateAlert("新增設備成功");
    return;
  }
};

onMounted(() => {
  token.value = localStorage.getItem("token"); // 組件掛載後從 localStorage 獲取 token
});
</script>

<style>
#device {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  background-color: #42b983;
  padding: 20px;
}

button {
  background-color: #42b983;
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border: 1px solid #888;
  width: 300px;
  border-radius: 4px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.btn-submit {
  display: flex;
  justify-content: center;
}

.btn-submit > button {
  font-size: 18px;
  background-color: green;
  color: white;
  border: 0px;
  width: 25%;
  border-radius: 6%;
}

.btn-submit > button:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 25%;
  font-size: 32px;
}
</style>
