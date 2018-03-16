<!-- IMPORT partials/breadcrumbs.tpl -->
<div class="row">
	<div class="category col-lg-12 col-sm-12">
		<!-- IF children.length --><hr class="hidden-xs"/><!-- ENDIF children.length -->

		<h4 class="hidden-xs">{name}</h4>

        <!-- IMPORT partials/category/subcategory.tpl -->

		<div style="display: flex;">
            <div style="flex: none; margin-right: 12px;">
                <!-- IF privileges.topics:create -->
                <button component="category/post" id="new_topic" class="btn btn-primary">[[category:new_topic_button]]</button>
                <!-- ELSE -->
                    <!-- IF !loggedIn -->
                    <a component="category/post/guest" target="_top" href="{config.relative_path}/auth/arashivision" class="btn btn-primary">[[category:guest-login-post]]</a>
                    <!-- ENDIF !loggedIn -->
                <!-- ENDIF privileges.topics:create -->
            </div>


            <!-- IF loggedIn -->
            <div class="clearfix" component="category/controls" style="flex:auto; background: #F7F7F7; border-radius: 4px;">
                <span class="pull-right">
                    <!-- IMPORT partials/category/watch.tpl -->
                    <!-- IMPORT partials/category/sort.tpl -->
                    <!-- IMPORT partials/category/tools.tpl -->
                </span>
            </div>
            <!-- ENDIF !loggedIn -->
        </div>

		<!-- IF !topics.length -->
		<div class="alert alert-warning" id="category-no-topics">
			[[category:no_topics]]
		</div>
		<!-- ENDIF !topics.length -->

		<a href="{url}">
			<div class="alert alert-warning hide" id="new-topics-alert"></div>
		</a>

		<!-- IMPORT partials/topics_list.tpl -->

		<!-- IF config.usePagination -->
			<!-- IMPORT partials/paginator.tpl -->
		<!-- ENDIF config.usePagination -->
	</div>
</div>

<!-- IMPORT partials/move_thread_modal.tpl -->

<!-- IF !config.usePagination -->
<noscript>
	<!-- IMPORT partials/paginator.tpl -->
</noscript>
<!-- ENDIF !config.usePagination -->
