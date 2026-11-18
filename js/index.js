$(document).ready(function(){

    /* MENU HAMBURGUER, OCULTAR E MOSTRAR */ 
    $('#menu').click(function(){
        $(this).toggleClass('fa-times')
        $('.navbar').toggleClass('nav-toggle')
        let expanded = $('.navbar').hasClass('nav-toggle')
        $(this).attr('aria-expanded', expanded).attr('aria-label', expanded ? 'Fechar menu' : 'Abrir menu')
    })

    function closeMenu(){
        $('#menu').removeClass('fa-times').attr('aria-expanded', 'false').attr('aria-label', 'Abrir menu')
        $('.navbar').removeClass('nav-toggle')
    }

    $('.navbar a').on('click', closeMenu)
    $(document).on('keydown', function(event){
        if(event.key === 'Escape' && $('.navbar').hasClass('nav-toggle')){
            closeMenu()
            $('#menu').trigger('focus')
        }
    })

    let scrollUpdatePending = false
    function updateNavigation(){
        scrollUpdatePending = false
        const top = $(window).scrollTop()
        if(top > 68){
            $('header .header-2').addClass('header-active')
        }else{
            $('header .header-2').removeClass('header-active')
        }

        $('section').each(function(){
            let height = $(this).height()
            let offset = $(this).offset().top - 200
            let id = $(this).attr('id')

            if(top >= offset && top < offset + height){
                $('.navbar ul li a').removeClass('active')
                $('.navbar').find(`[href="#${id}"]`).addClass('active')
            }
        })
    }
    $(window).on('scroll load resize', function(){
        if(!scrollUpdatePending){
            scrollUpdatePending = true
            window.requestAnimationFrame(updateNavigation)
        }
    })

    /* BANNER CARROSEL INFINITO */ 
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const carousel = $('.home-slider')
    const carouselToggle = $('.carousel-toggle')
    let carouselPlaying = !reducedMotion.matches

    carousel.owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: carouselPlaying,
        autoplayTimeout: 8000,
        smartSpeed: reducedMotion.matches ? 0 : 250,
        loop: true
    })
    function updateCarouselToggle(){
        carouselToggle.text(carouselPlaying ? 'Pausar apresentação' : 'Reproduzir apresentação')
    }
    updateCarouselToggle()
    carouselToggle.prop('hidden', false).on('click', function(){
        carouselPlaying = !carouselPlaying
        carousel.trigger(carouselPlaying ? 'play.owl.autoplay' : 'stop.owl.autoplay', carouselPlaying ? [8000] : [])
        updateCarouselToggle()
    })
    reducedMotion.addEventListener('change', function(event){
        carousel.data('owl.carousel').settings.smartSpeed = event.matches ? 0 : 250
        if(event.matches){
            carouselPlaying = false
            carousel.trigger('stop.owl.autoplay')
            updateCarouselToggle()
        }
    })
    $('.home-slider .owl-prev').attr('aria-label', 'Banner anterior')
    $('.home-slider .owl-next').attr('aria-label', 'Próximo banner')

    /* FUNÇÃO PRA ESCOLHER RELÓGIOS */
    $('.small-image button').click(function(){
        $(this).addClass('image-active').attr('aria-pressed', 'true').siblings().removeClass('image-active').attr('aria-pressed', 'false')

        let image = $(this).find('img').attr('src')

        $('.big-image img').attr('src', image).attr('alt', 'Relógio inteligente, imagem ' + ($(this).index() + 1))
    })

    /* FUNÇÃO PRA PRA FILTRAR ITENS DA GALERIA */
    $('.gallery .btn').click(function(){
        let filter = $(this).attr('data-filter')
        if(filter == 'all'){
            $('.gallery .box').show(400)
        }else{
            $('.gallery .box').not('.'+filter).hide(200)
            $('.gallery .box').filter('.'+filter).show(400)
        }

        $('.gallery .controls button').removeClass('button-active').attr('aria-pressed', 'false')
        $(this).addClass('button-active').attr('aria-pressed', 'true')
    })
})
