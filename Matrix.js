import { ref, computed, provide } from 'vue'
import MatrixItem from './MatrixItem.js'

export default {
  name: 'Matrix',
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    support: {
      type: Array,
      default: () => [2, 3, 4]
    },
  },
  components: {
    MatrixItem
  },
  setup(props, { expose }) {
    const gridTemplateValue = computed(() => {
      const matrix = props.data.matrix ?? 1
      return Array.isArray(matrix)
        ? `repeat(${matrix[0]}, 1fr) / repeat(${matrix[1]}, 1fr)`
        : `repeat(${matrix}, 1fr) / repeat(${matrix}, 1fr)`
    })

    const selectedItem = ref(null)
    
    const handleMatrixSelected = (item) => {
      console.log(item)
      selectedItem.value = item
    }

    provide('selectedItem', selectedItem)
    expose({ selectedItem })
      
    
    return {
      data: props.data,
      gridTemplateValue,
      handleMatrixSelected,
    }
  },
  template: /*html*/`
    <div class="matrix w-full h-full grid" :style="{ 'grid-template': gridTemplateValue, }">
      <MatrixItem v-for="item in (data.children?.length ? data.children : [data])" :key="item.id" :data="item" @selected="handleMatrixSelected" />
    </div>
  `
}
