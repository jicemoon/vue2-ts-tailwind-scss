<template>
  <svg class="Global-SvgIcon" :style="styleSheet">
    <use :xlink:href="`#icon-${icon}`" />
  </svg>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: '',
    },
  },
  computed: {
    styleSheet() {
      const rtn: { [key: string]: any } = {};
      if (this.size) {
        rtn.width = this.size;
        rtn.height = this.size;
      }
      return rtn;
    },
  },
});
</script>
