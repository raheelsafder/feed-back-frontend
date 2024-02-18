<template>
  <div class="center">
    <div class="login-form">
      <h2 style="text-align: center; margin-bottom: 20px;">Login</h2>
      <div class="form-group">
        <label for="email">Enter Email</label>
        <input type="text" id="email" v-model="email" placeholder="Enter email" :class="{ 'error': !isUsernameValid }"
               @input="validateUsername">
        <div class="error-message" v-if="!isUsernameValid">Please enter a valid email</div>
      </div>
      <div class="form-group">
        <label for="password">Enter Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter password"
               :class="{ 'error': !isPasswordValid }"
               @input="validatePassword">
        <div class="error-message" v-if="!isPasswordValid">Please enter a valid password</div>
      </div>
      <div class="form-group">
        <button @click="login" :class="!email || !password ? 'disable' :''">Login</button>
      </div>
      <div>
        <RouterLink style="text-align: right; display: block; text-decoration: none" to="/register">Don't have account
        </RouterLink>
      </div>
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {useAuth} from "@/store/auth.js";
import router from "@/router/index.js";

const email = ref('');
const password = ref('');
const isUsernameValid = ref(true);
const isPasswordValid = ref(true);
const auth = useAuth();
const validateUsername = () => {
  isUsernameValid.value = email.value.trim().length > 0;
}
const validatePassword = () => {
  isPasswordValid.value = password.value.trim().length > 0;
}
const login = async () => {
  await auth.login({email: email.value, password: password.value});
  await router.push({name: 'feedback-view'});
}
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
}

.form-group input:focus {
  outline: none;
  border-color: #007bff;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
}

.form-group button:hover {
  background-color: #2d373f;
}

.login-form {
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: calc(100% - 20px); /* Adjusted width */
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-group button {
  width: 100%;
  padding: 10px;
  background-color: #0f1213;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.form-group .disable {
  background-color: #80888e;
  cursor: not-allowed;
}

.form-group button.disable:hover {
  background-color: #80888e !important;
}
</style>