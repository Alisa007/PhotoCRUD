/**
 * Created by alisabelousova on 3/27/15.
 */

module.exports = {
    attributes: {
        name    : {type: 'string', required: true},
        url     : {type: 'string', required: true, unique: true},
        format  : {type: 'string', required: true}
    }
};