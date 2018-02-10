function capitalizeEveryWord (str) {
  return str.replace(/\b[a-z]/g, char => char.toUpperCase())
}