module.exports = function(app) {
// aut update altering the table in but not recreating them
// auto migrate recreating the tavbles even if they existr - so it can cause data loss.
    app.dataSources.postDb.autoupdate('repositories', function(err) {
      if (err) throw err;
  
    //    app.models.repository.create([{
    //      name: 'empty',
    //      creation_date: 2018-04-25
    //    }],
    //    //, {
    // //     name: 'Three  Bees Coffee House',
    // //     city: 'San Mateo'
    // //   }, {
    // //     name: 'Caffe Artigiano',
    // //     city: 'Vancouver'
    // //   }], 
    // function(err, repository) {
    //      if (err) throw err;
  
    //     console.log('Models created: \n', repository.name);
    //   });
   // });
  });
  app.dataSources.postDb.autoupdate('commits', function(err) {
    if (err) throw err;
  });
};