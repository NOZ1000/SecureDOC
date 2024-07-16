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
              <h1 class="h1">Welcome back.</h1>
            </div>

            <div>
              <div v-if="error" class="text-red-600 text-center mb-6">{{ error }}</div>
            </div>

            <!-- Form -->
            <div class="max-w-sm mx-auto">
              <form 
                @submit.prevent="signIn">
                <div class="flex flex-wrap -mx-3 mb-4">
                  <div class="w-full px-3">
                    <label class="block text-gray-800 text-sm font-medium mb-1" for="email">Email</label>
                    <input
                      v-model="email"
                      id="email" type="email" class="form-input w-full text-gray-800" placeholder="Enter your email address" required />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mb-4">
                  <div class="w-full px-3">
                    <div class="flex justify-between">
                      <label class="block text-gray-800 text-sm font-medium mb-1" for="password">Password</label>
                      
                    </div>
                    <input 
                      v-model="password"
                      id="password" type="password" class="form-input w-full text-gray-800" placeholder="Enter your password" required />
                  </div>
                </div>
                <div class="flex flex-wrap -mx-3 mt-6">
                  <div class="w-full px-3">
                    <button class="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Sign in</button>
                  </div>
                </div>
              </form>
              <div class="flex items-center my-6">
                <div class="border-t border-gray-300 grow mr-3" aria-hidden="true"></div>
                <div class="text-gray-600 italic">Or</div>
                <div class="border-t border-gray-300 grow ml-3" aria-hidden="true"></div>
              </div>
              <div class="text-gray-600 text-center mt-6">
                Don’t you have an account? <router-link to="/signup" class="text-blue-600 hover:underline transition duration-150 ease-in-out">Sign up</router-link>
              </div>
            </div>

          </div>
        </div>
      </section>

    </main>

    <!-- Site footer -->

  </div>
</template>

<script>
import Header from './../partials/Header.vue'
import Footer from './../partials/Footer.vue'
import axios from 'axios'

export default {
  name: 'SignIn',
  components: {
    Header
  },
  data() {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async signIn() {
      try {
        const response = await axios.post(`http://${import.meta.env.VITE_BASE_URL}/login`, {
          email: this.email,
          password: this.password
        })
        
        // Save the token in the local storage
        localStorage.setItem('auth', response.data.token)

        if (response.data.token) {
          this.$router.push('/documents')
        }
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>
