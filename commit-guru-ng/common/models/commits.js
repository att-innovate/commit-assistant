'use strict';

module.exports = function(Commits) {
    Commits.status = function (cb) {
        var sql = //'SELECT repository_id, COUNT(*) as commit_count,COUNT(nullif(contains_bug, false)) as commit_contains_bug_count FROM commits GROUP BY repository_id';
        'SELECT repositories.id, repositories.name, repositories.status,COUNT(*) as commit_count,COUNT(nullif(commits.contains_bug, false)) as commit_contains_bug_count,commits.repository_id FROM public.repositories, public.commits WHERE repositories.id = commits.repository_id GROUP BY repositories.id,repositories.name, repositories.status, commits.repository_id';
         var params = [];
        //var ds = Commits.datasource;//s.postDb;
        Commits.dataSource.connector.query(sql,params,function (err, response) {
            if (err) console.error(err);
            cb(null, response);
        });  
    };
    Commits.commitsByRepo = function (rid, cb) {
        Commits.find({where: {repository_id: rid}, limit: 13}, function(err, response) {
            if (err) console.error(err);
            cb(null, response);
        }          
        );
        
    };
    ;
    Commits.remoteMethod('status', {
        http: {
            path: '/repositoriesSummary',
            verb: 'get'
        },
        returns: {
            arg: 'status',
            type: 'string'
        }
    });
    Commits.remoteMethod('commitsByRepo', {
        http: {
            path: '/commitsByRepo',
            verb: 'get'
        },
        accepts: {arg: 'rid', type: 'string', http: { source: 'query' } },
        returns: {
            arg: 'commitsByRepo',
            type: 'string'
        }
    });

};
