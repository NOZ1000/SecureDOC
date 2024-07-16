<template>
  <div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">

      <section class="bg-gradient-to-b from-gray-100 to-white">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-40 md:pb-20">

            <!-- Page header -->
            <div class="max-w-3xl mx-auto text-center pb-12 md:pb-20">
              <h1 class="h1">Welcome. Happy to see you.</h1>
            </div>

            <div>
              <div v-if="error" class="text-red-600 text-center mb-6">{{ error }}</div>
            </div>

            <!-- Form -->
            <div class="max-w-sm mx-auto">
              <form
                @submit.prevent="signUp">
                <div class="flex flex-wrap -mx-3 mb-4">
                  <div class="w-full px-3">
                    <label class="block text-gray-800 text-sm font-medium mb-1" for="email">Email <span class="text-red-600">*</span></label>
                    <input v-model="email" id="email" type="email" class="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-4">
                  <div class="w-full px-3">
                    <label class="block text-gray-800 text-sm font-medium mb-1" for="password">Password <span class="text-red-600">*</span></label>
                    <input v-model="password" id="password" type="password" class="form-input w-full text-gray-800" placeholder="Enter your password" required />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mt-6">
                  <div class="w-full px-3">
                    <button class="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign up</button>
                  </div>
                </div>

              </form>
              <div class="text-gray-600 text-center mt-6">
                Already using SecureDOC? <router-link to="/signin" class="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign in</router-link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import axios from 'axios';


export default {
  name: 'SignUp',
  components: {
    Header,
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
    }
  },
  methods: {
    async signUp() {
      try {
        const response = await axios.post(`http://${import.meta.env.VITE_BASE_URL}/register`, {
          email: this.email,
          password: this.password,
        });

        // Save the token in the local storage
        localStorage.setItem('auth', response.data.token);
        this.$router.push('/documents');
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
