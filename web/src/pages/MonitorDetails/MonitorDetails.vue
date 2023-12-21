<script setup lang="ts">
import Layout from "../../components/Layout.vue";
import LatencyChart from "./LatencyChart.vue";
// import { useRoute } from "vue-router"

// const { id } = useRoute().params
const data = [
    {
        date: "11/12/2321",
        status: 200,
        latency: 400,
    },
    {
        date: "11/12/2321",
        status: 200,
        latency: 400,
    },
    {
        date: "11/12/2321",
        status: 200,
        latency: 400,
    },
    {
        date: "11/12/2321",
        status: 200,
        latency: 400,
    },
    {
        date: "11/12/2321",
        status: 200,
        latency: 400,
    },
    {
        date: "11/12/2321",
        status: 200,
        latency: 400,
    },
];
</script>

<template>
    <Layout>
        <div class="w-full border rounded p-2 md:p-8 flex flex-col gap-10 col-span-full">
            <div class="col-span-full flex items-start justify-between">
                <div class="flex w-full flex-col gap-1">
                    <h1 class="font-cal text-xl md:text-3xl">Chad</h1>
                    <p class="text-muted-foreground">https://chad.com</p>
                </div>
            </div>

            <div class="flex justify-between border rounded px-8 py-4">
                <div class="flex flex-col items-center gap-1">
                    <h1>Response</h1>
                    <span class="text-xs">(Current)</span>
                    <p>96ms</p>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <h1>Avg Response</h1>
                    <span class="text-xs">(24 hour)</span>
                    <p>96ms</p>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <h1>Uptime</h1>
                    <span class="text-xs">(24 hour)</span>
                    <p>96ms</p>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <h1>Uptime</h1>
                    <span class="text-xs">(30 day)</span>
                    <p>96ms</p>
                </div>
                <div class="flex flex-col items-center gap-1">
                    <h1>Cert Exp.</h1>
                    <span class="text-xs">(2023-12-24)</span>
                    <p>33 days</p>
                </div>
            </div>
            <LatencyChart />

            <div class="col-span-full">
                <div class="rounded-md border">
                    <div class="w-full overflow-auto">
                        <table class="w-full caption-bottom text-sm">
                            <thead class="border-b bg-[hsl(var(--accent))]">
                                <tr>
                                    <th class="table-head">Date</th>
                                    <th class="table-head">Status</th>
                                    <th class="table-head">Latency</th>
                                </tr>
                            </thead>

                            <tbody v-for="item in data">
                                <tr class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
                                    <td class="p-2 align-middle">
                                        <span>{{ item.date }}</span>
                                    </td>
                                    <td class="p-2 align-middle">
                                        <div
                                            class="inline-flex items-center border rounded-full font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground px-2 py-0.5 text-xs bg-green-800 text-green-300">
                                            {{ item.status }}
                                        </div>
                                    </td>
                                    <td class="p-2 align-middle">
                                        <span class="font-mono">{{ item.latency }}</span>
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
    @apply text-[hsl(var(--muted-foreground))] h-10 px-2 text-left align-middle font-medium whitespace-nowrap;
}
</style>
