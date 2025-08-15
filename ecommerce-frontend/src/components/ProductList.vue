<!-- src/components/ProductList.vue -->
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Products</h1>
    <div class="row">
      <div class="col-md-4" v-for="product in products" :key="product.id">
        <div class="card mb-4">
          <img class="card-img-top" :src="defaultImage" alt="Product image">
          <div class="card-body">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="card-text">₹{{ product.price }}</p>
            <input type="number" v-model="product.quantity" min="1" class="form-control mb-2" placeholder="Quantity">
            <button class="btn btn-primary" @click="addToCart(product)">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/cart" class="btn btn-success">Go to Cart</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'ProductList',
  data() {
    return {
      products: [],
      defaultImage: 'https://via.placeholder.com/150'
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error.response.data);
      }
    },
    async addToCart(product) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:3000/api/orders/cart',
          {
            orderLines: [{
              productId: product.id,
              quantity: product.quantity || 1,
              price: product.price
            }]
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        this.toast.open({ message: 'Product added to cart!', type: 'success' });
      } catch (error) {
        //if its 401 error, redirect to login page
        if (error.response.status === 401) {
          this.$router.push('/login');
        }
        this.toast.open({ message: error.response.data.error || 'Failed to add product to cart.', type: 'error' });
      }
    }
  },
  mounted() {
    this.fetchProducts();
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
