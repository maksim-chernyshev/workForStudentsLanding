document.addEventListener('DOMContentLoaded', function () {

    /* сюда вписать номер рефки по-умочанию */
    const DEFAULT_REF = '********'

    const expertsSwiper = document.querySelector('#experts')
    const studentsSwiper = document.querySelector('#students')
    const FAQItems = document.querySelectorAll('.faq__item')
    const headerSection = document.querySelector('header')
    const headerLinks = headerSection.querySelectorAll('[data-anchor]')
    const forms = document.querySelectorAll('form')
    const navigationModal = document.querySelector('[data-section="modalNav"]')
    const openNavigationModalButton = document.querySelector('[data-btn="openNavigation"]')
    const closeNavigationModalButton = document.querySelector('[data-btn="closeNavigation"]')
    const modalLinks = navigationModal.querySelectorAll('[data-anchor]')

    const urlParams = new URLSearchParams(window.location.search)

    /* Mobile modal */
    openNavigationModalButton?.addEventListener('click', showModal)

    closeNavigationModalButton?.addEventListener('click', hideModal)

    /* Header links */
    headerLinks?.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            if (link.dataset.anchor === 'hero') {
                const heroForm = document.querySelector('#hero-form')
                const nameInput = heroForm.querySelector('input[name="firstname"]')
                // headerSection.style.position = 'relative';
                nameInput.focus();
                scrollTo(heroForm, 'center')
                // headerSection.style.position = 'absolute';
            }
            const scrollTarget = document.querySelector(`#${link.dataset.anchor}`)
            scrollTo(scrollTarget, 'start')
        })
    })

    /* Modal links */
    modalLinks?.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const scrollTarget = document.querySelector(`#${link.dataset.anchor}`)
            hideModal();

            if (scrollTarget.id === 'hero') {
                const heroForm = document.querySelector('#hero-form')
                const nameInput = heroForm.querySelector('input[name="firstname"]')
                nameInput.focus()
            }
            scrollTo(scrollTarget, 'start')
        })
    })

    /* Forms */
    forms?.forEach(function(form) {
        const formAction = form.getAttribute('action')
        const inputs = form.querySelectorAll('input')

        /* подстановка корректных гет-параметров в экшн формы */
        if (urlParams.has('ref')) {
            form.setAttribute('action', `${formAction}?${urlParams.toString()}`)
        } else if (urlParams.toString()) {
            form.setAttribute('action', `${formAction}?ref=${DEFAULT_REF}&${urlParams.toString()}`)
        } else {
            form.setAttribute('action', `${formAction}?ref=${DEFAULT_REF}`)
        }

        /* проверка инпутов на заполнение и вывод красной рамки */
        inputs.forEach(function(input) {
            input.addEventListener('input', function() {
                input.checkValidity()
            })

            input.addEventListener('invalid', function() {
                if (input.value === '') {
                    input.classList.add('error')

                    setTimeout(function() {
                        input.classList.remove('error')
                    }, 5000)
                }
            })
        })
    })

    /* FAQ */
    FAQItems.forEach(function (item) {
        const togglingBtn = item.querySelector('button')
        togglingBtn.addEventListener('click', function (event) {
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

    function scrollTo(targetElement, position) {
        targetElement.scrollIntoView({
            block: position,
            behavior: 'smooth'
        })
    }

    function showModal() {
        document.body.classList.add('lock-scroll')
        navigationModal.classList.remove('hidden');
    }

    function hideModal() {
        document.body.classList.remove('lock-scroll')
        navigationModal.classList.add('hidden');
    }
})
