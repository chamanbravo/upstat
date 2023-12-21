<script setup lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Layout from "../../components/Layout.vue";
import CreateNotifications from "@/components/CreateNotifications.vue";

const name = ref<string>("");
const url = ref<string>("");

const location = useRoute();
const { id } = location.query;
</script>

<template>
  <Layout>
    <div
      class="w-full border rounded p-2 md:p-8 flex flex-col gap-10 col-span-full"
    >
      <div class="col-span-full flex items-start justify-between">
        <div class="flex w-full flex-col gap-1">
          <h1 class="font-cal text-xl md:text-3xl">Monitor</h1>
          <p class="text-muted-foreground">
            {{ id ? "Update" : "Create" }} your monitor.
          </p>
        </div>
      </div>

      <div class="flex flex-col gap-4 md:flex-row">
        <div class="w-full">
          <h3>Endpoint Check</h3>
          <p>The easiest way to get started.</p>
        </div>
        <div class="flex flex-col gap-8 w-full">
          <div class="grid w-full items-center gap-1.5">
            <Label for="name">Name</Label>
            <Input id="name" type="name" placeholder="Chadman" v-model="name" />
          </div>
          <div class="grid w-full items-center gap-1.5">
            <Label for="url">URL</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://chadman.com"
              v-model="url"
            />
          </div>
          <div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Frequency</SelectLabel>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5"> 5 minutes </SelectItem>
                  <SelectItem value="10"> 10 minutes </SelectItem>
                  <SelectItem value="20"> 20 minutes </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <div class="w-full">
          <h3>Notification Settings</h3>
        </div>
        <div class="flex flex-col gap-4 md:flex-row">
          <div class="w-full">
            <h4>Alerts</h4>
            <p class="max-w-xs">
              How do you want to get informed if things break?
            </p>
          </div>
          <div class="w-full w-max-sm">
            <h4>Notifications</h4>
            <p>Select the notification channels you want to be informed.</p>
            <CreateNotifications>
              <Button variant="outline" class="mt-4">Add Notifications</Button>
            </CreateNotifications>
          </div>
        </div>
      </div>

      <div class="flex gap-4 ml-auto">
        <Button variant="secondary" class="mt-4">Test Request</Button>
        <Button class="mt-4">Confirm</Button>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.frequency-select * {
  background: transparent;
}
</style>
