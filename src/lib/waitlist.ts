export interface WaitlistResult {
  ok: boolean
  error?: string
}

export async function submitWaitlist(email: string): Promise<WaitlistResult> {
  // API integration will be connected later.
  await new Promise((resolve) => setTimeout(resolve, 800))
  void email
  return { ok: true }
}
