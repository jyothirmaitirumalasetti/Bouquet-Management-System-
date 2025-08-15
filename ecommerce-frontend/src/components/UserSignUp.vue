<template>
  <div class="container mt-5">
    <h1 class="mb-4">Sign Up</h1>
    <form @submit.prevent="signup">
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" v-model="name" class="form-control" id="name" required />
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email address</label>
        <input type="email" v-model="email" class="form-control" id="email" required />
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">Address</label>
        <input type="text" v-model="address" class="form-control" id="address" required />
      </div>
      <div class="mb-3">
        <label for="phoneNumber" class="form-label">Phone Number</label>
        <input type="text" v-model="phoneNumber" class="form-control" id="phoneNumber" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" v-model="password" class="form-control" id="password" required />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Confirm Password</label>
        <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" required />
      </div>
      <button type="submit" class="btn btn-primary">Sign Up</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'UserSignUp',
  setup() {
    const name = ref('');
    const email = ref('');
    const address = ref('');
    const phoneNumber = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const router = useRouter();
    const toast = useToast();

    const signup = async () => {
      if (password.value !== confirmPassword.value) {
        toast.open({ message: 'Passwords do not match', type: 'error' });
        return;
      }

      try {
        const response = await axios.post('http://localhost:3000/api/auth/signup', {
          name: name.value,
          email: email.value,
          address: address.value,
          phoneNumber: phoneNumber.value,
          password: password.value,
          confirmPassword: confirmPassword.value
        });

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('isAdmin', response.data.isAdmin);
        router.push('/');
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to sign up.', type: 'error' });
      }
    };

    return {
      name,
      email,
      address,
      phoneNumber,
      password,
      confirmPassword,
      signup
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
}
</style>
