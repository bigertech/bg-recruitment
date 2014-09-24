

var admin = require('../controllers/admin'),
    adminRoutes;

adminRoutes = function (app) {

    app.get('/login', admin.login);

    app.post('/doLogin', admin.doLogin);

    app.get('/admin', admin.index);

    app.get('/admin/add_job', admin.addJob);

    app.post('/admin/create_job', admin.createJob);

    app.get('/admin/edit_job/:id', admin.editJob);

    app.post('/admin/update_job', admin.updateJob);

    app.get('/admin/delete_job/:id', admin.deleteJob);

    app.get('/admin/type', admin.type);

    app.get('/admin/add_type', admin.addType);

    app.post('/admin/create_type', admin.createType);

    app.get('/admin/edit_type/:id', admin.editType);

    app.post('/admin/update_type', admin.updateType);

    app.get('/admin/delete_type/:id', admin.deleteType);

    app.get('/admin/member', admin.member);
};

module.exports = adminRoutes;
