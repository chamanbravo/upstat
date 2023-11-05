<script setup lang="ts">
import Layout from "../components/Layout.vue";
import { MoreHorizontal } from 'lucide-vue-next';

const monitors = [
    {
        id: 1,
        name: "Chad",
        url: "https://www.sth.com",
        lastStatus: "200",
        frequency: "30"
    },
    {
        id: 2,
        name: "GOHD",
        url: "https://www.sth.com",
        lastStatus: "200",
        frequency: "30",
    }
]
</script>

<template>
    <Layout>
        <div class="w-full border rounded p-8 flex flex-col gap-10 col-span-full">
            <div class="col-span-full mr-12 flex items-start justify-between lg:mr-0">
                <div class="flex w-full flex-col gap-1">
                    <h1 class="font-cal text-3xl">Monitors</h1>
                    <p class="text-muted-foreground">Overview of all your monitors.</p>
                </div>
                <router-link to="/app/monitors/edit" class="bg-violet-600 rounded py-[0.3rem] px-4 hover:bg-violet-800">
                    Create
                </router-link>
            </div>


            <div class="col-span-full">
                <div class="rounded-md border">
                    <div class="w-full">
                        <table class="w-full caption-bottom text-sm">
                            <thead class="border-b bg-[hsl(var(--accent))]">
                                <tr>
                                    <th class="table-head">
                                        Name</th>
                                    <th class="table-head">
                                        URL</th>
                                    <th class="table-head">
                                        Last Status</th>
                                    <th class="table-head">
                                        Frequency</th>
                                    <th class="table-head">
                                    </th>
                                </tr>
                            </thead>
                            <tbody v-for="monitor in monitors" :key="monitor.id">
                                <tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                                    <td class="p-2 align-middle">
                                        <router-link :to="'/app/monitors/' + monitor.id"
                                            class="group flex items-center gap-2"><span class="relative flex h-2 w-2"><span
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
                                        <button>
                                            <MoreHorizontal
                                                class="hover:text-[hsl(var(--accent-foreground))] text-[hsl(var(--muted-foreground))]"
                                                :size="18" />
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<style scoped>
.table-head {
    @apply text-[hsl(var(--muted-foreground))] h-10 px-2 text-left align-middle font-medium whitespace-nowrap
}
</style>
