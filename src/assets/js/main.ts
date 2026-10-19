import 'bootstrap/dist/js/bootstrap.bundle.min.js'

const yearSpan = document.getElementById('yearSpan')
if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString()

const observers = document.querySelectorAll('.fade-in-up')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if ('IntersectionObserver' in window && !reduceMotion) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
  )

  observers.forEach(element => observer.observe(element))
} else {
  observers.forEach(element => element.classList.add('show'))
}

// Close the mobile menu after a section link is selected.
document.querySelectorAll<HTMLAnchorElement>('#mainNavbar a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const navbar = document.getElementById('mainNavbar')
    if (navbar?.classList.contains('show')) {
      document.querySelector<HTMLButtonElement>('[data-bs-target="#mainNavbar"]')?.click()
    }
  })
})
