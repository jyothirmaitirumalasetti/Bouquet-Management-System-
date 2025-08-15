<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">E-commerce</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <router-link class="nav-link" to="/signup">Sign Up</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/orders">My Orders</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link class="nav-link" to="/cart">Cart</router-link>
          </li>
          <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin">Admin Products</router-link>
          </li>
           <li class="nav-item" v-if="isAdmin">
            <router-link class="nav-link" to="/admin/orders">Admin Orders</router-link>
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <a class="nav-link" href="#" @click="logout">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      isLoggedIn: false,
      isAdmin: false
    };
  },
  methods: {
    checkLoginStatus() {
      this.isLoggedIn = !!localStorage.getItem('token');
      this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      this.isLoggedIn = false;
      this.isAdmin = false;
      this.$router.push('/login');
    }
  },
  mounted() {
    this.checkLoginStatus();
  },
  watch: {
    $route() {
      this.checkLoginStatus();
    }
  }
};
</script>

<style scoped>
.navbar {
  margin-bottom: 20px;
}
</style>
