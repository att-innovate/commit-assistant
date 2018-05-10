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

    Commits.commitsById = function (chash, cb) {
        Commits.find({where: {commit_hash: chash}, limit: 13}, function(err, response) {
            if (err) console.error(err);
            if(response.length == 0) {
                console.error("Repositiry not found. repository_id = "+rid);
            }
            else {
                var resjason ={};
                var details = [];
                details={
                commit_message: response[0]["commit_message"],
                fix: response[0]["fix"],
                classification: response[0]["classification"],
                linked: response[0]["linked"],
                contains_bug: response[0]["contains_bug"],
                fixes: response[0]["fixes"],
                };
                resjason['details']=details;

                var author = [];
                author={
                    author_name: response[0]["author_name"],
                    author_date_unix_timestamp: response[0]["author_date_unix_timestamp"],
                    author_email: response[0]["author_email"],
                    author_date: response[0]["author_date"],
                };
                resjason['author']=author;

                var history = [];
                history.push({ //  resjason["ndev"] = {
                    name: "# of devs contributing",
                    descrption:  "The total number of developers that modified the touched files in the past. Commits that touch files with a high number of developers are more risky\n\n",
                    significant: response[0]["ndev"]
                });
                history.push({ //  resjason["age"] = {
                    name: "Age from last change",
                    descrption:  "The average time interval between the last and the current change in days. For commits that touch multiple files, we measure the average of all files. The higher the age (i.e., more time elapsed), the more risky a commit is\n\n",
                    significant: response[0]["age"]
                });            
                history.push({ //  resjason["nuc"] = {
                    name: "# of unique changes",
                    descrption:  "The number of unique changes to the files touched by the commit. Commits with more files are considered to be more risky\n\n",    
                    significant: response[0]["nuc"]
                });
                resjason['history']=history;

                var diffusion = [];
                diffusion.push({
                    // resjason['ns'] = {
                    name:'# of modified subsystems',
                    descrption: "The number of subsystems touched by the commit. Commits modifying many subsystems are more likely to be risky\n\n",
                    significant: response[0]["ns"]
                });
                diffusion.push({ //resjason["nd"] = {
                    name: "# of modified directories",
                    descrption: "The number of directories touched by the commit. Commits modifying many directories are more likely to be risky\n\n",
                    significant: response[0]["nd"]
                });
                diffusion.push({ //  resjason['nf'] = {
                    name: "# of modified files",
                    descrption: "The number of files touched by the commit. Commits modifying many files are more likely to be risky\n\n",
                    significant: response[0]["nf"]
                });
                diffusion.push({ //  resjason['entrophy'] = {
                    name: "Entropy (distribution)",
                    descrption:  "The distribution of the change across the different files. Commits where the change is evenly distributed across all files will have high entropy and vice versa. Commits with high entropy are more likely to be risky since a developer will have to recall and track large numbers of scattered changes across each file\n\n",
                    significant: response[0]["entrophy"]
                });
                resjason['diffusion']=diffusion;

                var size=[];
                size.push({ //  resjason["la"] = {
                    name: "Lines added",
                    descrption:  "The number of lines of code added by the commit. The more lines of code added, the more risky a commit is\n\n",                
                    significant: response[0]["la"]
                });
                size.push({ //  resjason["ld"] = {
                    name: "Lines deleted",
                    descrption:  "The number of lines of code deleted by the commit. The more lines of code deleted, the more risky a commit is\n\n",
                    significant: response[0]["ld"]
                });
                size.push({ //  resjason["lt"] = {
                    name: "Total lines",
                    descrption:  "The number of lines of code in a file before the commit is made. For commits that touch multiple files, we use the average lines of code. Commits that touch large files are more risky\n\n",
                    significant: response[0]["lt"]
                });
                resjason['size']=size;

                var experience=[];
                experience.push({ //  resjason["exp"] = {
                    name: "Dev experience",
                    descrption:  "The number of commits made by the developer before the current commit. Commits made by less experienced developers are more risky\n\n",
                    significant: response[0]["exp"]
                });
                experience.push({ //  resjason["rexp"] = {
                    name: "Recent dev experience",
                    descrption:  "The total experience of the developer in terms of commits, weighted by their age (more recent commit have a higher weight). Commits made by a developer with high relevant experience are less risky\n\n",
                    significant: response[0]["rexp"]
                });
           
                experience.push({ //  resjason["sexp"] = {
                    name: "Subsystem dev experience",
                    descrption:  "The number of commits the developer made in the past to the subsystems that are touched by the current commit. Commits made by a developer with high subsystem experience are less risky\n\n",
                    significant: response[0]["sexp"]
                });
                
                resjason['experience']=experience;
                cb(null, resjason);
            }

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
    Commits.remoteMethod('commitsById', {
        http: {
            path: '/commitsById',
            verb: 'get'
        },
        accepts: {arg: 'chash', type: 'string', http: { source: 'query' } },
        returns: {
            arg: 'commitsById',
            type: 'string'
        }
    });
//
};
