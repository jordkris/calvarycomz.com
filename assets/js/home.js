var loadingImage = (id, size) => {
    let seconds = 0;
    let caption;
    let loadingImagePath = 'https://dummyimage.com/' + size + '/000000/ffffff.jpg&text=';
    $('#' + id).addClass(id);
    setInterval(() => {
        caption = '⚫'.repeat(seconds % 5 + 1) + '⚪'.repeat(4 - seconds % 5);
        $('.' + id).attr('src', loadingImagePath + caption);
        seconds++;
    }, 600);
};

var loadingText = (id) => {
    let seconds = 0;
    let caption;
    $('#' + id).addClass(id);
    setInterval(() => {
        caption = '.'.repeat(seconds % 5 + 1);
        $('.' + id).html(caption);
        seconds++;
    }, 600);
};

var removeLoading = (arrId) => {
    arrId.forEach((item) => {
        $('#' + item).removeClass(item);
    });
}

$.ajax({
    url: '/api/profile/getAll',
    type: "GET",
    beforeSend: () => {
        loadingImage('profile-main-image', '636x718');
        loadingImage('profile-about-image', '380x265');
        loadingText('profile-name');
        loadingText('profile-job');
        loadingText('profile-motto');
    },
    success: (result) => {
        if (!result.fatal) {
            setTimeout(() => {
                removeLoading(['profile-main-image',
                    'profile-about-image',
                    'profile-name',
                    'profile-job',
                    'profile-motto'
                ]);
                $("#profile-name").html(result[0].name);
                $("#profile-job").html(result[0].job);
                $("#profile-main-image").attr("src", "/images/profile/" + result[0].main_image);
                $("#profile-about-image").attr("src", "/images/profile/" + result[0].about_image);
                $("#profile-motto").html(result[0].motto);
            }, 3000);
        }
    },
    error: (e) => {
        console.log(e);
    }
});