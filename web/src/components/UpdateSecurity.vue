<script setup lang="ts">
import { ref } from 'vue';

const currentPassword = ref<string>("")
const newPassword = ref<string>("")
const confirmPassword = ref<string>("")

const update = () => {

}
</script>

<template>
    <div class="flex flex-col max-w-[350px] gap-4">
        <div class="flex flex-col gap-1">
            <label for="currentPassword" class="text-[hsl(var(--muted-foreground))]">Current Password</label>
            <input v-model="currentPassword" type="password" placeholder="Current Password" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="newPassword" class="text-[hsl(var(--muted-foreground))]">New Password</label>
            <input v-model="newPassword" type="password" placeholder="New Password" />
        </div>
        <div class="flex flex-col gap-1">
            <label for="confirmPassword" class="text-[hsl(var(--muted-foreground))]">Confirm Password</label>
            <input v-model="confirmPassword" type="password" placeholder="Confirm Password" />
        </div>
        <button @click="update" class="bg-violet-600 rounded p-[0.3rem] hover:bg-violet-800">Update</button>
    </div>
</template>