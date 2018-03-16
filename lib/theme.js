"use strict";

var nconf = require('nconf');

var meta = module.parent.require('./meta');
var user = module.parent.require('./user');
var db = module.parent.require('./database');
var theme = {};
var themeSlickSkin = '';

theme.init = function (params, callback) {

	params.router.get('/admin/plugins/slick', params.middleware.admin.buildHeader, renderAdmin);
	params.router.get('/api/admin/plugins/slick', renderAdmin);

	params.router.get('/plugins/editor1', params.middleware.buildHeader, renderEditor1);
	params.router.get('/api/plugins/editor1', renderEditor1);

	params.router.get('/plugins/editor2', params.middleware.buildHeader, renderEditor2);
	params.router.get('/api/plugins/editor2', renderEditor2);

	callback();
};

theme.addAdminNavigation = function (header, callback) {
	header.plugins.push({
		route: '/plugins/slick',
		icon: 'fa-paint-brush',
		name: 'Slick Theme'
	});

	callback(null, header);
};

theme.getThemeConfig = function (config, callback) {

	meta.settings.get('slick', function (err, settings) {
		config.hideSubCategories = settings.hideSubCategories === 'on';
		config.selectedSkin = themeSlickSkin || settings.skinOption || 'default';

		config['insta360-forum'] = {}
		config['insta360-forum'].productList = settings.productList
	});

	callback(false, config);
};

theme.addUserToTopic = function (data, callback) {

	if (data.req.user) {
		user.getUserData(data.req.user.uid, function (err, userdata) {
			if (err) {
				return callback(err);
			}

			data.templateData.loggedInUser = userdata;
			callback(null, data);
		});
	} else {
		callback(null, data);
	}
};

theme.customSettings = function (data, callback) {
	var availableSkins = [{
		name: 'Default',
		value: 'default'
	}, {
		name: 'Dark',
		value: 'dark'
	}];

	var options = '';
	var skinSelected;
	availableSkins.forEach(function (skin) {
		skinSelected = (data.settings.themeSlickSkin === skin.value) ? 'selected' : '';
		options = options + '<option value="' + skin.value + '" ' + skinSelected + '>' + skin.name + '</option>';
	});

	data.customSettings.push({
		title: 'Select skin for theme',
		content: '<div class="form-group fg-line"><div class="select"><select data-property="themeSlickSkin" class="form-control"><option value="">None</option>' + options + '</select></div></div>'
	});

	callback(null, data);
};

theme.saveSettings = function (data, callback) {
	db.setObjectField('user:' + data.uid + ':settings', 'themeSlickSkin', data.settings.themeSlickSkin, callback);
};

theme.getSettings = function (data, callback) {
	themeSlickSkin = data.settings.themeSlickSkin;
	callback(null, data);
};

theme.getLinkTags = function (data, callback) {
	data.links.push({
		rel: 'prefetch stylesheet',
		type: '',
		href: 'https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700&subset=devanagari,latin-ext',
	});

	callback(null, data);
};

function renderAdmin(req, res, next) {
	res.render('admin/plugins/slick', {});
}

function renderEditor1(req, res, next) {
	res.render('editor_feedback', {
		cid: req.query.cid,
	});
}
function renderEditor2(req, res, next) {
	res.render('editor_request', {
		cid: req.query.cid,
	});
}

theme.categoryBuild = function(data, callback) {
	meta.settings.get('slick', function (err, settings) {
		if (settings.cid1 == data.templateData.cid) {
			data.templateData.usingNewEditor = true;
			data.templateData.editor1 = true;
		}
		if (settings.cid2 == data.templateData.cid) {
			data.templateData.usingNewEditor = true;
			data.templateData.editor2 = true;
		}
	});

	callback(null, data);
}

module.exports = theme;
