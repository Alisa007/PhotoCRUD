/**
 * Created by alisabelousova on 5/31/15.
 */

var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'alisa007',
    api_key: '716629874789252',
    api_secret: '-20ruEoVsESOkdWDU04GJDPRouU'
});

module.exports = {

    /**
     * Upload image to Cloudinary and add record to Photo table
     */

    createPhoto: function (req, res) {
        var file = req.file('file')
            , data = req.params.all().data
            , name = data.substr(9, data.length - 11);

        if (file && name) {
            file.upload(function (err, uploadedFiles) {
                if (err || !uploadedFiles) {
                    return res.serverError(err)
                } else {
                    cloudinary.uploader.upload(uploadedFiles[0].fd, function (data) {

                        Photo.create({
                            name    : name,
                            format  : data.format,
                            url     : data.url
                        }).exec(function (err, photo) {
                            if (err || !photo) {
                                return res.serverError(err);
                            } else {
                                return res.json(photo);
                            }
                        });
                    });
                }
            });
        } else {
            return res.badRequest();
        }
    }
};
