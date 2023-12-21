<script setup lang="ts">
import { ref } from 'vue';
import { MoreHorizontal, Trash, Pencil, KanbanSquare } from 'lucide-vue-next';

defineProps(['monitor'])

const actionState = ref<boolean>(false)
const cursorCord = ref<{ x: number, y: number }>()

const toggleAction = (e: MouseEvent) => {
    actionState.value = !actionState.value
    cursorCord.value = { x: e.clientX, y: e.clientY }
}
</script>

<template>
    <tbody>
        <tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
            <td class="p-2 align-middle">
                <router-link :to="'/app/monitors/' + monitor.id" class="group flex items-center gap-2"><span
                        class="relative flex h-2 w-2"><span
                            class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 duration-1000"></span><span
                            class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span></span><span
                        class="max-w-[125px] truncate group-hover:underline">{{ monitor.name
                        }}</span></router-link>
            </td>
            <td class="p-2 align-middle">
                <div class="flex"><span
                        class="max-w-[150px] truncate font-medium sm:max-w-[200px] lg:max-w-[250px] xl:max-w-[350px]">{{
                            monitor.url }}</span>
                </div>
            </td>
            <td class="p-2 align-middle">
                <div
                    class="inline-flex items-center border rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-0.5 text-xs bg-green-800 text-green-300">
                    {{ monitor.lastStatus }}
                </div>
            </td>
            <td class="p-2 align-middle">
                <span class="font-mono">{{ monitor.frequency }}m</span>
            </td>
            <td class="p-2 align-middle relative">
                <button @click="toggleAction">
                    <MoreHorizontal class="hover:text-[hsl(var(--accent-foreground))] text-[hsl(var(--muted-foreground))]"
                        :size="18" />
                </button>
            </td>
        </tr>
    </tbody>

    <div v-if="actionState" class="fixed top-0 left-0 z-10 w-full h-full" @click="toggleAction" />
    <div v-if="actionState" class="absolute bg-[hsl(var(--background))] z-20 flex flex-col gap-1 border py-2 px-2 rounded"
        :style="{ top: `${cursorCord?.y && cursorCord?.y + 6}px`, left: `${cursorCord?.x && cursorCord?.x - 70}px` }">
        <router-link :to="'/app/monitors/edit?id=' + monitor.id"
            class="link  text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
            <pencil :size="16" />
            Edit
        </router-link>
        <router-link :to="'/app/monitors/' + monitor.id"
            class="link  text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]">
            <KanbanSquare :size="16" />
            Details
        </router-link>
        <router-link to="#" class="link text-red-400 hover:bg-red-500 hover:text-white">
            <Trash :size="16" />
            Delete
        </router-link>
    </div>
</template>

<style scoped>
.link {
    @apply inline-flex gap-1 items-center px-2 py-1 rounded transition-all duration-200
}
</style>