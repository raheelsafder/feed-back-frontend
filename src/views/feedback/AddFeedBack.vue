<template>
  <div class="center">
    <div class="register-form">
      <h2 style="text-align: center; margin-bottom: 20px;">Add Feed Back</h2>
      <div class="form-group">
        <label for="title">Enter Name</label>
        <input type="text" id="title" v-model="title" placeholder="Enter title" :class="{ 'error': !isTitleValid }"
               @input="validateTitle">
        <div class="error-message" v-if="!isTitleValid">Please enter a valid title</div>
      </div>
      <div class="form-group">
        <label for="description">Enter description</label>
        <input type="text" id="description" v-model="description" placeholder="Enter email"
               :class="{ 'error': !isDescriptionValid }"
               @input="validateDescription">
        <div class="error-message" v-if="!isDescriptionValid">Please enter a valid email</div>
      </div>
      <div class="form-group">
        <label for="feedbackType">Select Feedback Type:</label>
        <select style="width: 100%" id="feedbackType" v-model="category" @change="validateField"
                :class="{ 'error': !isValidField }">
          <option value="" disabled selected>Select Feedback Type</option>
          <option v-for="(option, index) in feedBackOptions" :key="index" :value="option.value">{{
              option.label
            }}
          </option>
        </select>
        <div class="error-message" v-if="!isValidField">Please enter a valid type</div>

      </div>

      <div class="form-group">
        <button @click="register" :class="!title || !description || !category ? 'disable' :''">Add
          Feed Back
        </button>
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
const feedBackOptions = ref([
  {label: 'Bug Report', value: 'bug report'},
  {label: 'Feature Request', value: 'feature request'},
  {label: 'Improvement', value: 'improvement'},
  {label: 'Suggestion', value: 'suggestion'}
]);
const title = ref('');
const description = ref('');
const category = ref('');
const isTitleValid = ref(true);
const isDescriptionValid = ref(true);
const isValidField = ref(true);
const validateTitle = () => {
  isTitleValid.value = title.value.trim().length > 0;
}
const validateField = () => {
  isValidField.value = category.value.trim().length > 0;
}


const validateDescription = () => {
  isDescriptionValid.value = description.value.trim().length > 0;
}
const register = async () => {
  if (description.value && category.value && title.value) {

    const response = await auth.addFeedBack({
      description: description.value,
      category: category.value,
      title: title.value
    });
    if (response.data.message === 'SUCCESS') {
      description.value = ''
      category.value = ''
      title.value = ''
      message.value = 'Feed back added successfully'
    } else {
      message.value = 'Facing error during adding feedback'
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

.form-group input, .form-group select {
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