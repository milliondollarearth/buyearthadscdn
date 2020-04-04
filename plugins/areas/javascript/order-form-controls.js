$(document).ready(function(){
    var fault_text = `Drag & Drop your picture or== <span class="filepond--label-action">Browse</span>`;
    var upload_text = $("#upload-text").val()?$("#upload-text").val():fault_text;
    $('#cp2').colorpicker();
    $('#cp2').on('colorpickerChange', function(event) {
        var input_lg = event.color.toString() ? event.color.toString() : '#fff';
        $(".filepond--root .filepond--image-preview").css("background-color",input_lg);
        $(".filepond--root .filepond--image-canvas-wrapper").css("background-color",input_lg);
    });
    var domain = window.location.protocol + '//' + window.location.host;
    var html_lang = document.documentElement.lang;
    FilePond.setOptions({
        server: {
            url: domain + '/' + html_lang + '/buy-now',
            process: {
                headers: {
                    'X-OCTOBER-REQUEST-FLASH': '1',
                    'X-OCTOBER-REQUEST-HANDLER': 'orderform::onImageUpload',
                    'X-OCTOBER-REQUEST-PARTIALS': '',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                method: 'POST',
                withCredentials: false,
                ondata: (formData) => {
                    return formData;
                },
                onload: function (response) {
                    var client_logo_json = JSON.parse(response);
                    if(client_logo_json.status == 1){
                        var input_lg = $(".input-lg").val() ? $(".input-lg").val() : '#fff';
                        $(".filepond--root .filepond--image-preview").css("background-color",input_lg);
                        $(".filepond--root .filepond--image-canvas-wrapper").css("background-color",input_lg);
                        var image_html = '<input type="hidden" name="image" value="'+ client_logo_json.info +'"/>';
                        $("#imageResult").html(image_html);
                        // $(".filepond--image-preview-overlay").css("color",'#555');
                        $(".filepond--image-preview-overlay-success").css("color",input_lg);
                    }else if(client_logo_json.status == -1){
                        $("#imageResult").html(client_logo_json.info);
                    }
                    return response;
                },
                onerror: function (response) {}
            },
            fetch: null,
            revert: {
                headers: {
                    'X-OCTOBER-REQUEST-FLASH': '1',
                    'X-OCTOBER-REQUEST-HANDLER': 'orderform::onImageDelete',
                    'X-OCTOBER-REQUEST-PARTIALS': '',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                method: 'POST',
                withCredentials: false,
                onload: function (response) {
                    return response;
                },
                ondata: (formData) => {},
                onerror: function (response) {}
            }
        }
    });
    FilePond.registerPlugin(
        FilePondPluginFileValidateType,
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
    );
    FilePond.create(
        document.querySelector('#filepond'),
        {
            labelIdle: upload_text,
            imagePreviewHeight: 170,
            imageResizeTargetWidth: 300,
            imageResizeTargetHeight: 300,
            stylePanelLayout: 'compact circle',
            styleLoadIndicatorPosition: 'center bottom',
            styleButtonRemoveItemPosition: 'center bottom',
            styleButtonProcessItemPosition: 'center bottom',
            styleProgressIndicatorPosition: 'center bottom'
        }
    );


    $("#country").change(function(){
        var html = '';
        var name = '';
        var country_id = $("#country option:selected").val();
        const html_lang = document.documentElement.lang?document.documentElement.lang:'en';
        if(country_id){
            $.request('orderform::onProvinceLists', {success: function(data) {
                    this.success(data).done(function() {
                        if(data){
                            $.each(data,function(index,val){
                                if(html_lang == 'ar'){
                                    name = val.province_ar;
                                }else if(html_lang == 'de'){
                                    name = val.province_de;
                                }else if(html_lang == 'es'){
                                    name = val.province_es;
                                }else if(html_lang == 'fr'){
                                    name = val.province_fr;
                                }else if(html_lang == 'jp'){
                                    name = val.province_jp;
                                }else if(html_lang == 'ko'){
                                    name = val.province_ko;
                                }else if(html_lang == 'zh-cn'){
                                    name = val.province_zh_cn;
                                }else{
                                    name = val.province_en;
                                }
                                html += '<option value="'+ val.id +'">'+ name +'</option>'
                            });
                            $("#provinceList").html('');
                            $("#provinceList").html(html);
                            $("#provinceList").parent().find(".filter-option-inner-inner").html(data[0]['province_zh_cn']);
                            $('#provinceList').selectpicker('refresh');
                            $(".buy_price_value").val('0.00');
                            $(".buy_price_value_hidden").val('0.00');
                        }else{
                            $("#provinceList").html(html);
                            $("#provinceList").parent().find(".filter-option-inner-inner").html('');
                        }
                    });
                },
                data: {lang:html_lang,country_id: country_id}
            });
        }
    });
    $("#provinceList").change(function(){
        var province_id = $("#provinceList option:selected").val();
        $.request('orderform::onReturnPrice', {success: function(data) {
                this.success(data).done(function() {
                    if(data.is_nobuy == 1){
                        $('#buy-alert-danger p').text("{{ 'BuyLists_Form_Url_Label'|_ }}");
                        $('#buy-alert-danger').attr("style","display:block");
                    }else if(data.is_nobuy == 0){
                        $('#buy-alert-danger').attr("style","display:none");
                        if(data.province_price){
                            $(".buy_price_value").val(data.province_price);
                            $(".buy_price_value_hidden").val(data.province_price);
                        }else{
                            $(".buy_price_value").val('0.00');
                            $(".buy_price_value_hidden").val('0.00');
                        }
                    }
                });
            }, data: {province_id: province_id}
        });
    });
});