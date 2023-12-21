<script setup>
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "Response Time",
            backgroundColor: "#7c3aed",
            borderColor: "#7c3aed",
            borderWidth: 2,
            pointRadius: 0,
            data: [40, 39, 10, 40],
            cubicInterpolationMode: "monotone",
        },
    ],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
    },
};
</script>

<template>
    <div class="border rounded p-4 flex flex-col gap-4">
        <h1 class="font-normal">Response Time</h1>
        <div class="h-[300px]">
            <Line :data="data" :options="options" />
        </div>
    </div>
</template>