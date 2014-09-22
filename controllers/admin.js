
/**
 * Main controller for frontend
 */

var adminControllers;

adminControllers = {

    index: function(req, res, next) {
        res.render('admin/index');
    },

    addJob: function(req, res, next) {
        res.render('admin/add_job');
    },

    editJob: function(req, res, next) {
        res.render('admin/edit_job');
    },

    type: function(req, res, next) {
        res.render('admin/type');
    },

    addType: function(req, res, next) {
        res.render('admin/add_type');
    },

    editType: function(req, res, next) {
        res.render('admin/edit)type');
    }
};

module.exports = adminControllers;
