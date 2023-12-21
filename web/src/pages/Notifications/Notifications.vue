<script setup lang="ts">
import { BellIcon } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import Layout from "../../components/Layout.vue";
import CreateNotifications from "@/components/CreateNotifications.vue";
</script>

<template>
  <Layout>
    <div
      class="w-full border rounded p-2 md:p-8 flex flex-col gap-10 col-span-full"
    >
      <div class="col-span-full flex items-start justify-between">
        <div class="flex w-full flex-col gap-1">
          <h1 class="font-cal text-xl md:text-3xl">Notifications</h1>
          <p class="text-muted-foreground">
            Overview of all your notification channels.
          </p>
        </div>
        <CreateNotifications>
          <Button>Create</Button>
        </CreateNotifications>
      </div>
      <div class="flex flex-col gap-1 items-center border rounded-sm py-16">
        <BellIcon class="mb-2 text-muted-foreground" />
        <p>No notifications</p>
        <p class="mb-2">Create your first notification channel</p>
        <CreateNotifications>
          <Button>Create</Button>
        </CreateNotifications>
      </div>
    </div>
  </Layout>
</template>
