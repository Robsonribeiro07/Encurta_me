export function isValidUrl(link: string): boolean {
  try {
    new URL(link)
    return true
  } catch {
    return false
  }
}
