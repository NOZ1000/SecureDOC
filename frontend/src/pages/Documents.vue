<template>
  <div class="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">

    <!-- Site header -->
    <Header />

    <!-- Page content -->
    <main class="grow">
      
      <div v-if="!isAuth">
        <div class="absolute left-1/2 transform -translate-x-1/2 -mb-64 bottom-0 pointer-events-none -z-1" aria-hidden="true">
          <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-01">
                <stop stop-color="#FFF" offset="0%" />
                <stop stop-color="#EAEAEA" offset="77.402%" />
                <stop stop-color="#DFDFDF" offset="100%" />
              </linearGradient>
            </defs>
            <g fill="url(#illustration-01)" fill-rule="evenodd">
              <circle cx="1232" cy="128" r="128" />
              <circle cx="155" cy="443" r="64" />
            </g>
          </svg>
        </div>

        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-40 md:pb-20">
            <div class="max-w-3xl mx-auto text-center">
              <!-- 404 content -->
              <h1 class="h1 mb-4" data-aos="zoom-y-out">Unauthorized access prohibited</h1>
              <div class="mt-8">
                <router-link to="/signin" class="btn text-white bg-blue-600 hover:bg-blue-700">Login</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="pt-32 pb-12 md:pt-40 md:pb-20">
            <div class="max-w-3xl mx-auto text-center">
              <h1 class="h1 mb-4" data-aos="zoom-y-out">My Documents</h1>
              <div class="mt-8">
                <form 
                  @submit.prevent="createDocument"
                  class="flex flex-col max-w-md mx-auto p-8 bg-white shadow-md rounded-lg"
                >
                  <input v-model="content" type="text" class="form-input w-full text-gray-800" placeholder="Content of document..." />
                  <button class="btn text-white bg-blue-600 hover:bg-blue-700 mt-2">Create</button>
                </form>
              </div>
            </div>
          </div>

          <!-- List of documents -->
          <div class="max-w-md mx-auto mb-28">
            <router-link v-for="document in documents" :key="document.id" class="flex justify-between items-center p-4 rounded border border-gray-200 transition duration-300 ease-in-out bg-gray-100 shadow-md hover:bg-white hover:shadow-lg mb-3" :to="'/document/' + document.token">
              <div class="font-medium">Document {{ document.id }}</div>
              <svg class="w-4 h-4 fill-current text-blue-600 shrink-0 ml-6" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.707 1h-8v2h5.586L1 13.293l1.414 1.414L12.707 4.414V10h2V2a1 1 0 00-1-1z" />
              </svg>
            </router-link>
          </div>
        </div>
      </div>
      
    </main>

    <Footer />

  </div>
</template>
  
<script setup>
import Header from './../partials/Header.vue'
import Footer from './../partials/Footer.vue'
import { ref } from 'vue'
import axios from 'axios'


const isAuth = localStorage.getItem('auth') ? true : false

// get documents from the server
const documents = ref([])
axios.get(`http://${import.meta.env.VITE_BASE_URL}/documents`, {
  headers: {
    Authorization: localStorage.getItem('auth')
  }
})
.then(response => {
  documents.value = response.data
})
.catch(error => {
  console.log(error)
})

const content = ref('')

const createDocument = () => {
  axios.post(`http://${import.meta.env.VITE_BASE_URL}/create/document`, {
    content: content.value
  }, {
    headers: {
      Authorization: localStorage.getItem('auth')
    }
  })
  .then(response => {
    documents.value.push(response.data)
    content.value = ''
  })
  .catch(error => {
    console.log(error)
  })
}

</script>
