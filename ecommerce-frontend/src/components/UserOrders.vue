<template>
  <div class="container mt-5">
    <h1 class="mb-4">My Orders</h1>
    <div v-if="orders.length === 0">
      <p>You have no orders.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card mb-3">
        <div class="card-header">
          <h5>Order #{{ order.id }}</h5>
          <p>Status: {{ order.status }}</p>
          <p>Placed on: {{ new Date(order.createdAt).toLocaleString() }}</p>
        </div>
        <ul class="list-group list-group-flush">
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
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'UserOrders',
  setup() {
    const orders = ref([]);
    const toast = useToast();
    const defaultImage = 'https://via.placeholder.com/150'

    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/api/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        orders.value = response.data;
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to fetch orders.', type: 'error' });
      }
    };

    onMounted(fetchOrders);

    return {
      orders,
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
.card-header {
  background-color: #f8f9fa;
}
</style>
