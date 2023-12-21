<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const username = ref("");
const email = ref("");
const password = ref("");

const register = () => {};
</script>

<template>
  <div
    class="bg-[hsl(var(--card))] border min-w-[400px] p-2 rounded flex flex-col gap-4 py-6 px-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
  >
    <div class="flex flex-col">
      <h1 class="text-lg font-semibold">Create an account</h1>
      <p>Enter your email below to create your account</p>
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="username">Username</Label>
      <Input
        id="username"
        type="username"
        placeholder="username"
        v-model="username"
      />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="john@mail.com"
        v-model="email"
      />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="password">Password</Label>
      <Input id="password" type="password" placeholder="" v-model="password" />
    </div>
    <Button @click="register">Register</Button>
    <router-link
      to="/"
      class="underline text-center cursor-pointer text-muted-foreground hover:text-muted-foreground/90"
      >Already have an account? Sign In</router-link
    >
  </div>
</template>
