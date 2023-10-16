<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const register = () => { };
</script>

<template>
    <div
        class="bg-[hsl(var(--card))] border min-w-[400px] p-2 rounded flex flex-col gap-4 py-6 px-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div class="flex flex-col">
            <h1 class="text-lg font-semibold">Create an account</h1>
            <p>Enter your email below to create your account</p>
        </div>
        <div class="flex flex-col gap-1">
            <label for="username">Username</label>
            <input v-model="username" type="username" placeholder="username" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="email">Email</label>
            <input v-model="email" type="email" placeholder="email" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="password">Passsword</label>
            <input v-model="password" type="password" placeholder="password" />
        </div>
        <button @click="register" class="bg-violet-600 rounded p-[0.3rem] hover:bg-violet-800">
            Register
        </button>
        <router-link to="/" class="underline text-center cursor-pointer text-[hsl(var(--muted-foreground))]">Already have an
            account? Sign In</router-link>
    </div>
</template>
