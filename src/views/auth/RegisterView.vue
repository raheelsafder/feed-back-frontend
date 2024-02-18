<template>
  <div class="center">
    <div class="register-form">
      <h2 style="text-align: center; margin-bottom: 20px;">Register</h2>
      <div class="form-group">
        <label for="name">Enter Name</label>
        <input type="text" id="name" v-model="name" placeholder="Enter name" :class="{ 'error': !isUsernameValid }"
               @input="validateUsername">
        <div class="error-message" v-if="!isUsernameValid">Please enter a valid name</div>
      </div>
      <div class="form-group">
        <label for="email">Enter Email</label>
        <input type="email" id="email" v-model="email" placeholder="Enter email" :class="{ 'error': !isUserEmailValid }"
               @input="validateUserEmail">
        <div class="error-message" v-if="!isUserEmailValid">Please enter a valid email</div>
      </div>
      <div class="form-group">
        <label for="password">Enter Password</label>
        <input type="password" id="password" v-model="password" placeholder="Enter password"
               :class="{ 'error': !isPasswordValid }"
               @input="validatePassword">
        <div class="error-message" v-if="!isPasswordValid">Please enter a valid password</div>
      </div>

      <div class="form-group">
        <button @click="register" :class="!email || !password ? 'disable' :''">Create
          Account
        </button>
      </div>
      <div>
        <RouterLink style="text-align: right; display: block; text-decoration: none" to="/login">Back to login
        </RouterLink>
      </div>
      <h4 v-if="message"
          style="width: calc(100% - 20px);; background-color: #7ab67a; padding: 10px 10px; color: #fff; border-radius: 8px">
        {{ message }}</h4>
    </div>
  </div>
</template>


<script setup>
import {onMounted, ref} from "vue";
import {useAuth} from "@/store/auth.js";

const message = ref('');

const auth = useAuth()
const name = ref('');
const email = ref('');
const password = ref('');
const isUsernameValid = ref(true);
const isUserEmailValid = ref(true);
const isPasswordValid = ref(true);
const validateUsername = () => {
  isUsernameValid.value = name.value.trim().length > 0;
}
const validatePassword = () => {
  isPasswordValid.value = password.value.trim().length > 0;
}

const validateUserEmail = () => {
  isUserEmailValid.value = name.value.trim().length > 0;
}
const register = async () => {
  if (email.value && password.value && name.value) {
    const response = await auth.register({email: email.value, password: password.value, name: name.value});
    email.value = ''
    password.value = ''
    name.value = ''
    if (response.data.message === 'SUCCESS') {
      email.value = ''
      password.value = ''
      name.value = ''
      message.value = 'User Added successfully'
    } else {
      message.value = 'Facing error during adding user'
    }
    setTimeout(() => {
      message.value = ''
    }, 2000)
  }
}
onMounted(() => {
});
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

.register-form {
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