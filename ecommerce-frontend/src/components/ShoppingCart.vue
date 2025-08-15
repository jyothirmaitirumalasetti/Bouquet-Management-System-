<!-- src/components/ShoppingCart.vue -->
<template>
  <div class="container mt-5">
    <h1 class="mb-4">Shopping Cart</h1>
    <div v-if="!order || order.OrderLines.length === 0">
      <p>Your cart is empty.</p>
    </div>
    <div v-else>
      <ul class="list-group">
        <li class="list-group-item" v-for="line in order.OrderLines" :key="line.id">
          <div class="row align-items-center">
            <div class="col-md-2">
              <img :src="defaultImage" alt="Product image" class="img-fluid">
            </div>
            <div class="col-md-4">
              <h5>{{ line.Product.name }}</h5>
              <p>{{ line.Product.description }}</p>
            </div>
            <div class="col-md-2">
              <p>Quantity: {{ line.quantity }}</p>
              <p>Price: ₹{{ line.price }}</p>
            </div>
            <div class="col-md-2">
              <p>Total: ₹{{ line.price * line.quantity }}</p>
            </div>
            <div class="col-md-2 text-right">
              <button class="btn btn-danger" @click="removeItem(line.id)">Remove</button>
            </div>
          </div>
        </li>
      </ul>
      <div class="mt-3 text-right">
        <button class="btn btn-primary" @click="placeOrder" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'ShoppingCart',
  setup() {
    const order = ref(null);
    const loading = ref(false);
    const toast = useToast();
    const defaultImage = 'https://via.placeholder.com/150'

    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/orders/cart', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        order.value = response.data;
      } catch (error) {
        console.error('Error fetching cart:', error.response.data);
      }
    };

    const removeItem = async (lineId) => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/order-lines/${lineId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.open({ message: 'Item removed from cart', type: 'success' });
        fetchCart(); // Refresh the cart
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to remove item from cart.', type: 'error' });
      }
    };

    const placeOrder = async () => {
      try {
        loading.value = true;
        const token = localStorage.getItem('token');
        await axios.post(
          'http://localhost:3000/api/orders/place-order',
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        toast.open({ message: 'Order placed successfully!', type: 'success' });
        order.value = null; // Clear the cart
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to place order.', type: 'error' });
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchCart);

    return {
      order,
      removeItem,
      placeOrder,
      loading,
      defaultImage
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.img-fluid {
  max-height: 100px;
}
.list-group-item {
  margin-bottom: 10px;
}
</style>
