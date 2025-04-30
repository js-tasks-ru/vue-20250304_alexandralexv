<script setup>
import { computed } from 'vue';

const props = defineProps({
  to: {
    type: [String, Object],
    required: false,
  },
  href: {
    type: String,
    required: false,
  },
});

const componentType = computed(() => {
  return props.to ? 'RouterLink' : 'a';
});

const componentProps = computed(() => {
  return props.to ? { to: props.to } : { href: props.href };
});
</script>

<template>
  <component :is="componentType" v-bind="componentProps" class="link">
    <slot>Link</slot>
  </component>
</template>

<style scoped>
.link {
  color: var(--color-text-primary);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>
