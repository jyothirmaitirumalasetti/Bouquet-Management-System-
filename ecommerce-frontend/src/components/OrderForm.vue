<!-- src/components/OrderForm.vue -->
<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ isEditing ? 'Update Order' : 'Create Order' }}</h1>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="productId">Product ID</label>
        <input type="text" v-model="productId" class="form-control" id="productId" required />
      </div>
      <div class="form-group">
        <label for="quantity">Quantity</label>
        <input type="number" v-model="quantity" class="form-control" id="quantity" required />
      </div>
      <div class="form-group">
        <label for="status">Status</label>
        <input type="text" v-model="status" class="form-control" id="status" required />
      </div>
      <button type="submit" class="btn btn-primary">{{ isEditing ? 'Update Order' : 'Create Order' }}</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'OrderForm',
  props: {
    order: Object // Order object to be edited (if any)
  },
  data() {
    return {
      productId: this.order ? this.order.productId : '',
      quantity: this.order ? this.order.quantity : 1,
      status: this.order ? this.order.status : 'pending',
      isEditing: !!this.order // Check if we are editing an existing order
    };
  },
  setup() {
    const toast = useToast();
    return { toast };
  },
  methods: {
    async submitOrder() {
      const token = localStorage.getItem('token');
      try {
        if (this.isEditing) {
          await axios.put(
            `http://localhost:3000/api/orders/${this.order.id}`,
            {
              productId: this.productId,
              quantity: this.quantity,
              status: this.status
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          this.toast.open({ message: 'Order updated successfully!', type: 'success' });
        } else {
          await axios.post(
            'http://localhost:3000/api/orders',
            {
              productId: this.productId,
              quantity: this.quantity,
              status: this.status
            },
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
          this.toast.open({ message: 'Order created successfully!', type: 'success' });
        }
        this.$router.push('/orders');
      } catch (error) {
        this.toast.open({ message: error.response.data.error || 'Order submission failed.', type: 'error' });
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
