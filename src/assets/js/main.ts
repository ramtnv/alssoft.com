import 'bootstrap/dist/js/bootstrap.bundle.min.js'

document.getElementById('yearSpan')!.textContent = new Date().getFullYear().toString()

const observers = document.querySelectorAll('.fade-in-up')
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show')
        io.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.15 }
)
observers.forEach(el => io.observe(el))
