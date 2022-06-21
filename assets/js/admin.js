$.ajax({
    url: '/api/profile/getAll',
    type: "GET",
    beforeSend: () => {},
    success: (result) => {
        if (!result.fatal) {
            $("#organization-name").val(result[0].name);
            $("#organization-headline").val(result[0].job);
            $("#organization-motto").val(result[0].motto);
            $("#organization-photo").attr("src", "/images/profile/" + result[0].main_image);
            $("#founder-name").val(result[0].nickname);
            $("#founder-headline").val(result[0].headline);
            $("#founder-photo").attr("src", "/images/profile/" + result[0].about_image);
            $('#biography-1').val(result[0].about_me_1);
            $('#biography-2').val(result[0].about_me_2);
            $('#facebook').val(result[0].facebook_url);
            $('#instagram').val(result[0].instagram_url);
            $('#youtube').val(result[0].youtube_url);
        }
    },
    error: (e) => {
        console.log(e);
    }
});
$.ajax({
    url: '/api/books/getAll',
    type: "GET",
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
                                            <img class="magic-item" src="/images/${book.image_path}" />
                                        </div>
                                    </div>
                                    <div class="col-lg-8">
                                        <div class="form-group">
                                            <label>Book Name</label>
                                            <input type="text" class="form-control" placeholder="Enter ..." value="${book.name}">
                                        </div>
                                        <div class="form-group">
                                            <label>Book Price</label>
                                            <input type="text" class="form-control" placeholder="Enter ..." value="${book.price}">
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
        console.log(e);
    }
});
$.ajax({
    url: '/api/pages/getAll',
    type: "GET",
    beforeSend: () => {},
    success: (result) => {
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
                                        <img class="magic-item" src="/images/${page.image_path}" />
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label>Blog Title</label>
                                        <input type="text" class="form-control" placeholder="Enter ..." value="${page.title}">
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
                                        <textarea class="summernote">
                                            ${page.contents}
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
$.ajax({
    url: '/api/reviews/getAll',
    type: "GET",
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
                                    <input type="text" class="form-control" placeholder="Enter ..." value="${review.name}">
                                </div>
                                <div class="form-group">
                                    <label>Reviewer's Job</label>
                                    <input type="text" class="form-control" placeholder="Enter ..." value="${review.job}">
                                </div>
                                <div class="form-group">
                                    <label>Reviewer's Content</label>
                                    <textarea class="form-control" rows="3" placeholder="Enter ...">${review.contents}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>`;
            });
            $('#reviews').html(reviews);
            $('.summernote').summernote();
        }
    },
    error: (e) => {
        console.log(e);
    }
});