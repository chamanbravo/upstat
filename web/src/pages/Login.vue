<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref("")
const password = ref("")

const login = () => {
  if (!username.value || !password.value) {
    console.log("dumb fuck");
  } else {
    router.push("/app/monitors")
  }
}
</script>

<template>
  <div
    class="bg-[hsl(var(--card))] border min-w-[400px] p-2 rounded flex flex-col gap-4 py-6  px-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div class="flex flex-col">
      <h1 class="text-lg font-semibold">Welcome Back!</h1>
      <p>Login to your account</p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="username">Username</label>
      <input v-model="username" type="username" placeholder="username" />
    </div>
    <div class="flex flex-col gap-1">
      <label for="password">Passsword</label>
      <input v-model="password" type="password" placeholder="password" />
    </div>
    <button @click="login" class="bg-violet-600 rounded p-[0.3rem] hover:bg-violet-800">Login</button>
    <router-link to="/register" class="underline text-center cursor-pointer text-[hsl(var(--muted-foreground))]">Don't
      have an account? Sign Up</router-link>
  </div>
</template>
