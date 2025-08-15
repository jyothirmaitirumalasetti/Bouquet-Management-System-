<template>
  <div class="container mt-5">
    <h1 class="mb-4">Order Management</h1>
    <div v-if="orders.length === 0">
      <p>No orders available.</p>
    </div>
    <div v-else>
      <div v-for="order in orders" :key="order.id" class="card mb-3">
        <div class="card-header d-flex justify-content-between align-items-center">
          <div>
            <h5>Order #{{ order.id }}</h5>
            <p>Status: {{ order.status }}</p>
            <p>Placed on: {{ new Date(order.createdAt).toLocaleString() }}</p>
          </div>
          <div>
            <button class="btn btn-primary me-2" @click="editOrder(order)">Edit</button>
            <button class="btn btn-danger" @click="deleteOrder(order.id)">Delete</button>
          </div>
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

    <!-- Edit Order Modal -->
    <div class="modal fade" id="editOrderModal" tabindex="-1" aria-labelledby="editOrderModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editOrderModalLabel">Edit Order</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form v-if="currentOrder" @submit.prevent="updateOrder">
              <div class="mb-3">
                <label for="status" class="form-label">Status</label>
                <select id="status" v-model="currentOrder.status" class="form-select">
                  <option value="new">New</option>
                  <option value="placed">Placed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button type="submit" class="btn btn-primary">Save changes</button>
            </form>
            <div v-else>
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';
import { Modal } from 'bootstrap'; // Import Bootstrap's Modal

export default {
  name: 'OrderAdmin',
  setup() {
    const orders = ref([]);
    const currentOrder = ref(null);
    const toast = useToast();
    const defaultImage = 'https://via.placeholder.com/150'
    let editOrderModal = null;

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

    const editOrder = (order) => {
      currentOrder.value = { ...order };
      editOrderModal = new Modal(document.getElementById('editOrderModal'));
      editOrderModal.show();
    };

    const updateOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        await axios.put(`http://localhost:3000/api/orders/${currentOrder.value.id}`, currentOrder.value, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.open({ message: 'Order updated successfully!', type: 'success' });
        fetchOrders(); // Refresh the orders
        editOrderModal.hide();
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to update order.', type: 'error' });
      }
    };

    const deleteOrder = async (orderId) => {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/api/orders/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        toast.open({ message: 'Order deleted successfully!', type: 'success' });
        fetchOrders(); // Refresh the orders
      } catch (error) {
        toast.open({ message: error.response.data.error || 'Failed to delete order.', type: 'error' });
      }
    };

    onMounted(fetchOrders);

    return {
      orders,
      currentOrder,
      editOrder,
      updateOrder,
      deleteOrder,
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
