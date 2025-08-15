<template>
  <div class="container mt-5">
    <h1 class="mb-4">Login</h1>
    <form @submit.prevent="login">
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'UserLogin',
  setup() {
    const email = ref('');
    const password = ref('');
    const router = useRouter();
    const toast = useToast();

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: email.value,
          password: password.value
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        toast.open({ message: 'Login successful!', type: 'success' });
        router.push('/');
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to login.', type: 'error' });
      }
    };

    return {
      email,
      password,
      login
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
