<template>
  <div class="container card mt-5 p-3">
    <h2 class="mb-4">Login</h2>
    <form @submit.prevent="login">
      <div class="form-group mb-3 text-start">
        <label for="email">Email:</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          class="form-control"
          :class="{ 'is-invalid': errors.email }"
          required
        />
        <div v-if="errors.email" class="invalid-feedback">
          {{ errors.email[0] }}
        </div>
      </div>

      <div class="form-group mb-3 text-start">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          required
        />
        <div v-if="errors.password" class="invalid-feedback">
          {{ errors.password[0] }}
        </div>
      </div>

      <div v-if="globalError" class="alert alert-danger">
        {{ globalError }}
      </div>

      <div class="text-start">
        <button type="submit" class="btn btn-sm btn-dark">Login</button>
      </div>
    </form>
    <div class="mt-3 text-end">
      <p>Don't have an account? </p>
      <router-link to="/register" class="btn btn-dark btn-sm">Register here.</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginPage',
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {},
      globalError: null,
    };
  },
  methods: {
    async login() {
      this.globalError = null; 
      this.errors = {}; 

      try {
        const response = await axios.post('http://localhost:8000/api/login', this.form);
        localStorage.setItem('token', response.data.token);
        this.$router.push('/dashboard');
      } catch (error) {
        if (error.response) {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors || {};
          } 
          else if (error.response.status === 401) {
            this.globalError = error.response.data.error || 'Invalid credentials';
          } 
          else {
            this.globalError = 'An error occurred while communicating with the server';
          }
        } else {
          this.globalError = 'Network error. Please try again later.';
        }
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

h2 {
  text-align: center;
}

.invalid-feedback {
  display: block;
}

.alert {
  margin-top: 1rem;
}
</style>
