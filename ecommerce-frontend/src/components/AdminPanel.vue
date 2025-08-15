<template>
  <div class="container mt-5">
    <h1 class="mb-4">Admin Panel</h1>
    <div class="row">
      <div class="col-md-8">
        <h2>Products</h2>
        <div class="table-responsive">
          <table class="table table-hover table-bordered">
            <thead class="thead-dark">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <th scope="row">{{ product.id }}</th>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ formatPrice(product.price) }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-4">
        <h2>Add Product</h2>
        <form @submit.prevent="addProduct" class="mb-4">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              placeholder="Enter product name"
              required
            />
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="description"
              class="form-control"
              placeholder="Enter product description"
              required
            ></textarea>
          </div>
          <div class="form-group">
            <label for="price">Price</label>
            <input
              type="number"
              id="price"
              v-model="price"
              class="form-control"
              placeholder="Enter product price"
              required
            />
          </div>
          <div class="form-group">
            <label for="stock">Stock</label>
            <input
              type="number"
              id="stock"
              v-model="stock"
              class="form-control"
              placeholder="Enter product stock"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Add Product</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive, ref, onMounted } from 'vue';
import { useToast } from 'vue-toast-notification';

export default {
  name: 'AdminPanel',
  setup() {
    const products = reactive([]);
    const name = ref('');
    const description = ref('');
    const price = ref(0);
    const stock = ref(0);
    const toast = useToast();

    const fetchProducts = async () => {
      const response = await axios.get('http://localhost:3000/api/products');
      products.length = 0; // Clear the existing products
      response.data.forEach(product => {
        products.push(product);
      });
    };

    const addProduct = async () => {
      try {
        const newProduct = {
          name: name.value,
          description: description.value,
          price: parseFloat(price.value),
          stock: parseInt(stock.value)
        };
        await axios.post('http://localhost:3000/api/products', newProduct);
        toast.open({
          message: 'Product added successfully!',
          type: 'success',
          duration: 5000
        });
        fetchProducts();
        resetForm();
      } catch (error) {
        toast.open({
          message: 'An error occurred while adding the product.',
          type: 'error',
          duration: 5000
        });
      }
    };

    const deleteProduct = async (productId) => {
      try {
        await axios.delete(`http://localhost:3000/api/products/${productId}`);
        toast.open({
          message: 'Product deleted successfully!',
          type: 'success',
          duration: 5000
        });
        fetchProducts();
      } catch (error) {
        toast.open({
          message: 'An error occurred while deleting the product.',
          type: 'error',
          duration: 5000
        });
      }
    };

    const resetForm = () => {
      name.value = '';
      description.value = '';
      price.value = 0;
      stock.value = 0;
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR'
      }).format(price);
    };

    onMounted(fetchProducts);

    return {
      products,
      name,
      description,
      price,
      stock,
      addProduct,
      deleteProduct,
      formatPrice
    };
  }
};
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.table {
  margin-top: 20px;
}
.thead-dark th {
  background-color: #343a40;
  color: white;
}
</style>
