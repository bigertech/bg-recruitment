
// 数据库表
var db = {

    job: {
        id: {
            type: 'increments',
            nullable: false,
            primary: true
        },
        uuid: {
            type: 'string',
            maxlength: 36,
            nullable: false,
            validations: {
                'isUUID': {
                    condition: true,
                    errorInfo: 'UUID is invalid.'
                }
            },
            autocompletions: {
                'uuid': {
                    autocompleteOn: 'add'
                }
            }
        },
        name: {
            type: 'string',
            maxlength: 128,
            nullable: false,
            validations: {
                'isEmpty': {
                    condition: false,
                    errorInfo: 'Name must not be empty.',
                }
            }
        },
        address: {
            type: 'string',
            maxlength: 255,
            nullable: true
        },
        description: {
            type: 'text',
            maxlength: 16777215,
            fieldtype: 'mediumtext',
            nullable: true
        },
        number: {
            type: 'integer',
            defaultTo: 1,
            validations: {
                'isInt': {
                    condition: true,
                    errorInfo: 'Number must be a integer.'
                }
            }
        },
        edu: {
            type: 'string',
            nullable: true
        },
        type_id: {
            type: 'integer',
            nullable: false
        },
        published_at: {
            type: 'integer',
            nullable: true,
            autocompletions: {
                'timestamp': {
                    autocompleteOn: 'add'
                }
            }
        }
    },

    type: {
        id: {
            type: 'increments',
            nullable: false,
            primary: true
        },
        uuid: {
            type: 'string',
            maxlength: 36,
            nullable: false,
            validations: {
                'isUUID': {
                    condition: true,
                    errorInfo: 'UUID is invalid.'
                }
            },
            autocompletions: {
                'uuid': {
                    autocompleteOn: 'add'
                }
            }
        },
        name: {
            type: 'string',
            maxlength: 128,
            nullable: false,
            validations: {
                'isEmpty': {
                    condition: false,
                    errorInfo: 'Name must not be empty.',
                }
            }
        }
    },

    member: {
        id: {
            type: 'increments',
            nullable: false,
            primary: true
        },
        name: {
            type: 'string',
            maxlength: 128,
            nullable: false,
            validations: {
                'isEmpty': {
                    condition: false,
                    errorInfo: 'Name must not be empty.',
                }
            }
        },
        title: {
            type: 'string',
            maxlength: 128,
            nullable: true,
        },
        maxim: {
            type: 'text',
            maxlength: 16777215,
            fieldtype: 'mediumtext',
            nullable: true
        },
        img: {
            type: 'text',
            maxlength: 16777215,
            fieldtype: 'mediumtext',
            nullable: true
        }
    }
};

module.exports.tables = db;
