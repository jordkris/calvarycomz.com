let spinner = async(status) => {
    switch (status) {
        case "loading":
            $('#status').html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Loading...`);
            break;
        case "saved":
            $('#status').html(`<span class="text-success"><i class="fas fa-check"></i>&nbsp;Changes Saved</span>`);
            break;
        case "error":
            $('#status').html(`<span class="text-danger"><i class="fas fa-exclamation-triangle"></i>&nbsp;Error Occured</span>`);
            break;
        case "loaded":
            $('#status').html(`<span class="text-success"><i class="fas fa-check"></i>&nbsp;Data Loaded</span>`);
            break;
    }
}

let getPageContents = async() => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/assets/data/pageContents.json',
            type: 'GET',
            beforeSend: () => {},
            success: (result) => {
                // if (!result.fatal) {
                resolve(result);
                // }
            },
            error: (e) => {
                reject(e);
            }
        });
    });
}

let updateToDB = async(e, updateContents = false) => {
    try {
        let id = e.target.id;
        let value = e.target.value.trim();
        if (value.length > 0) {
            // value = updateContents ? encodeURIComponent(value) : value;
            if (updateContents) {
                let currentPageContents = await getPageContents();
                currentPageContents[id] = value.replace(/\s\s+/g, ' ');
                console.log(currentPageContents);
                let formData = new FormData()
                formData.append('pageContents', new Blob([JSON.stringify(currentPageContents)], { type: "application/json" }), 'pageContents.json');
                $.ajax({
                    url: '/api/pages/updatePageContent/' + $(`#${id}`).attr('data-id'),
                    data: formData,
                    type: 'POST',
                    enctype: 'multipart/form-data',
                    contentType: false,
                    processData: false,
                    beforeSend: () => {
                        $(`#${id}`).removeClass('is-valid').addClass('is-loading');
                        spinner('loading');
                    },
                    success: (result) => {
                        $(`#${id}`).removeClass('is-invalid').addClass('is-valid');
                        spinner('saved');
                        if (!result.fatal) {
                            console.log(result);
                        }
                    },
                    error: (e) => {
                        console.error(e);
                        $(`#${id}`).removeClass('is-valid').addClass('is-invalid');
                        spinner('error');
                    }
                });
            } else {
                $.ajax({
                    url: '/api/db/update',
                    type: "POST",
                    data: {
                        table: $(`#${id}`).attr('data-table'),
                        column: $(`#${id}`).attr('data-column'),
                        value: value,
                        id: $(`#${id}`).attr('data-id')
                    },
                    beforeSend: () => {
                        $(`#${id}`).removeClass('is-valid').addClass('is-loading');
                        spinner('loading');
                    },
                    success: (result) => {
                        $(`#${id}`).removeClass('is-invalid').addClass('is-valid');
                        spinner('saved');
                    },
                    error: (e) => {
                        console.error(e);
                        $(`#${id}`).removeClass('is-valid').addClass('is-invalid');
                        spinner('error');
                    }
                });
            }
        } else {
            $(`#${id}`).removeClass('is-valid').addClass('is-invalid');
            spinner('error');
        }
    } catch (e) {
        console.error(e);
    }
}

(async() => {
    await $.ajax({
        url: '/api/db/get',
        type: 'POST',
        data: {
            table: 'profile',
            select: '*'
        },
        beforeSend: () => {},
        success: (result) => {
            if (!result.fatal) {
                $("#organization-name").val(result[0].organization_name);
                $("#organization-headline").val(result[0].organization_headline);
                $("#organization-motto").val(result[0].motto);
                $("#organization-photo").attr("src", "/assets/images/profile/" + result[0].main_image);
                $("#founder-name").val(result[0].founder_name);
                $("#founder-headline").val(result[0].headline);
                $("#founder-photo").attr("src", "/assets/images/profile/" + result[0].about_image);
                $('#biography-1').val(result[0].about_me_1);
                $('#biography-2').val(result[0].about_me_2);
                $('#facebook').val(result[0].facebook_url);
                $('#instagram').val(result[0].instagram_url);
                $('#youtube').val(result[0].youtube_url);
            }
        },
        error: (e) => {
            console.error(e);
        }
    });
    await $.ajax({
        url: '/api/db/get',
        type: 'POST',
        data: {
            table: 'books',
            select: '*'
        },
        beforeSend: () => {},
        success: (result) => {
            if (!result.fatal) {
                let books = '';
                result.forEach((book, i) => {
                    books += `
                        <div class="col-lg-12">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Book ${i+1}</h3>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-lg-4">
                                            <div class="magic-box text-center">
                                                <img class="magic-item" src="/assets/images/${book.image_path}" />
                                            </div>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="form-group">
                                                <label>Book Name</label>
                                                <input id="book-name-${book.id}" type="text" class="form-control" placeholder="Enter ..." value="${book.name}" data-table="books" data-column="name" data-id="${book.id}">
                                            </div>
                                            <div class="form-group">
                                                <label>Book Price</label>
                                                <input id="book-price-${book.id}" type="text" class="form-control" placeholder="Enter ..." value="${book.price}" data-table="books" data-column="price" data-id="${book.id}">
                                            </div>
                                            <div class="form-group">
                                                <label for="exampleInputFile">Change Book's Picture</label>
                                                <div class="input-group">
                                                    <div class="custom-file">
                                                        <input type="file" class="custom-file-input">
                                                        <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                                    </div>
                                                    <div class="input-group-append">
                                                        <span class="input-group-text">Upload</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });
                $('#books').html(books);
            }
        },
        error: (e) => {
            console.error(e);
        }
    });
    await $.ajax({
        url: '/api/db/get',
        type: 'POST',
        data: {
            table: 'pages',
            select: '*'
        },
        beforeSend: () => {},
        success: async(result) => {
            if (!result.fatal) {
                let pages = '';
                result.forEach((page, i) => {
                    pages += `
                    <div class="col-lg-6">
                        <div class="card">
                            <div class="card-header">
                                <h3 class="card-title">Blog ${i+1}</h3>
                            </div>
                            <!-- /.card-header -->
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-12">
                                        <div class="magic-box text-center">
                                            <img class="magic-item" src="/assets/images/${page.image_path}" />
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label>Blog Title</label>
                                            <input id="page-title-${page.id}" type="text" class="form-control" placeholder="Enter ..." value="${page.title}" data-table="pages" data-column="title" data-id="${page.id}">
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputFile">Thumbnail</label>
                                            <div class="input-group">
                                                <div class="custom-file">
                                                    <input type="file" class="custom-file-input">
                                                    <label class="custom-file-label" for="exampleInputFile">Choose file</label>
                                                </div>
                                                <div class="input-group-append">
                                                    <span class="input-group-text">Upload</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-12">
                                        <div class="form-group">
                                            <label>Contents</label>
                                            <textarea id="page-content-${page.id}" class="summernote" data-table="pages" data-column="contents" data-id="${page.id}">
                                                ${he.decode(page.contents)}
                                            </textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`;
                });
                $('#pages').html(pages);
                $('.summernote').summernote();
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
    await $.ajax({
        url: '/api/db/get',
        type: 'POST',
        data: {
            table: 'reviews',
            select: '*'
        },
        beforeSend: () => {},
        success: (result) => {
            if (!result.fatal) {
                let reviews = '';
                result.forEach((review, i) => {
                    reviews += `
                    <div class="col-lg-6">
                            <div class="card">
                                <div class="card-header">
                                    <h3 class="card-title">Review ${i+1}</h3>
                                </div>
                                <div class="card-body">
                                    <div class="form-group">
                                        <label>Reviewer's Name</label>
                                        <input id="review-name-${review.id}" type="text" class="form-control" placeholder="Enter ..." value="${review.name}" data-table="reviews" data-column="name" data-id="${review.id}">
                                    </div>
                                    <div class="form-group">
                                        <label>Reviewer's Job</label>
                                        <input id="review-job-${review.id}" type="text" class="form-control" placeholder="Enter ..." value="${review.job}" data-table="reviews" data-column="job" data-id="${review.id}">
                                    </div>
                                    <div class="form-group">
                                        <label>Reviewer's Content</label>
                                        <textarea id="review-contents-${review.id}" class="form-control" rows="3" placeholder="Enter ..." data-table="reviews" data-column="contents" data-id="${review.id}">${review.contents}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                });
                $('#reviews').html(reviews);
            }
        },
        error: (e) => {
            console.log(e);
        }
    });
    $(".summernote").on("summernote.blur", (e) => { // callback as jquery custom event 
        updateToDB(e, true);
    });
    $('input,textarea').change(async(e) => {
        await updateToDB(e);
    }).keyup(() => {
        spinner('loading');
    });

    // let pageContentsId = localStorage.getItem('pageContents');
    // console.log(pageContentsId);
    // setInterval(() => {
    //     JSON.parse(pageContentsId).forEach((id) => {
    //         if (localStorage.getItem(id)) {
    //             if (localStorage.getItem(id) === $(`#${id}`).summernote('code')) {
    //                 spinner('saved');
    //             } else {

    //                 spinner('loading');
    //             }
    //         } else {
    //             spinner('loaded');
    //         }
    //         localStorage.setItem(id, $(`#${id}`).summernote('code'));
    //         console.log(localStorage.getItem(id));
    //     });
    // }, 1000);
    await spinner('loaded');
})();