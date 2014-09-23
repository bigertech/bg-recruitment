

var admin = require('../controllers/admin'),
    adminRoutes;

adminRoutes = function (app) {

    app.get('/admin/login', admin.login);

    app.post('/admin/doLogin', admin.doLogin);

    app.get('/admin', admin.filterLogin, admin.index);

    app.get('/admin/add_job', admin.filterLogin, admin.addJob);

    app.post('/admin/create_job', admin.filterLogin, admin.createJob);

    app.get('/admin/edit_job/:id', admin.filterLogin, admin.editJob);

    app.post('/admin/update_job', admin.filterLogin, admin.updateJob);

    app.get('/admin/delete_job/:id', admin.filterLogin, admin.deleteJob);

    app.get('/admin/type', admin.filterLogin, admin.type);

    app.get('/admin/add_type', admin.filterLogin, admin.addType);

    app.post('/admin/create_type', admin.filterLogin, admin.createType);

    app.get('/admin/edit_type/:id', admin.filterLogin, admin.editType);

    app.post('/admin/update_type', admin.filterLogin, admin.updateType);

    app.get('/admin/delete_type/:id', admin.filterLogin, admin.deleteType);
};

module.exports = adminRoutes;
