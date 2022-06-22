var loadingImage = (id, size) => {
    let seconds = 0;
    let caption;
    let loadingImagePath = 'https://dummyimage.com/' + size + '/000000/ffffff.jpg&text=';
    $('#' + id).addClass(id);
    setInterval(() => {
        caption = '⚫'.repeat(seconds % 5 + 1) + '⚪'.repeat(4 - seconds % 5);
        $('.' + id).attr('src', loadingImagePath + caption);
        seconds++;
    }, 500);
};

var loadingText = (id) => {
    let seconds = 0;
    let caption;
    $('#' + id).addClass(id);
    setInterval(() => {
        caption = '.'.repeat(seconds % 5 + 1);
        $('.' + id).html(caption);
        seconds++;
    }, 500);
};

var removeLoading = (arrId) => {
    arrId.forEach((item) => {
        $('#' + item).removeClass(item);
    });
}

let counter = () => {
    var counta = 0;
    /* Onscroll number counter */
    var statisticNumbers = $('.single-count');
    if (statisticNumbers.length) {
        var oTop = statisticNumbers.offset().top - window.innerHeight;
        if (counta == 0 && $(window).scrollTop() > oTop) {
            $('.count').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                    countNum: countTo
                }, {
                    duration: 1000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(this.countNum);
                    }
                });
            });
            counta = 1;
        }
    }
}

let extractContent = (s) => {
    var span = document.createElement('span');
    span.innerHTML = s;
    return span.textContent || span.innerText;
}

$.ajax({
    url: '/api/profile/getAll',
    type: "GET",
    beforeSend: () => {
        loadingImage('profile-main-image', '636x718');
        loadingImage('profile-about-image', '380x265');
        loadingText('organization-name');
        loadingText('organization-headline');
        loadingText('organization-motto');
    },
    success: (result) => {
        if (!result.fatal) {
            removeLoading(['profile-main-image',
                'profile-about-image',
                'organization-name',
                'organization-headline',
                'organization-motto'
            ]);
            $("#organization-name").html(result[0].organization_name);
            $("#organization-headline").html(result[0].organization_headline);
            $("#organization-motto").html(result[0].motto);
            $("#founder-name").html(`<span>${result[0].founder_name[0]}</span><h2 class="universal-h2">${result[0].founder_name.slice(1)}</h2>`);
            $("#founder-headline").html(result[0].headline);
            $("#profile-main-image").attr("src", "/assets/images/profile/" + result[0].main_image);
            $("#profile-about-image").attr("src", "/assets/images/profile/" + result[0].about_image);
            $('#about-me-1').html(`<span>${result[0].about_me_1[0]}</span>${result[0].about_me_1.slice(1)}`);
            $('#about-me-2').html(`<span>${result[0].about_me_2[0]}</span>${result[0].about_me_2.slice(1)}`);
            $('#facebook').attr('href', result[0].facebook_url);
            $('#instagram').attr('href', result[0].instagram_url);
            $('#youtube').attr('href', result[0].youtube_url);
        }
    },
    error: (e) => {
        console.log(e);
    }
});

(async() => {
    await $.ajax({
        url: '/api/books/getAll',
        type: "GET",
        beforeSend: () => {},
        success: (result) => {
            if (!result.fatal) {
                let books = '';
                result.forEach((book) => {
                    books += `
                    <div class="single-book">
                        <a href="#" class="single-book__img">
                            <img src="/assets/images/${book.image_path}" alt="single book and cd">
                            <div class="single-book_download">
                                <img src="/assets/images/download.svg" alt="book image">
                            </div>
                        </a>
                        <h4 class="single-book__title">${book.name}</h4>
                        <span class="single-book__price">Rp ${Intl.NumberFormat('id-ID').format(book.price)}</span>
                        <!-- star rating -->
                        <div class="rating">
                            <span>&#9734;</span>
                            <span>&#9734;</span>
                            <span>&#9734;</span>
                            <span>&#9734;</span>
                            <span>&#9734;</span>
                        </div>
                        <!-- star rating end -->
                    </div>`;
                });

                $('.books').html(books);
                $('#books-count').attr('data-count', result.length);
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
    await $.ajax({
        url: '/api/pages/getAll',
        type: "GET",
        beforeSend: () => {},
        success: (result) => {
            if (!result.fatal) {
                let pages = '';
                result.forEach((page) => {
                    pages += `
                    <a href="/blog/${page.title.split(" ").join('+')}">
                        <div class="single-blog">
                            <div class="single-blog__img">
                                <img src="/assets/images/${page.image_path}" alt="blog image">
                            </div>
                            <div class="single-blog__text">
                                <h4>${page.title}</h4>
                                <span>Posted in ${ page.time_posted.split("T")[0] } ${page.time_posted.split("T")[1].split(".")[0]}</span>
                                <p>${extractContent(decodeURI(page.contents))}</p>
                            </div>
                        </div>
                    </a>`;
                });

                $('.pages').html(pages);
                $('#pages-count').attr('data-count', result.length);
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
    await $.ajax({
        url: '/api/reviews/getAll',
        type: "GET",
        beforeSend: () => {},
        success: (result) => {
            if (!result.fatal) {
                let reviews = '';
                result.forEach((review) => {
                    reviews += `
                    <div>
                        <h2 class="universal-h2 universal-h2-bckg">What People Are Saying</h2>
                        <p>“${review.contents}”</p>
                        <img src="/assets/images/quotes.svg" alt="quotes svg">
                        <h4>${review.name}</h4>
                        <p>${review.job}</p>
                    </div>`;
                });

                $('.reviews').html(reviews);
                $('#reviews-count').attr('data-count', result.length);
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
    await $(window).scroll(() => {
        counter()
    });
    /* Blog slider */
    await $('.blog-slider').slick({
        slidesToShow: 2,
        prevArrow: '<span class="span-arrow slick-prev"><</span>',
        nextArrow: '<span class="span-arrow slick-next">></span>',
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });
    /* About me slider */
    await $('.about-me-slider').slick({
        slidesToShow: 1,
        prevArrow: '<span class="span-arrow slick-prev"><</span>',
        nextArrow: '<span class="span-arrow slick-next">></span>'
    });
})();