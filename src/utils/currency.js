/**
 * Indonesian Rupiah currency formatter
 */
export function formatRupiah(amount) {
  if (isNaN(amount) || amount === null || amount === undefined) return 'Rp0'
  const num = parseInt(amount, 10)
  return 'Rp' + num.toLocaleString('id-ID').replace(/,/g, '.')
}

/**
 * Parse rupiah string back to number
 */
export function parseRupiah(str) {
  if (typeof str === 'number') return str
  return parseInt(String(str).replace(/[^0-9]/g, ''), 10) || 0
}
