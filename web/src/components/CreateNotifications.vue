<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <slot></slot>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Alerts</DialogTitle>
        <DialogDescription>
          Select the notification channels you want to be informed.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4 w-full">
        <div class="w-full inline-flex gap-4 items-center">
          <Label for="name" class="text-right"> Provider </Label>
          <Select class="w-full">
            <SelectTrigger class="w-full">
              <SelectValue placeholder="Provider" class="w-full max-w-sm" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="discord"> Discord</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="w-full inline-flex gap-4 items-center">
          <Label for="username" class="text-right"> Name </Label>
          <Input id="username" value="" class="max-w-sm" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit"> Create </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
