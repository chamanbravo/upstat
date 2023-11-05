<script setup lang="ts">
import Layout from '../components/Layout.vue';
import UpdateAccount from '../components/UpdateAccount.vue';
import UpdateSecurity from '../components/UpdateSecurity.vue';
import { ref } from 'vue';

const tab = ref(0)

</script>

<template>
    <Layout>
        <div class="w-full border rounded p-8 flex flex-col gap-10">
            <div class="col-span-full mr-12 flex items-start lg:mr-0">
                <div class="flex w-full flex-col gap-1">
                    <h1 class="font-cal text-3xl">Settings</h1>
                    <p class="text-muted-foreground">Your workspace settings.</p>
                </div>
            </div>

            <div class="flex flex-col gap-6">
                <div class="text-[hsl(var(--muted-foreground))] inline-flex gap-4 items-center w-full border-b">
                    <button class="font-medium px-4 pb-2" :class="{ 'border-b border-violet-300': tab === 0 }"
                        @click="tab = 0">Account</button>
                    <button class="font-medium px-4 pb-2" :class="{ 'border-b border-violet-300': tab === 1 }"
                        @click="tab = 1">Security</button>
                </div>

                <UpdateAccount v-if="tab === 0" />
                <UpdateSecurity v-if="tab === 1" />
            </div>
        </div>
    </Layout>
</template>