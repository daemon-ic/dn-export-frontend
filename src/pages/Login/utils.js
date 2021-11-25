export function formatLogin(email, pass) {
  return `email=${encodeURIComponent(email)}&password=${encodeURIComponent(
    pass
  )}&remember=false`;
}
