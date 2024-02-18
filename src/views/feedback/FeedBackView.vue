<template>
  <div class="container">
    <router-link to="/add-feedback" style="text-decoration: none; background-color: #0056b3; padding: 10px 10px;color: #fff;
border-radius: 8px;margin-top: 10px; display:inline-block;">Add Feed Back
    </router-link>
    <button @click="logout" style="text-decoration: none; background-color: #000; padding: 10px 10px;color: #fff;
border-radius: 8px;margin-top: 10px; display:inline-block; border: none; float: right">Logout
    </button>
    <h1 class="heading">Feed Backs</h1>
    <table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td>{{ item.user_name }}</td>
        <td>{{ item.title }}</td>
        <td>{{ item.category }}</td>
        <td>
          <button @click="viewFeedBack(item)">View</button>
        </td>
      </tr>
      </tbody>
    </table>
    <span style="display: block; float: left; margin-top: 10px;">Total Feed Backs: {{ totalFeedBack }}</span>

    <div class="pagination" style="float: right">
      <button @click="previousPage" :disabled="currentPage === 1">Previous</button>


      <button @click="nextPage" :disabled="currentPage === lastPage">Next</button>
      <span>Show:</span>
      <select v-model="perPage" @change="changePerPage">
        <option v-for="option in perPageOptions" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useAuth} from "@/store/auth.js";
import router from "@/router/index.js";

const items = ref([]);
const totalFeedBack = ref('');
const auth = useAuth();
let currentPage = ref(1);
let perPage = ref(10);
let lastPage = ref(1);
const perPageOptions = [5, 10, 15, 20];
const viewFeedBack = async (item) => {
  await router.push({name: 'feedback-comment', params: {id: item.id}});
};


const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchData();
  }
};

const nextPage = () => {
  if (currentPage.value < lastPage.value) {
    currentPage.value++;
    fetchData();
  }
};


const changePerPage = () => {
  currentPage.value = 1;
  fetchData();
};
const fetchData = async () => {
  const response = await auth.feedBack({page: currentPage.value, per_page: perPage.value});
  if (response) {
    items.value = response.data.body.data;
    totalFeedBack.value = response.data.body.total;
    lastPage.value = response.data.body.last_page;
  }
};
const logout = async () => {
  const response = await auth.logout();
  localStorage.clear()
  if (response.data.message === 'SUCCESS') {
    await router.push('/login');
  }
}
onMounted(fetchData);
</script>

<style scoped>
.container {
  width: 100%;
}

button {
  text-decoration: none;
  background-color: #000;
  padding: 10px 10px;
  color: #fff;
  border-radius: 8px;
  margin-top: 4px;
  margin-left: 6px;
  margin-right: 6px;
  display: inline-block;
  border: none;
}

table,
tr,
td,
th {
  border: 1px solid;
  border-collapse: collapse;
}

table {
  width: 100%;
}

th,
td {
  text-align: left;
  padding: 10px 3px;
}

.heading {
  text-align: center;
}

.pagination {
  margin-top: 10px;
}

.pagination select {
  margin-left: 5px;
}
</style>
