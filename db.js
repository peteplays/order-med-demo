var MongoClient = require('mongodb').MongoClient,
    mongoUrl    = process.env.MONGODB_URI_NO_DB || process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost:27017/',
    db          = process.env.MONGODB_DB || 'drugs',
    collection  = 'docs',
    moment      = require('moment');

module.exports = function(app) {

  app.get('/checkDBStatus', function(req, res) {
    MongoClient.connect(mongoUrl+db, function(err, db) {
      if(err) {
        console.log(err);
        res.json({'db': 'fail', 'msg': err});
        return;
      }
      res.json({'db': 'ok'});
    });
  })
  .get('/getData', function(req, res) {
    MongoClient.connect(mongoUrl+db, function(err, db) {
      if(err) { console.log(err); return; }
      db.collection(collection).find().toArray(function(err, result) {
        if(err) { console.log(err); return; }
        res.json(result);
        db.close();
      });
    });
  })
  .post('/addData', function(req, res) {
    var data      = req.body,
        json_data = {
          'drug':     data.result.parameters.drugName[0],
          'quantity': data.result.parameters.drugQuantity[0],
          'when':     moment(data.result.parameters.drugWhen, 'YYYY-MM-DD').format('YYYY MMM D')
        },
        insertData = {
          'data': json_data,
          'dts':  moment().format('YYYY MMM D')
        };
    MongoClient.connect(mongoUrl+db, function(err, db) {
      if(err) { console.log(err); return; }
      db.collection(collection).insert(insertData, function(err, result) {
        if(err) { console.log(err); return; }
        res.send(result);
        db.close();
      });
    });
  });

};
