<script setup lang="ts">
import { ref } from "vue";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const username = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");

const update = () => {};
</script>

<template>
  <div class="flex flex-col max-w-[350px] gap-4">
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="username">Username</Label>
      <Input
        id="username"
        type="username"
        placeholder="username"
        v-model="username"
      />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="firstName">First Name</Label>
      <Input
        id="firstName"
        type="firstName"
        placeholder="First Name"
        v-model="firstName"
      />
    </div>
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="lastName">Last Name</Label>
      <Input
        id="lastName"
        type="lastName"
        placeholder="Last Name"
        v-model="lastName"
      />
    </div>
    <Button @click="update"> Update </Button>
  </div>
</template>
