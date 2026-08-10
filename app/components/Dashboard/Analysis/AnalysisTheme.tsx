'use client'

import {
  dashCardClass,
  useDashboardTheme,
  type DashboardTheme,
} from '../DashboardTheme'

/** @deprecated Use useDashboardTheme */
export function useAnalysisTheme() {
  return useDashboardTheme()
}

/** @deprecated Use dashCardClass */
export function analysisCardClass(theme: DashboardTheme) {
  return dashCardClass(theme)
}

export type AnalysisTheme = DashboardTheme
