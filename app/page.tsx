// This page should never be reached - middleware redirects / to /tr
// But if it is reached, return null (middleware will handle redirect)
export default function RootPage() {
  return null
}
