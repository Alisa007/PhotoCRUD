/**
 * Created by alisabelousova on 5/31/15.
 */

var request = require('supertest');

describe('PhotoController', function() {
  describe('createPhoto()', function () {
    it('should request image and name and respond with created photo record info', function (done) {
      request(sails.hooks.http.app)
        .post('/createPhoto')
        .field('data', '{"name":"qwerty123"}')
        .attach('file', '/Users/alisabelousova/WebstormProjects/PhotoCRUD/assets/img/1.jpg')
        .expect(200)
        .end(done);
    });
  });
});