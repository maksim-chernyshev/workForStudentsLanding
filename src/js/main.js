document.addEventListener('DOMContentLoaded', function () {

    /* сюда вписать номер рефки по-умочанию */
    const DEFAULT_REF = '********'

    const expertsSwiper = document.querySelector('#experts')
    const studentsSwiper = document.querySelector('#students')
    const FAQItems = document.querySelectorAll('.faq__item')

    /* FAQ */
    FAQItems.forEach(function(item) {
        const togglingBtn = item.querySelector('button')
        togglingBtn.addEventListener('click', function(event) {
            event.preventDefault()
            item.classList.toggle('active')
        })
    })

    /* Sliders */
    const swiperExperts = new Swiper(expertsSwiper, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
            768: {
                enabled: false,
                spaceBetween: 0
            }
        }
    })

    const swiperStudents = new Swiper(studentsSwiper, {
        slidesPerView: 'auto',
        spaceBetween: 20,
        breakpoints: {
            768: {
                enabled: false,
                spaceBetween: 0
            }
        }
    })
})
