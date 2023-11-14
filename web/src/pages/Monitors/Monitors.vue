<script setup lang="ts">
import Layout from "../../components/Layout.vue";
import MonitorItem from "./MonitorItem.vue";

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
        <div class="w-full border rounded p-2 md:p-8 flex flex-col gap-10 col-span-full">
            <div class="col-span-full flex items-start justify-between">
                <div class="flex w-full flex-col gap-1">
                    <h1 class="font-cal text-xl md:text-3xl">Monitors</h1>
                    <p class="text-muted-foreground">Overview of all your monitors.</p>
                </div>
                <router-link to="/app/monitors/edit" class="bg-violet-600 rounded py-[0.3rem] px-4 hover:bg-violet-800">
                    Create
                </router-link>
            </div>


            <div class="col-span-full">
                <div class="rounded-md border">
                    <div class="w-full overflow-auto">
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
                            <MonitorItem v-for="monitor in monitors" v-bind:monitor="monitor" :key="monitor.id" />
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
