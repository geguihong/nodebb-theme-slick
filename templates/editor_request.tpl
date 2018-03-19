<form class="insta360-editor" id="insta360-editor2" data-cid="{cid}">
    <div class="header">[[myplugin:suggestion_title]]</div>

    <div class="input-group" data-key="title">
        <div class="label">[[myplugin:suggestion_title_label]]</div>
        <div class="text-count-group">
            <input type="text" placeholder="[[myplugin:suggestion_title_placeholder]]" />
            <span class="text-count"></span>
        </div>
    </div>

    <div class="input-group" data-key="app">
        <div class="label">[[myplugin:product_label]]</div>
        <div>
            <select class="parent" placeholder="[[myplugin:select_placeholder]]"></select>
            <div class="child" style="display: none;">
                <input type="text" placeholder="[[myplugin:product_placeholder]]" />
            </div>
        </div>
    </div>

    <div class="input-group" data-key="description">
        <div class="label">[[myplugin:suggestion_desc_label]]</div>
        <textarea placeholder="[[myplugin:suggestion_desc_placeholder]]"></textarea>
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
                        <span class="text">[[myplugin:upload_max]] <span data-file-size="{config.maximumFileSize}"></span></span>
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
                        <span class="text">[[myplugin:upload_max]] <span data-file-size="{config.maximumFileSize}"></span></span>
                        <!-- <a class="link" href="[[myplugin:upload_file_link_href]]" target="_blank">[[myplugin:upload_file_link_text]]</a> -->
                    </div>
                    <div>[[myplugin:upload_file_tip]]</div>
                </div>
            </div>
            <div class="preview"></div>
        </div>
    </div>

    <div class="input-group" data-key="contact_info">
        <div class="label">[[myplugin:contact_label]]</div>
        <input type="text" placeholder="[[myplugin:contact_placeholder]]" />
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
        <div data-lang-key="version_placeholder">[[myplugin:version_placeholder]]</div>
        <div data-lang-key="error_title">[[myplugin:error_title]]</div>
    </div>
</form>