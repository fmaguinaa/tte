export const moveTo = (e, k) => {
  e.preventDefault()
  window.scrollTo({ top: k * window.innerHeight, behavior: 'smooth' });
}