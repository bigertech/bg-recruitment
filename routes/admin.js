

var admin = require('../controllers/admin'),
    adminRoutes;

adminRoutes = function (app) {
    app.get('/admin', admin.index);

    app.get('/admin/add_job', admin.addJob);

    app.post('/admin/create_job', admin.createJob);

    app.get('/admin/edit_job/:id', admin.editJob);

    app.post('/admin/update_job', admin.updateJob);

    app.get('/admin/delete_job/:id', admin.deleteJob);

    app.get('/admin/type', admin.type);

    app.get('/admin/add_type', admin.addType);

    app.post('/admin/create_type', admin.createType);

    app.get('/admin/edit_type', admin.editType);
};

module.exports = adminRoutes;
