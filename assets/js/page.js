$.ajax({
    url: '/api/pages/get',
    type: "POST",
    data: {
        title: location.href.split("/").at(-1).split("+").join(" ")
    },
    beforeSend: () => {},
    success: (result) => {
        if (!result.fatal) {
            $('#title').html(result[0].title)
            $('#thumbnail').attr('src', '../assets/images/' + result[0].image_path)
            $('#contents').html(decodeURI(result[0].contents))
        }
    },
    error: (err) => {
        console.error(err);
    }
});