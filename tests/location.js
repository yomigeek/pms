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

  it('should return a 404 and not found message on GET request when requesting all locations without existing locations', (done) => {
    chai.request(app)
      .get('/api/v1/location/all')
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

  it('should return a 401 error for name not provided on POST request when adding a location', (done) => {
    chai.request(app)
      .post('/api/v1/location/add')
      .send({
        name: '',
        female: 10,
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


  it('should return a 201 and success message on successful POST request when adding a location', (done) => {
    chai.request(app)
      .post('/api/v1/location/add')
      .send({
        name: 'holland',
        female: 1000,
        male: 1500,
        areaCode: 'HOLA1101'

      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });


  it('should return a 409 and conflict message on POST request when adding a location with an existing location', (done) => {
    chai.request(app)
      .post('/api/v1/location/add')
      .send({
        name: 'holland',
        female: 1000,
        male: 1500,
        areaCode: 'HOLA1101'

      })
      .end((err, res) => {
        res.should.have.status(409);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return a 404 and error message on POST request when adding a location with a non-existing parent location', (done) => {
    chai.request(app)
      .post('/api/v1/location/add')
      .send({
        name: 'germany',
        female: 1000,
        male: 1500,
        areaCode: 'GER101',
        parentid: 'HOLA1102'

      })
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

  it('should return a 201 and success message on POST request when adding a location with an existing parent location', (done) => {
    chai.request(app)
      .post('/api/v1/location/add')
      .send({
        name: 'ajax',
        female: 2000,
        male: 500,
        areaCode: 'AJX101',
        parentid: 'hola1101'

      })
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return a 200 and success message on GET request when requesting all locations', (done) => {
    chai.request(app)
      .get('/api/v1/location/all')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('locations');
        done();
      });
  });

  it('should return a 200 and success message on GET request when requesting locations belonging to a parent location', (done) => {
    chai.request(app)
      .get('/api/v1/location/hola1101')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('subLocations');
        done();
      });
  });

  it('should return a 404 and error message on GET request when requesting sublocations with a non-existing parent location', (done) => {
    chai.request(app)
      .get('/api/v1/location/hola1102')
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

  it(`should return a 404 and not found message on GET request when requesting 
  sublocations with an existing parent location but no sublocations`, (done) => {
    chai.request(app)
      .get('/api/v1/location/hola1102')
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

  it('should return a 404 and error message on PUT request when updating a location with a non-existing areacode', (done) => {
    chai.request(app)
      .put('/api/v1/location/AJX1019')
      .send({
        name: 'ajax',
        female: 20000,
        male: 5000,
        areaCode: 'AJX101',
        parentid: 'hola1101'

      })
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

  it('should return a 404 and error message on PUT request when updating a location with a non-existing parentid', (done) => {
    chai.request(app)
      .put('/api/v1/location/AJX1019')
      .send({
        name: 'ajax',
        female: 20000,
        male: 5000,
        areaCode: 'AJX101',
        parentid: 'hola11019'

      })
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

  it('should return a 200 and error message on PUT request when updating a location', (done) => {
    chai.request(app)
      .put('/api/v1/location/AJX101')
      .send({
        name: 'ajax',
        female: 2000000,
        male: 500000,
        areaCode: 'AJX101',
        parentid: 'hola1101'

      })
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

  it('should return a 404 and error message on DELETE request when deleting a location with a non-existing areacode', (done) => {
    chai.request(app)
      .delete('/api/v1/location/AJX1019')
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

  it('should return a 400 and error message on DELETE request when deleting a location with sublocations', (done) => {
    chai.request(app)
      .delete('/api/v1/location/hola1101')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('statusCode');
        res.body.should.have.property('message');
        done();
      });
  });

  it('should return a 200 on DELETE request when deleting a location with no sublocations', (done) => {
    chai.request(app)
      .delete('/api/v1/location/ajx101')
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


});
