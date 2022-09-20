document.addEventListener('DOMContentLoaded', function () {

    /* сюда вписать номер рефки по-умочанию */
    const DEFAULT_REF = '******'

    const expertsSwiper = document.querySelector('#experts')

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
})
