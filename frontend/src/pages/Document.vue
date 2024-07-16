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

                <div>
                    <h1 class="h1 mb-4" data-aos="zoom-y-out">Document with id {{ document.id }}</h1>

                    <div class="mt-8">
                        <!-- Content of document -->
                        <div class="bg-white shadow-md rounded-lg p-6">
                            <p>{{ document.content }}</p>
                        </div>

                        <div class="mt-8">
                            <router-link to="/documents" class="btn text-white bg-blue-600 hover:bg-blue-700">Back to documents</router-link>
                        </div>
                    </div>
                </div>
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
import { useRoute } from 'vue-router'


const isAuth = localStorage.getItem('auth') ? true : false

const $route = useRoute()

const token = $route.params.token
// get the document with the token
const document = ref({})
axios.get(`http://${import.meta.env.VITE_BASE_URL}/document/${token}`)
    .then(response => {
        document.value = response.data
    })
    .catch(error => {
        console.log(error)
    })

</script>
