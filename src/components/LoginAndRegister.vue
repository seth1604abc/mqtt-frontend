<template>
  <div class="container">
    <div class="form-container">
      <div class="form-wrapper"></div>
    </div>
    <div class="form-container">
      <div class="form-wrapper"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginAndRegister",
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url("/public/images/background2.jpg");
}

.form-wrapper {
  margin: 0px 20px;
  border: 1px solid #000;
  height: 50%;
  width: 25%;
  background-color: #fff;
}
</style>
