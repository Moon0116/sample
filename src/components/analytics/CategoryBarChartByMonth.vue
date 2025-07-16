<template>
  <div class="category-chart-container">
    <!-- 월 선택 -->
    <div class="month-selector">
      <label for="month">월 선택:</label>
      <select id="month" v-model="selectedMonth">
        <option v-for="month in availableMonths" :key="month" :value="month">
          {{ utils.formatMonthLabel(month) }}
        </option>
      </select>
    </div>

    <!-- 막대그래프 -->
    <v-chart :option="option" autoresize class="chart" style="height: 300px" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAnalysisStore } from '@/store/analysisStore';
import { useTransactionUtils } from '@/composables/useTransactionUtils';

// ECharts 세팅
import { use } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer,
]);

const store = useAnalysisStore();
const utils = useTransactionUtils();

// 사용할 월 목록
const availableMonths = ['2025-01', '2025-02', '2025-03'];
const selectedMonth = ref('2025-03');

// 계산된 월별 카테고리 지출 (스토어에서 가져옴)
const categoryData = computed(() =>
  store.getCategoryExpenseByMonth(selectedMonth.value)
);

// 지출 카테고리 목록 (스토어에서)
const categories = computed(() => store.expenseCategories);

// 그래프 옵션
const option = computed(() => {
  const data = categories.value.map((cat) => ({
    name: cat.name,
    value: categoryData.value[cat.id] || 0,
  }));

  return {
    title: {
      text: `${utils.formatMonthLabel(selectedMonth.value)} 카테고리별 지출`,
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}원',
    },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.name),
      axisLabel: { rotate: 30 },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: (v) => `${v.toLocaleString()}원`,
      },
    },
    series: [
      {
        type: 'bar',
        data: data.map((d) => d.value),
        label: {
          show: true,
          position: 'top',
          formatter: '{c}원',
        },
        itemStyle: {
          color: '#4a90e2',
        },
      },
    ],
  };
});
</script>

<style scoped>
.category-chart-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  box-sizing: border-box;
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

select {
  padding: 6px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #fff;
}

.chart {
  width: 100%;
  aspect-ratio: 2 / 1;
  color: #a24388;
}
</style>
