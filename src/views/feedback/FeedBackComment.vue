<template>
  <div class="feedback-view">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Author: {{ feedback.name ?? '' }}</h5>
        <h5 class="card-title">Feedback Title: {{ feedback.title }}</h5>
        <h5 class="card-title">Category: {{ feedback.category }}</h5>
        <p class="card-text">Detail: {{ feedback.description }}</p>
      </div>
    </div>
    <div class="comments">
      <h5>Comments:</h5>
      <div v-for="comment in feedback.comments" :key="comment.id" class="card comment-card">
        <div class="card-body">
          <span style="float: left;font-weight: bold; margin-right: 10px"> {{ !comment.user.name ? '' : comment.user.name }}:</span>
          <div class="comment-content" v-html="comment.content"></div>
        </div>
      </div>
    </div>
    <div class="add-comment">
      <div class="content-editable" contenteditable="true" @input="updateContent" ref="commentContentEditable">
        {{ newComment.content }}
      </div>
      <div class="comment-buttons">
        <button @click="applyStyle('bold')">Bold</button>
        <button @click="applyStyle('italic')">Italic</button>
      </div>
      <button @click="addComment" class="btn btn-primary">Add Comment</button>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useAuth} from "@/store/auth.js";
import {useRoute} from "vue-router";

const feedback = ref({
  name: '',
  title: '',
  category: '',
  description: '',
  comments: []
});

const newComment = ref({
  content: '',
  style: [] // for storing comment style information
});

const route = useRoute();
const commentContentEditable = ref(null); // Create a ref for the contenteditable div

const auth = useAuth();

const loadFeedback = async () => {
  const response = await auth.viewFeedBack({id: route.params.id});
  feedback.value = response.data.body;
};

const addComment = async () => {
  let content = newComment.value.content;

  const response = await auth.addComment({
    feed_back_id: route.params.id,
    content: content,
    style: []
  });

  feedback.value.comments.push(response.data.body);
  newComment.value.content = '';

  // Call the loadFeedback function again after adding the comment
  await loadFeedback();
};

onMounted(loadFeedback);

const updateContent = () => {
  newComment.value.content = commentContentEditable.value.innerHTML;
};

const applyStyle = (style) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString();
  const newNode = document.createElement(style === 'bold' ? 'b' : 'i');
  newNode.appendChild(document.createTextNode(selectedText));
  range.deleteContents();
  range.insertNode(newNode);

  updateContent(); // Update the contenteditable div to reflect the changes
};
</script>

<style scoped>
.feedback-view {
  margin: 20px;
}

.card {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 15px;
}

.comment-card {
  margin-top: 10px;
  border: 1px solid #eee;
  border-radius: 5px;
}

.add-comment {
  margin-top: 20px;
}

.content-editable {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  min-height: 100px;
  margin-bottom: 10px;
}

.comment-buttons button {
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
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
</style>
