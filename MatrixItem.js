import { ref, computed, inject } from 'vue'

export default {
  name: 'MatrixItem',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const gridTemplateValue = computed(() => {
      const matrix = props.data.matrix ?? 1
      return Array.isArray(matrix)
        ? `repeat(${matrix[0]}, 1fr) / repeat(${matrix[1]}, 1fr)`
        : `repeat(${matrix}, 1fr) / repeat(${matrix}, 1fr)`
    })

    const handleMatrixContentClick = (item) => {
      emit('selected', item)
    }

    const selectedItem = inject('selectedItem')
      
    
    return {
      data: props.data,
      gridTemplateValue,
      handleMatrixContentClick,
      selectedItem,
    }
  },
  template: /*html*/`
    <div class="matrix-item w-full h-full grid" :style="{ 'grid-template': gridTemplateValue, }">
      <template v-if="data.children?.length">
        <MatrixItem v-for="item in data.children" :key="item.id" :data="item" @selected="$emit('selected', $event)" />
      </template>

      <template v-else>
        <div
          class="matrix-item-content border-2px flex justify-center items-center"
          :class="[selectedItem?.id === data.id ? 'border-red-800' : 'border-green-400']"
          :data-matrix-item-id="data.id"
          @click.stop="handleMatrixContentClick(data)"
        >
          <span>{{ data.id }}</span>
        </div>
      </template>
    </div>
  `
}
