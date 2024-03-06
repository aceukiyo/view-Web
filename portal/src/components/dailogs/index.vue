<template>
  <ElDialog
    v-bind="getBindValue"
    :fullscreen="isFullscreen"
    destroy-on-close
    lock-scroll
    draggable
    top="0"
    :close-on-click-modal="false"
    :show-close="false"
  >
    <template #header="{ close }">
      <div class="flex justify-between items-center h-54px pl-15px pr-15px relative">
        <div class="h-54px flex justify-between items-center absolute top-[50%] right-15px translate-y-[-50%]"
        >
          <Icon
            v-if="fullscreen"
            class="mr-10px full-icon"
            :icon="isFullscreen ? 'radix-icons:exit-full-screen' : 'radix-icons:enter-full-screen'"
            color="var(--el-color-info)"
            hover-color="var(--el-color-primary)"
            @click="toggleFull"
          />
          <Icon
            class="close-icon"
            icon="ep:close"
            hover-color="var(--el-color-primary)"
            color="var(--el-color-info)"
            @click="close"
          />
        </div>
        <slot name="title">
          {{ title }}
        </slot>
      </div>
    </template>

    <ElScrollbar :style="dialogStyle">
      <slot></slot>
    </ElScrollbar>
    <template v-if="slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<script setup lang="ts">
import { ElDialog, ElScrollbar } from 'element-plus';
import { propTypes } from '../../utils/propType';
import { computed, useAttrs, ref, unref, useSlots, watch, nextTick } from 'vue';
import { isNumber } from '../../utils/is';

const slots = useSlots()

const props = defineProps({
  modelValue: propTypes.bool.def(false),
  title: propTypes.string.def('Dialog'),
  fullscreen: propTypes.bool.def(true),
  maxHeight: propTypes.oneOfType([String, Number]).def('400px')
})

const getBindValue = computed(() => {
  const delArr: string[] = ['fullscreen', 'title', 'maxHeight']
  const attrs = useAttrs()
  const obj = { ...attrs, ...props }
  for (const key in obj) {
    if (delArr.indexOf(key) !== -1) {
      delete (obj as any)[key];  // or  delete obj [key as keyof typeof obj]
    }
  }
  return obj;
})

const isFullscreen = ref(false);

const toggleFull = () => {
  isFullscreen.value = !unref(isFullscreen);
}

const dialogHeight = ref(isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight);

watch(
  () => isFullscreen.value,
  async (val: boolean) => {
    await nextTick()
    if (val) {
      const windowHeight = document.documentElement.offsetHeight;
      dialogHeight.value = `${windowHeight - 55 - 60 - (slots.footer ? 63 : 0)}px`;
    } else {
      dialogHeight.value = isNumber(props.maxHeight) ? `${props.maxHeight}px` : props.maxHeight;
    }
  },
  {
    immediate: true,
  }
)

const dialogStyle = computed(() => {
  return {
    height: unref(dialogHeight),
  }
})
</script>

<style lang="less">
.@{elNamespace}-overlay-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
}

.@{elNamespace}-dialog {
  margin: 0 !important;

  &__header {
    height: 54px;
    padding: 0;
    margin-right: 0 !important;
    border-bottom: 1px solid var(--el-border-color);
  }

  &__body {
    padding: 15px !important;
  }

  &__footer {
    border-top: 1px solid var(--el-border-color);
  }

  &__headerbtn {
    top: 0;
  }
  .full-icon {
    margin-right:10%;
    cursor: pointer;
  }
  .close-icon {
    margin-left: 98%;
    cursor: pointer;
  }
}
</style>