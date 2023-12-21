<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from 'vue-router'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from "@/components/ui/button"

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
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="username">Username</Label>
      <Input id="username" type="username" placeholder="username" v-model="username" />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="password">Password</Label>
      <Input id="password" type="password" placeholder="" v-model="password" />
    </div>

    <Button @click="login">Login</Button>
    <router-link to="/register"
      class="underline text-center cursor-pointer text-muted-foreground hover:text-muted-foreground/90">Don't
      have an account? Sign Up</router-link>
  </div>
</template>
