"use strict";

/*globals $, app, ajaxify, utils, socket, Slideout*/

$(document).ready(function () {
    function init($form, model , preRequestUrl) {
        var preRequest = function(data, doneHandler, failHandler) {
            $.ajax({
                url: preRequestUrl,
                data: data,
                method: 'POST'
            })
                .done(function(data) {
                    if (data.code === 0) {
                        doneHandler && doneHandler();
                    }
                })
                .fail(function(err) {
                    console.log(err);
                    failHandler && failHandler();
                })
        }

        // init form
        var uploadHandler = function (callback) {
            return function (e) {
                var file = e.target.files[0]
                if (file) {
                    var formData = new FormData();
                    formData.append('files[]', file);
                    formData.append('_csrf', config.csrf_token);
    
                    $.ajax({
                        url: config.relative_path + '/api/post/upload',
                        data: formData,
                        cache: false,
                        contentType: false,
                        processData: false,
                        method: 'POST'
                    })
                        .done(function (data) {
                            if (data[0]) {
                                callback(data[0]);
                            }
                        })
                        .fail(function () {
                            console.log(err);
                        })
                }
            }
        }

        model.forEach(function (ele) {
            var $label = $form.find('[data-key="' + ele.key + '"] .label');
            if (ele.label === undefined) {
                ele.label = $label.text();
            }
            
            if (!ele.optional) {
                $label.prepend('<span class="required">*</span>');
            }

            var $dom = $form.find('[data-key="' + ele.key + '"]');
            $dom.on('focus', 'input[type="text"],textarea', function () {
                $dom.removeClass('is-error');
            });

            switch (ele.type) {
                case 'image':
                case 'file':
                    ele.list = [];
                    var $btn = $form.find('[data-key="' + ele.key + '"] .upload-button');
                    var $upload = $form.find('[data-key="' + ele.key + '"] .upload');
                    var $preview = $form.find('[data-key="' + ele.key + '"] .preview');
                    $btn.click(function() {
                        $upload.trigger('click');
                    })

                    var updatePreview = function() {
                        $preview.html('');
                        var str = '';
                        ele.list.forEach(function (file, index) {
                            if (ele.type === 'image') {
                                str += '<div class="item-image"><img src="' + file.url + '"/><div class="delete-wrapper"><span class="delete" data-index="'+index+'">'+LANG['delete']+'</span></div></div>';
                            } else {
                                str += '<div class="item-file">' + file.name + '<span class="delete" data-index="'+index+'">'+LANG['delete']+'</span></div>';
                            }
                        });
                        $preview.html(str);
                    }
                    $preview.on('click', '.delete', function() {
                        ele.list.splice(parseInt($(this).attr('data-index')), 1);
                        updatePreview();
                    });
                    $upload.change(uploadHandler(function (data) {
                        ele.list.push(data);
                        updatePreview();
                    }));
                    break;
                case 'cascade':
                    var str1 = '';
                    ele.input.forEach(function (firstLevel, index) {
                        str1 += '<option value="' + firstLevel.tag + '">' + firstLevel.tag + '</option>';
                    });
                    $dom.find('.parent').html(str1);

                    var changeHandler = function () {
                        var nextIdx = parseInt($(this)[0].selectedIndex);
                        var parent = ele.input[nextIdx];

                        if (parent.nextLevel) {
                            var str2 = '<select data-key="version" placeholder="'+LANG['select_placeholder']+'">';
                            parent.nextLevel.forEach(function (secondLevel, index) {
                                str2 += '<option value="' + secondLevel + '">' + secondLevel + '</option>';
                            });
                            str2 += '</select>';

                            $dom.find('.child').html(str2);
                        } else {
                            $dom.find('.child').html('<input data-key="version" type="text" placeholder="'+LANG['product_placeholder']+'" />');
                        }
                    };

                    $dom.find('.parent').each(changeHandler);
                    $dom.find('.parent').change(changeHandler);
                    break;
                
                case 'cascade2':
                    var str1 = '';
                    ele.input.forEach(function (firstLevel, index) {
                        str1 += '<option value="' + firstLevel.tag + '">' + firstLevel.tag + '</option>';
                    });
                    $dom.find('.parent').html(str1);

                    var changeHandler = function () {
                        var nextIdx = parseInt($(this)[0].selectedIndex);
                        var parent = ele.input[nextIdx];

                        if (parent.nextLevel) {
                            $dom.find('.child').hide();
                        } else {
                            $dom.find('.child').show();
                        }
                    };

                    $dom.find('.parent').each(changeHandler);
                    $dom.find('.parent').change(changeHandler);
                    break;
                default:
            }
        })

        function getObj() {
            function getText(val) {
                return (typeof val === 'string' && val.trim().length > 0)?val:undefined;
            }

            var obj = {};
            model.forEach(function (ele) {
                switch (ele.type) {
                    case 'checkbox':
                        obj[ele.key] = $form.find('[data-key="' + ele.key + '"] input[type="checkbox"]')[0].checked;
                        break;
                    case 'image':
                    case 'file':
                        obj[ele.key] = ele.list.length > 0?ele.list:undefined;
                        break;
                    case 'cascade':
                        var $parent = $form.find('[data-key="' + ele.key + '"] .parent');
                        obj[ele.key] = getText($parent.val());

                        var $child = $form.find('[data-key="' + ele.child + '"]').children().first();
                        if ($child) {
                            obj[ele.child] = getText($child.val());
                        }
                        break;
                    case 'cascade2':
                        var $child = $form.find('[data-key="' + ele.key + '"] .child');
                        var $select = $form.find('[data-key="' + ele.key + '"] .parent');

                        obj[ele.key] = getText($child.css('display') !== 'none'?$child.find('input[type="text"]').val():$select.val());
                        break;
                    case 'select':
                        obj[ele.key] = getText($form.find('[data-key="' + ele.key + '"] select').val());
                        break;
                    case 'textarea':
                        obj[ele.key] = getText($form.find('[data-key="' + ele.key + '"] textarea').val());
                        break;
                    case 'radio':
                        obj[ele.key] = parseInt($form.find('[name="' + ele.key + '"]').val())?true:false;
                        break;
                    default:
                        obj[ele.key] = getText($form.find('[data-key="' + ele.key + '"] input[type="text"]').val());
                }
            })
            return obj;
        }

        function generate(obj) {
            var str = '<table class="insta360-table"><tbody>'

            model.forEach(function(ele) {
                var label = ele.label;
                var value = '';
                
                switch(ele.type) {
                    case 'image':
                    if (ele.list.length > 0) {
                        for (var j = 0; j !== ele.list.length; j++) {
                            value += '<a target="_blank" href="' + ele.list[j].url + '"><img src="' + ele.list[j].url + '" /></a>'
                        }
                    }
                    break;
                    case 'file':
                    if (ele.list.length > 0) {
                        for (var j = 0; j !== ele.list.length; j++) {
                            value += '<a target="_blank" href="' + ele.list[j].url + '">' + ele.list[j].name + '</a>'
                        }
                    }
                    break;

                    case 'checkbox':
                    break;

                    case 'radio':
                    if (obj[ele.key]) {
                        value = LANG['yes'];
                    } else {
                        value = LANG['no'];
                    }
                    break;

                    case 'cascade':
                    if (obj[ele.key] && obj[ele.child]) {
                        value = obj[ele.key] + ' , ' + obj[ele.child];
                    }
                    break;

                    default:
                    if(obj[ele.key]) {
                        value = obj[ele.key];    
                    }
                }

                if (obj.privacy && ele.private) {
                    value = '******';
                }

                if (ele.type !== 'checkbox') {
                    str += '<tr><td>' + label + '</td><td>' + value + '</td></tr>';
                }
            });

            str += '</tbody></table>'
            return str
        }



        var $submit = $form.find('.submit');
        var submitLock = false;

        $form.submit(function (e) {
            if (submitLock) return

            e.preventDefault();

            var obj = getObj();
            console.log(obj);

            var fail = false;
            model.forEach(function (ele) {
                switch (ele.type) {
                    case 'file':
                    case 'image':
                        break;
                    case 'cascade':
                        if (obj[ele.child] === undefined) {
                            fail = true;
                            $form.find('[data-key="' + ele.key + '"]').addClass('is-error');
                        }
                        break;
                    default:
                        if (!ele.optional) {
                            if (obj[ele.key] === undefined) {
                                fail = true;
                                $form.find('[data-key="' + ele.key + '"]').addClass('is-error');
                            }
                        }
                }
            })

            if (fail) {
                console.log('obj error');
            } else {
                console.log('obj correct', 'privacy:' + obj.privacy);

                submitLock = true;
                $form.find('.submit').attr('disabled', true);

                var doneHandler = function() {
                    socket.emit('topics.post', {
                        title: obj.title,
                        content: generate(obj),
                        cid: $form.attr('data-cid')
                    }, function (err, data) {
                        $submit.removeAttr('disabled');
                        if (err) {
                            if (err.message === '[[error:email-not-confirmed]]') {
                                return app.showEmailConfirmWarning(err);
                            }
        
                            return app.alertError(err.message);
                        }
        
                        if (data.queued) {
                            bootbox.alert(data.message);
                        } else {
                            ajaxify.go('topic/' + data.slug, undefined, false);
                        }
                    });
                }

                var failHandler = function() {
                    app.alertError('unvalid format');
                    submitLock = false;
                    $form.find('.submit').attr('disabled', false);
                }

                preRequest(obj, doneHandler, failHandler);
            }
        });
    }

    var productList = []
    try {
        productList = JSON.parse('[' + config['insta360-forum'].productList + ']');
    } catch (err) {
        console.log(err);
    }

    var LANG = {};

    $(window).on('action:ajaxify.end', function (ev, data) {

        if ($('#insta360-editor1,#insta360-editor2').length) {
            $('[data-role="lang"]').children().each(function() {
                var key = $(this).attr('data-lang-key');
                if (!LANG[key]) {
                    LANG[key] = $(this).text();
                }
            });
        }

        if ($('#insta360-editor1').length) {
            init($('#insta360-editor1'), [
                { type: 'text', key: 'title' },
                { type: 'cascade', key: 'app', input: productList, child: 'version' },
                { type: 'textarea', key: 'recurrence_procedure' },
                { type: 'select', key: 'recurrence_probability' },
                { type: 'radio', key: 'resumable' },
                { type: 'image', key: 'images', label: LANG['view_image_label'], optional: true },
                { type: 'file', key: 'files', label: LANG['view_file_label'], optional: true, private: true },
                { type: 'textarea', key: 'supplementary', optional: true },
                { type: 'text', key: 'contact_info', private: true },
                { type: 'checkbox', key: 'privacy', label: '' }
            ], 'https://openapi.insta360.com/forum/v1/publish/bugReport');
        }

        if ($('#insta360-editor2').length) {
            init($('#insta360-editor2'), [
                { type: 'text', key: 'title' },
                { type: 'cascade2', key: 'app', input: productList },
                { type: 'textarea', key: 'description' },
                { type: 'image', key: 'images', label: LANG['view_image_label'], optional: true },
                { type: 'file', key: 'files', label: LANG['view_file_label'], optional: true, private: true },
                { type: 'text', key: 'contact_info', private: true },
                { type: 'checkbox', key: 'privacy', label: '' }
            ], 'https://openapi.insta360.com/forum/v1/publish/suggestion');
        }
    });
})