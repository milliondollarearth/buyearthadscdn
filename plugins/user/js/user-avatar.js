$(document).ready(function () {
    var inputElement = document.querySelector('#filepond');
    var fault_text = `Drag&Drop your picture or==<span class="filepond--label-action">Browse</span>`;
    var upload_text = $("#upload-text").val() ? $("#upload-text").val() : fault_text;
    var domain = window.location.protocol + '//' + window.location.host;
    var html_lang = document.documentElement.lang;
    var poster_url = $("#avatar-user").val();
    FilePond.registerPlugin(
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFilePoster
    );

    FilePond.setOptions({
        server: {
            url: domain + '/' + html_lang + '/account',
            process: {
                headers: {
                    'X-OCTOBER-REQUEST-FLASH': '1',
                    'X-OCTOBER-REQUEST-HANDLER': 'account::onImageUpload',
                    'X-OCTOBER-REQUEST-PARTIALS': '',
                    'X-Requested-With': 'XMLHttpRequest'
                }, method: 'POST', withCredentials: false, ondata: (formData) => {
                    return formData
                }, onload: function (response) {
                    var client_logo_json = JSON.parse(response);
                    if (client_logo_json.status == 1) {
                        var input_lg = $(".input-lg").val() ? $(".input-lg").val() : '#fff';
                        $(".filepond--root .filepond--image-preview").css("background-color", input_lg);
                        $(".filepond--root .filepond--image-canvas-wrapper").css("background-color", input_lg);
                        $(".filepond--image-preview-overlay-success").css("color", input_lg);
                        $("#filepond").append("<input name='changeavatar' type='hidden'  id='changeavatar' value='1'/>");
                    } else if (client_logo_json.status == -1) {
                        $("#imageResult").html(client_logo_json.info)
                    }
                    return response
                }, onerror: function (response) {
                }
            },
            revert: {
                headers: {
                    'X-OCTOBER-REQUEST-FLASH': '1',
                    'X-OCTOBER-REQUEST-HANDLER': 'account::onImageDelete',
                    'X-OCTOBER-REQUEST-PARTIALS': '',
                    'X-Requested-With': 'XMLHttpRequest'
                }, method: 'POST', withCredentials: false, onload: function (response) {
                    return response
                }, ondata: (formData) => {
                }, onerror: function (response) {
                }
            },
            restore: {},
            load: {},
            fetch: {},
            remove: {},
        }
    });

    const pond = FilePond.create(
        inputElement,
        {
            maxFiles: 1,
            labelIdle: upload_text,
            imagePreviewHeight: 100,
            imageResizeTargetWidth: 100,
            imageResizeTargetHeight: 100,
            stylePanelLayout: 'compact circle',
            styleLoadIndicatorPosition: 'center bottom',
            styleButtonRemoveItemPosition: 'center bottom',
            styleButtonProcessItemPosition: 'center bottom',
            styleProgressIndicatorPosition: 'center bottom',
            files: [{
                source: poster_url,
                serverId: '67890',
                options: {
                    type: 'local',
                    file: {
                        name: poster_url,
                        size: 3001025,
                        type: 'image/jpg, image/png, image/jpeg, image/gif'
                    },
                    metadata: {
                        poster: poster_url
                    }
                }
            }],
        }
    );
});