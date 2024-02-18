import ApiService from "@/services/api-request";
import { defineStore } from "pinia";

export const useAuth = defineStore("auth", {
    state: () => {
        return {
            auth: {},
        };
    },
    getters: {
        getAuth: (state) => state.auth
    },
    actions: {
        login(payload) {
            return new Promise((resolve, reject) => {
                ApiService.PostRequest("/login", payload)
                    .then((response) => {
                        this.auth.token = response.data.body.token
                        this.auth.user = response.data.body.user
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },
        register(payload) {
            return new Promise((resolve, reject) => {
                ApiService.PostRequest("/register", payload)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },
        logout() {
            return new Promise((resolve, reject) => {
                ApiService.PostRequest("/logout")
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },
        feedBack(params) {
            return new Promise((resolve, reject) => {
                ApiService.GetRequest("/get-feedback",params)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },
        viewFeedBack(data) {
            return new Promise((resolve, reject) => {
                ApiService.PostRequest("/view-feedback",data)
                    .then((response) => {
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },
        addComment(data) {
            return new Promise((resolve, reject) => {
                ApiService.PostRequest("/add-comment",data)
                    .then((response) => {
                        useAuth()
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },
        addFeedBack(data) {
            return new Promise((resolve, reject) => {
                ApiService.PostRequest("/submit-feedback",data)
                    .then((response) => {
                        useAuth()
                        resolve(response);
                    })
                    .catch((error) => {
                        console.log("Error", error);
                        reject(error);
                    });
            });
        },

    },
    persist: true,
});