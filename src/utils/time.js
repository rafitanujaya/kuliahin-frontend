export const normalizeTime = (time) => {
  // "10:00:00" → "10:00"
  return time?.slice(0, 5)
}