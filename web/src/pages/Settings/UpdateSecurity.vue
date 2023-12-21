<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const currentPassword = ref<string>("");
const newPassword = ref<string>("");
const confirmPassword = ref<string>("");

const update = () => {};
</script>

<template>
  <div class="flex flex-col max-w-[350px] gap-4">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="currentPassword">Current Password</Label>
      <Input
        id="currentPassword"
        type="currentPassword"
        placeholder="Current Password"
        v-model="currentPassword"
      />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="newPassword">New Password</Label>
      <Input
        id="newPassword"
        type="newPassword"
        placeholder=""
        v-model="newPassword"
      />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="confirmPassword">Confirm Password</Label>
      <Input
        id="confirmPassword"
        type="confirmPassword"
        placeholder=""
        v-model="confirmPassword"
      />
    </div>

    <Button @click="update"> Update </Button>
  </div>
</template>
