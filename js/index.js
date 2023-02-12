AOS.init();

$('#sec-5').find('.tab').on('click', function() {
    let index = $(this).index();
    changeContent(index);
})

$('#sec-5').find('.arrow').on('click', function() {
    let index = $(this).attr('data-dir');
    changeContent(index);
})



function changeContent(i) {
    $('#sec-5').find('.tab').removeClass('-active').eq(i).addClass('-active');
    $('#sec-5').find('.arrow').removeClass('-inactive').eq(i).addClass('-inactive');
    $('#sec-5').find('.content-wrap').find('p').hide().eq(i).fadeIn();
}

$('.play').on('click', function() {
    $('.popup-wrap').show();
})

$('.popup').find('.close').on('click', function() {
    $('.popup-wrap').hide();
    player.stopVideo();
})

$('.toggle-btn').on('click', function() {
    $(this).toggleClass('-active');
    $('.menu-container').toggle();
})

const secGroupAry = [
    ['#sec-1', '#sec-2', '#sec-3'],
    ['#sec-4', '#sec-5'],
    ['#sec-6'],
    ['#sec-7']
]

function rebuildSecH(g) {
    return secGroupAry[g].reduce((accumulator, currentValue) => $(currentValue).height() + accumulator, 0);
}

function scrollSpy(group, nowTop) {
    let headerH = $('header').height();
    let wh = $(window).height();
    let targetTop = $(secGroupAry[group][0]).offset().top;
    let targetH = rebuildSecH(group)
    return wh + nowTop - headerH > targetTop && wh + nowTop - headerH < targetTop + targetH;
}

$(window).on('scroll', function() {
    let nowTop = $(this).scrollTop();
    $('.menu-item').each(function(i, el) {
        console.log(i, el)
        scrollSpy($(el).attr('data-target'), nowTop) ? $(el).addClass('-active') : $(el).removeClass('-active')
    })
})

$('.menu-item').on('click', function() {
    let target = $(this).attr('data-target');
    if(window.matchMedia('(max-width: 980px)').matches) {
        $('.toggle-btn').toggleClass('-active');
        $('.menu-container').toggle();
    }
    $('html, body').animate({
        scrollTop: $(secGroupAry[target][0]).offset().top - $('header').height()
    })
})