let getPageContents = async() => {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: '/assets/data/pageContents.json',
                type: "GET",
                beforeSend: () => {},
                success: (result) => {
                    if (!result.fatal) {
                        resolve(result);
                    }
                },
                error: (e) => {
                    reject(e);
                }
            });
        });
    }
    (async() => {
        let dataId = new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/pages/get',
                type: "POST",
                data: {
                    title: location.href.split("/").at(-1).split("+").join(" ")
                },
                beforeSend: () => {},
                success: (result) => {
                    if (!result.fatal) {
                        $('#title').html(result[0].title);
                        $('#thumbnail').attr('src', '../assets/images/' + result[0].image_path);
                        resolve(result[0].id);
                    }
                },
                error: (err) => {
                    reject(err);
                }
            });
        });

        $('#contents').html(decodeURIComponent((await getPageContents())[`page-content-${await dataId}`]));
    })()