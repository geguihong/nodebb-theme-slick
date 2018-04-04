<div id="insta360-analytics">
    <div class="row">
        <div class="col-xs-3">
            <div class="form-group">
                <label for="startRange">范围开始</label>
                <input class="form-control" type="date" id="startRange">
            </div>
        </div>
        <div class="col-xs-3">
            <div class="form-group">
                <label for="endRange">范围结束</label>
                <input class="form-control" type="date" id="endRange">
            </div>
        </div>
        <div class="col-xs-6">
            <div class="form-group">
                <label>目录</label>
                <select class="form-control" id="category">
                    <!-- BEGIN categories -->
                    <option value="{../cid}">{../name}</option>
                    <!-- END categories -->
                </select>
            </div>
        </div>
    </div>
    <button data-role="submit" type="button" class="btn btn-primary">搜索</button>

    <div class="row" style="margin-top: 32px;">
        <div class="col-sm-6 text-center">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div><canvas id="topicCanvas" height="250"></canvas></div>
                    <p></p>
                </div>
                <div class="panel-footer">发帖 <span id="topicCount">0</span></div>
            </div>
        </div>
        <div class="col-sm-6 text-center">
            <div class="panel panel-default">
                <div class="panel-body">
                    <div><canvas id="postCanvas" height="250"></canvas></div>
                    <p></p>
                </div>
                <div class="panel-footer">回复 <span id="postCount">0</span></div>
            </div>
        </div>
    </div>
</div>