<form class="insta360-editor" id="insta360-editor1" data-cid="{cid}">
    <div class="header">[[myplugin:feedback_title]]</div>

    <div class="input-group" data-key="title">
        <div class="label">[[myplugin:title_label]]</div>
        <div class="text-count-group">
            <input type="text" placeholder="[[myplugin:title_placeholder]]" />
            <span class="text-count"></span>
        </div>
    </div>

    <div class="input-group" data-key="app">
        <div class="label">[[myplugin:product_label]]</div>
        <div>
            <select class="parent" placeholder="[[myplugin:select_placeholder]]"></select>
            <div class="child"></div>
        </div>
    </div>

    <div class="input-group" data-key="recurrence_procedure">
        <div class="label">[[myplugin:step_label]]</div>
        <textarea placeholder="[[myplugin:step_placeholder]]"></textarea>
    </div>

    <div class="input-group" data-key="recurrence_probability">
        <div class="label">[[myplugin:frequency_label]]</div>
        <select placeholder="[[myplugin:step_placeholder]]">
            <option value ="90%~100%">90%~100%</option>
            <option value ="50%~80%">50%~80%</option>
            <option value ="10%~50%">10%~50%</option>
            <option value ="<10%">&lt;10%</option>
        </select>
    </div>

    <div class="input-group" data-key="resumable">
        <div class="label">[[myplugin:can_resume_label]]</div>
        <div class="radio-group">
            <div class="my-radio active" data-value="1">[[myplugin:yes]]</div>
            <div class="my-radio" data-value="0">[[myplugin:no]]</div>
            <div class="text">[[myplugin:can_resume_tip]]</div>
        </div>
    </div>

    <div class="input-group" data-key="supplementary">
        <div class="label">[[myplugin:additional_label]]</div>
        <textarea placeholder="[[myplugin:additional_placeholder]]"></textarea>
    </div>

    <div class="input-group" data-key="contact_info">
        <div class="label">[[myplugin:contact_label]]</div>
        <input type="text" placeholder="[[myplugin:contact_placeholder]]" />
    </div>

    <div class="input-group" data-key="images">
        <div class="label">[[myplugin:upload_image_label]]</div>
        <div>
            <input style="display: none;" type="file" class="upload" accept="image/jpeg,image/png" />
            <div class="upload-group">
                <div class="upload-button">[[myplugin:upload_image_label]]</div>
                <div class="upload-tip">
                    <div>
                        <span class="text">[[myplugin:upload_type]] *jpg 、*jpeg 、*png</span>
                        <span class="text">[[myplugin:upload_max]] 50M</span>
                    </div>
                </div>
            </div>
            <div class="preview"></div>
        </div>
    </div>

    <div class="input-group" data-key="files">
        <div class="label">[[myplugin:upload_file_label]]</div>
        <div>
            <input style="display: none;" type="file" class="upload" accept="text/plain, application/zip, application/x-rar-compressed" />
            <div class="upload-group">
                <div class="upload-button">[[myplugin:upload_file_label]]</div>
                <div class="upload-tip">
                    <div>
                        <span class="text">[[myplugin:upload_type]] *zip 、*rar 、*txt</span>
                        <span class="text">[[myplugin:upload_max]] 50M</span>
                        <a class="link" href="[[myplugin:upload_file_link_href]]" target="_blank">[[myplugin:upload_file_link_text]]</a>
                    </div>
                    <div>[[myplugin:upload_file_tip]]</div>
                </div>
            </div>
            <div class="preview"></div>
        </div>
    </div>

    <div class="input-group" data-key="privacy">
        <div class="checkbox-group"><input type="checkbox" checked>  [[myplugin:privacy]]</div>
    </div>

    <button class="submit">[[myplugin:feedback_submit]]</button>

    <div data-role="lang" style="display: none;">
        <div data-lang-key="view_image_label">[[myplugin:view_image_label]]</div>
        <div data-lang-key="view_file_label">[[myplugin:view_file_label]]</div>
        <div data-lang-key="yes">[[myplugin:yes]]</div>
        <div data-lang-key="no">[[myplugin:no]]</div>
        <div data-lang-key="delete">[[myplugin:delete]]</div>
        <div data-lang-key="select_placeholder">[[myplugin:select_placeholder]]</div>
        <div data-lang-key="product_placeholder">[[myplugin:product_placeholder]]</div>
    </div>
</form>