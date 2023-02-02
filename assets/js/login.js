let spinner = async(id, status) => {
    switch (status) {
        case "loading":
            $(id).html(`<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>&nbsp;Loading...`);
            break;
        case "success":
            $(id).html(`<span><i class="fas fa-check"></i>&nbsp;Success</span>`);
            break;
        case "default":
            $(id).html(`Sign In`);
            break;
    }
}

$('#login').on('submit', async(e) => {
    e.preventDefault();
    try {
        let data = $('form').serializeArray();
        let loginPromise = new Promise((resolve, reject) => {
            $.ajax({
                url: '/api/login',
                type: 'POST',
                data: {
                    email: data[0].value,
                    password: data[1].value
                },
                beforeSend: () => {
                    spinner('#loginBtn', 'loading');
                },
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    spinner('#loginBtn', 'default');
                    reject(e);
                }
            });
        });
        let response = await loginPromise;
        console.log(response);
        if (response.ok) {
            spinner('#loginBtn', 'success');
            $.ajax({
                url: '/api/setSession',
                type: 'POST',
                data: {
                    token: response.accessToken
                },
                beforeSend: () => {},
                success: (result) => {
                    resolve(result);
                },
                error: (e) => {
                    reject(e);
                }
            });
        } else {
            spinner('#loginBtn', 'default');
            $('#errorDiv').html(`
                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                    <span id="errorMessage">${response.message}</span>
                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            `);
        }
    } catch (e) {
        console.error(e);
    }

});