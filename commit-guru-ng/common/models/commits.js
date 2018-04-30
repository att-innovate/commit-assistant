'use strict';

module.exports = function(Commits) {
    Commits.status = function (cb) {
        var sql = 'SELECT repository_id, COUNT(*) as commit_count,COUNT(nullif(contains_bug, false)) as commit_contains_bug_count FROM commits GROUP BY repository_id';
        var params = [];
        //var ds = Commits.datasource;//s.postDb;
        Commits.dataSource.connector.query(sql,params,function (err, response) {
            if (err) console.error(err);
            cb(null, response);
        }          
        );

        // if (currentHour >= OPEN_HOUR && currentHour < CLOSE_HOUR) {
        //     response = 'We are open for business.';
        // }
        // else {
        //     response = 'Sorry, we are closed. Open daily from 6am to 8pm.';
        // }
        
    };
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

};
