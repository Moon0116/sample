<template>
  <div>
    <!-- 지출 원형 차트 -->
    <v-chart
      v-if="expenseByCategory.length > 0"
      :option="option"
      autoresize
      style="height: 400px"
    />

    <!-- 지출 인사이트 메시지 -->
    <p v-if="topCategory" class="summary-message">
      💡 이번 달 가장 많은 지출을 한 카테고리는
      <strong>{{ topCategory }}</strong
      >입니다.
    </p>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useAnalysisStore } from '@/store/analysisStore'
import { useTransactionUtils } from '@/composables/useTransactionUtils'

// ECharts 관련 설정
import { use } from 'echarts/core'
import { PieChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'

use([
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer
])

//  분석 스토어 사용
const analysis = useAnalysisStore()
// 트랜잭션 유틸리티 사용
const utils = useTransactionUtils()

//  데이터 불러오기
onMounted(() => {
  analysis.fetchAnalysisData()
})

// 카테고리별 지출 요약 (ECharts에 바인딩할 데이터)
const expenseByCategory = computed(() => {
  const result = {}
  analysis.thisMonthExpenses.forEach(t => {
    result[t.categoryId] = (result[t.categoryId] || 0) + t.amount
  })

  return Object.entries(result).map(([id, amount]) => ({
    name: utils.getCategoryName(id),
    value: amount
  }))
})

// 가장 많이 지출한 카테고리 (analysisStore에서 계산된 값 활용)
const topCategory = computed(() => analysis.topExpenseCategory)

// 차트 옵션
const option = computed(() => ({
  title: {
    text: '이번 달 소비 패턴 분석',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}원 ({d}%)'
  },
  legend: {
    bottom: 10,
    left: 'center'
  },
  series: [
    {
      type: 'pie',
      radius: '60%',
      data: expenseByCategory.value,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      },
      label: {
        formatter: '{b}: {d}%'
      }
    }
  ]
}))
</script>
<style scoped>
.summary-message {
  margin-top: 16px;
  font-size: 1rem;
  text-align: center;
  color: #333;
}
</style>
