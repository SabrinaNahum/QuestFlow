// 自定义业务埋点上报地址（仅用于业务事件统计）
const DASHBOARD_API = 'https://base-dashboard-zeta.vercel.app/api/track'

// 自定义业务埋点：交易上报
export async function trackTransaction(appId: string, appName: string, userAddress: string | undefined, txHash: string) {
  try {
    await fetch(DASHBOARD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        user_address: userAddress?.toLowerCase(),
        tx_hash: txHash,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch {
    // 静默失败，不影响主流程
  }
}

export async function trackEvent(
  appId: string,
  appName: string,
  userAddress: string | undefined,
  eventType: string,
  eventData?: Record<string, any>
) {
  // 自定义业务埋点：通用事件上报
  try {
    await fetch(DASHBOARD_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        app_id: appId,
        app_name: appName,
        user_address: userAddress?.toLowerCase(),
        event_type: eventType,
        event_data: eventData,
        timestamp: new Date().toISOString(),
      }),
    })
  } catch {
    // 静默失败，不影响主流程
  }
}
