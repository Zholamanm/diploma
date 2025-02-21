import client, {removeTokenFromClient, setTokenToClient} from "../api/index.js";
import {LS_TOKEN, LS_USERS} from "@/_types";
import store from "../store/index";

const authApi = {
    async login(data) {
        return await client.post('http://localhost:8000/api/login', data).then(res => {
            this.setAuthorization(data.email, data.password, res.data.token);
            store.commit('setUser', res.data.user);
        });
    },
    setAuthorization(email, password, token) {
        const authdata = window.btoa(email + ':' + encodeURIComponent(password));

        localStorage.setItem(LS_USERS, JSON.stringify(authdata));
        localStorage.setItem(LS_TOKEN, token);

        setTokenToClient(token);

        store.commit('setAuth', token);
    },
    getToken() {
        return localStorage.getItem(LS_TOKEN);
    },
    getMyUser() {
        return client.get('http://localhost:8000/api/user-info').then(res => {
            store.commit('setUser', res.data);
            return res.data;
        });
    },
    async logout() {
        removeTokenFromClient();
        localStorage.removeItem(LS_USERS);
        localStorage.removeItem(LS_TOKEN);
        store.commit('removeAuth');
        store.commit('deleteUser');
        // if (bool)
        window.location.reload();
        // return await client.post('http://localhost:8000/api/logout').then(() => {

        // });
    },

    register(data) {
        return client.post('http://localhost:8000/api/register', data).then(res => res.data);
    },

    getPersonalDataWithApplication() {
        return client.get('http://localhost:8000/api/personal-data').then(res => res.data);
    },
    updateProfile(data) {
        return client.post('http://localhost:8000/api/update-profile', data).then(res => res.data);
    },

    sendCode(data) {
        return client.post('http://localhost:8000/api/send-restore-code', data).then(res => res.data);
    },
    confirmSmsCode(data) {
        return client.post('http://localhost:8000/api/confirm-restore-code', data).then(res => res.data);
    },
    resetPassword(data) {
        return client.post('http://localhost:8000/api/restore-password', data).then(res => res.data);
    }
};

export default authApi;
