import { describe, it } from 'mocha';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.should();

chai.use(chaiHttp);


describe('Location Action Tests', () => {

  it('should return 404 on non-existing route on POST request', (done) => {
    chai.request(app)
      .post('/api/v1/location/nonexist')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return 200 on entry route on GET request', (done) => {
    chai.request(app)
      .get('/api/v1/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });


  it('should return a 401 error for name not provided on POST request when adding a location', (done) => {
    chai.request(app)
      .post('/api/v1/location/add')
      .send({
        name: '',
        femlae: 10,
        male: 10,
        areaCode: 'AN102'

      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('errors');
        done();
      });
  });

});
