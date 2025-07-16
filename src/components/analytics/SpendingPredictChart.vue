<template>
  <div>
    <v-chart :option="option" autoresize style="height: 300px" />
    <p v-if="predict" class="predict-message" :class="messageType">
      {{ message }}
    </p>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAnalysisStore } from '@/store/analysisStore'
import { useTransactionUtils } from '@/composables/useTransactionUtils'

// ECharts 설정
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
])

// 분석 스토어
const store = useAnalysisStore()
const utils = useTransactionUtils()

// 데이터 로딩
onMounted(() => {
  store.fetchAnalysisData()
})

// 예측 데이터
const predict = computed(() => store.predictExpense)
const trend = computed(() => predict.value?.trend || 0)
const average = computed(() => predict.value?.average || 0)

// 예측 메시지
const message = computed(() => {
  if (!predict.value) return ''
  const diff = trend.value - average.value
  const absDiff = Math.abs(diff).toLocaleString()

  return trend.value < average.value
    ? `💡 열심히 절약하고 계시네요! (지난달 평균 소비 금액보다 ${absDiff}원 덜 쓰는 추세)`
    : `💸 조금 소비를 줄여보는 건 어떨까요? (평균보다 ${absDiff}원 더 씀)`
})

// 메시지 색상 클래스
const messageType = computed(() => {
  if (!predict.value) return ''
  return trend.value < average.value ? 'positive' : 'negative'
})

// 차트 옵션 구성
const option = computed(() => ({
  title: {
    text: '4월 예상 소비 분석',
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    formatter: ({ 0: d }) => `${d.name}: ${utils.formatCurrency(d.value)}원`
  },
  grid: {
    left: 70,
    right: 20,
    bottom: 40,
    top: 40
  },
  xAxis: {
    type: 'value',
    axisLabel: {
      formatter: v => {
        if (v >= 1_000_000) return `${v / 10000}만`
        if (v >= 10_000) return `${v / 10_000}만`
        return `${v}`
      },
      fontSize: 11
    }
  },
  yAxis: {
    type: 'category',
    data: ['예상', '평균']
  },
  series: [
    {
      type: 'bar',
      data: [trend.value, average.value],
      label: {
        show: true,
        position: 'right',
        formatter: '{c}원'
      },
      itemStyle: {
        color: '#4a90e2'
      }
    }
  ]
}))
</script>

<style scoped>
.predict-message {
  margin-top: 12px;
  font-size: 1rem;
  text-align: center;
  font-weight: 500;
}
.positive {
  color: #025022;
}
.negative {
  color: #530404;
}
</style>
