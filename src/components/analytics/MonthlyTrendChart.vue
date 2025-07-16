<template>
  <div>
    <div class="mb-3">
      <select v-model="selectedCategory">
        <option value="total">총 지출</option>
        <option v-for="cat in expenseCategories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <v-chart :option="chartOption" autoresize style="height: 300px" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAnalysisStore } from '@/store/analysisStore'
import { useTransactionUtils } from '@/composables/useTransactionUtils'
import { use } from 'echarts/core'
import { LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])

const store = useAnalysisStore()
const utils = useTransactionUtils()
const selectedCategory = ref('total') // 기본은 총 지출
const expenseCategories = computed(() =>
  store.categories.filter(cat => cat.id.startsWith('exp'))
)
onMounted(() => {
  store.fetchAnalysisData()
})

const chartOption = computed(() => {
  const months = ['2025-01', '2025-02', '2025-03', '2025-04']
  const data = months.map(month => {
    const monthData = store.getMonthlyExpenseByCategory[month]
    if (!monthData) return 0
    return selectedCategory.value === 'total'
      ? monthData.total || 0
      : monthData[selectedCategory.value] || 0
  })

  return {
    title: {
      text:
        selectedCategory.value === 'total'
          ? '총 지출 추세'
          : `${utils.getCategoryName(selectedCategory.value)} 지출 추세 그래프`,
      left: 'center'
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c}원'
    },
    xAxis: {
      type: 'category',
      data: ['1월', '2월', '3월', '4월']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: v => `${v.toLocaleString()}원`
      }
    },

    series: [
      {
        name: '지출',
        type: 'line',
        data: data,
        smooth: true,
        label: {
          show: true,
          formatter: '{c}원'
        },
        itemStyle: {
          color: '#e6226a'
        }
      }
    ]
  }
})
</script>

<style scoped>
select {
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid #ccc;
  font-size: 14px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 600;
}
</style>
