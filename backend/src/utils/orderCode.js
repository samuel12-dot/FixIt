export function generateOrderCode() {
  const digits = Math.floor(10000 + Math.random() * 89999);
  return `FX-${digits}`;
}
