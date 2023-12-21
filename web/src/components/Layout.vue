<script setup lang="ts">
import { useRoute } from "vue-router"
import { Activity, Cog, LogOut, BellDot } from 'lucide-vue-next';

const location = useRoute()
</script>

<template>
    <main class="px-4 max-w-[1280px] mx-auto m-4 flex gap-16">
        <div
            class="flex-col border w-[250px] py-8 px-4 rounded h-[calc(100vh-2rem)] hidden md:flex md:sticky md:top-4 md:justify-between">
            <div class="w-full flex flex-col gap-1">
                <router-link to="/app/monitors" :class="{ 'active-link': location.path.includes('/app/monitors') }"
                    class="link">
                    <Activity :size="16" />
                    Monitors
                </router-link>
                <router-link to="/app/notifications"
                    :class="{ 'active-link': location.path.includes('/app/notifications') }" class="link">
                    <BellDot :size="16" />
                    Notifications
                </router-link>
                <router-link to="/app/settings" :class="{ 'active-link': location.path.includes('/app/settings') }"
                    class="link">
                    <Cog :size="16" />
                    Settings
                </router-link>
            </div>
            <router-link to="#" class="link">
                <LogOut :size="16" />
                Logout
            </router-link>
        </div>

        <slot></slot>
    </main>
</template>

<style scoped>
.link {
    @apply inline-flex gap-1 items-center px-4 py-1 rounded hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))] text-[hsl(var(--muted-foreground))] transition-all duration-200 w-full
}

.active-link {
    @apply bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]
}
</style>