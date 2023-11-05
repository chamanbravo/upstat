<script setup lang="ts">
import { ref } from 'vue';

const username = ref<string>("")
const firstName = ref<string>("")
const lastName = ref<string>("")

const update = () => {

}
</script>

<template>
    <div class="flex flex-col max-w-[350px] gap-4">
        <div class="flex flex-col gap-1">
            <label for="username" class="text-[hsl(var(--muted-foreground))]">Username</label>
            <input v-model="username" type="text" placeholder="username" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="firstName" class="text-[hsl(var(--muted-foreground))]">First Name</label>
            <input v-model="firstName" type="text" placeholder="First Name" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="lastName" class="text-[hsl(var(--muted-foreground))]">Last Name</label>
            <input v-model="lastName" type="text" placeholder="Last Name" />
        </div>
        <button @click="update" class="bg-violet-600 rounded p-[0.3rem] hover:bg-violet-800">Update</button>
    </div>
</template>