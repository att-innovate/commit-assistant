'use strict';

module.exports = function(Metrics) {

    Metrics.metricByRepo = function (rid, cb) {
        var sql = 'SELECT repositories.id, repositories.name, repositories.status,COUNT(*) as commit_count,COUNT(nullif(commits.contains_bug, false)) as commit_contains_bug_count,commits.repository_id FROM public.repositories, public.commits WHERE repositories.id =\''+rid+'\' AND repositories.id = commits.repository_id GROUP BY repositories.id,repositories.name, repositories.status, commits.repository_id';
         var params = [];
         Metrics.dataSource.connector.query(sql,params,function (err, response){
            if (err) console.error(err);
            if(response.length == 0) {
                console.error("Repositiry not found. repository_id = "+rid);
            }
            else {
                var resjason ={};
                resjason['name']=response[0]['name'];
                resjason['status']=response[0]['status'];
                resjason['id']=rid;
                resjason['commit_count']=Number(response[0]['commit_count']);
                resjason['commit_contains_bug_count']=Number(response[0]['commit_contains_bug_count']);

        Metrics.find({where: {repo : rid}, limit: 13}, function(err, response) {
            if (err) console.error(err);
            if(response.length == 0) {
                console.error("There are noMetric for Repositiry with repository_id = "+rid);
            }
            else if (response.length > 1) {
                console.error("There are too many Metrics for Repositiry with repository_id = "+rid);
            }
            else{
                var metrics = [];
                metrics.push({
                    // resjason['ns'] = {
                    name:'# of modified subsystems',
                    descrption: "The number of subsystems touched by the commit. Commits modifying many subsystems are more likely to be risky\n\n",
                    significant: response[0]["ns_sig"],
                    buggy: response[0]["nsbuggy"],
                    nonbuggy: response[0]["nsnonbuggy"]
                });
                metrics.push({ //resjason["nd"] = {
                    name: "# of modified directories",
                    descrption: "The number of directories touched by the commit. Commits modifying many directories are more likely to be risky\n\n",
                    significant: response[0]["nd_sig"],
                    buggy: response[0]["ndbuggy"],
                    nonbuggy: response[0]["ndnonbuggy"]
                });
                metrics.push({ //  resjason['nf'] = {
                    name: "# of modified files",
                    descrption: "The number of files touched by the commit. Commits modifying many files are more likely to be risky\n\n",
                    significant: response[0]["nf_sig"],
                    buggy: response[0]["nfbuggy"],
                    nonbuggy: response[0]["nfnonbuggy"]
                });
                metrics.push({ //  resjason['entrophy'] = {
                    name: "Entropy (distribution)",
                    descrption:  "The distribution of the change across the different files. Commits where the change is evenly distributed across all files will have high entropy and vice versa. Commits with high entropy are more likely to be risky since a developer will have to recall and track large numbers of scattered changes across each file\n\n",
                    significant: response[0]["entrophy_sig"],
                    buggy: response[0]["entrophybuggy"],
                    nonbuggy: response[0]["entrophynonbuggy"]
                });
                metrics.push({ //  resjason["la"] = {
                    name: "Lines added",
                    descrption:  "The number of lines of code added by the commit. The more lines of code added, the more risky a commit is\n\n",                
                    significant: response[0]["la_sig"],
                    buggy: response[0]["labuggy"],
                    nonbuggy: response[0]["lanonbuggy"]
                });
                metrics.push({ //  resjason["ld"] = {
                    name: "Lines deleted",
                    descrption:  "The number of lines of code deleted by the commit. The more lines of code deleted, the more risky a commit is\n\n",
                    significant: response[0]["ld_sig"],
                    buggy: response[0]["ldbuggy"],
                    nonbuggy: response[0]["ldnonbuggy"]
                });
                metrics.push({ //  resjason["lt"] = {
                    name: "Total lines",
                    descrption:  "The number of lines of code in a file before the commit is made. For commits that touch multiple files, we use the average lines of code. Commits that touch large files are more risky\n\n",
                    significant: response[0]["lt_sig"],
                    buggy: response[0]["ltbuggy"],
                    nonbuggy: response[0]["ltnonbuggy"]
                });
                metrics.push({ //  resjason["ndev"] = {
                    name: "# of devs contributing",
                    descrption:  "The total number of developers that modified the touched files in the past. Commits that touch files with a high number of developers are more risky\n\n",
                    significant: response[0]["ndev_sig"],
                    buggy: response[0]["ndevbuggy"],
                    nonbuggy: response[0]["ndevnonbuggy"]
                });
                metrics.push({ //  resjason["age"] = {
                    name: "Age from last change",
                    descrption:  "The average time interval between the last and the current change in days. For commits that touch multiple files, we measure the average of all files. The higher the age (i.e., more time elapsed), the more risky a commit is\n\n",
                    significant: response[0]["age_sig"],
                    buggy: response[0]["agebuggy"],
                    nonbuggy: response[0]["agenonbuggy"]
                });            
                metrics.push({ //  resjason["nuc"] = {
                    name: "# of unique changes",
                    descrption:  "The number of unique changes to the files touched by the commit. Commits with more files are considered to be more risky\n\n",    
                    significant: response[0]["nuc_sig"],
                    buggy: response[0]["nucbuggy"],
                    nonbuggy: response[0]["nucnonbuggy"]
                });
                metrics.push({ //  resjason["exp"] = {
                    name: "Dev experience",
                    descrption:  "The number of commits made by the developer before the current commit. Commits made by less experienced developers are more risky\n\n",
                    significant: response[0]["exp_sig"],
                    buggy: response[0]["expbuggy"],
                    nonbuggy: response[0]["expnonbuggy"]
                });
                metrics.push({ //  resjason["rexp"] = {
                    name: "Recent dev experience",
                    descrption:  "The total experience of the developer in terms of commits, weighted by their age (more recent commit have a higher weight). Commits made by a developer with high relevant experience are less risky\n\n",
                    significant: response[0]["rexp_sig"],
                    buggy: response[0]["rexpbuggy"],
                    nonbuggy: response[0]["rexpnonbuggy"]
                });
           
                metrics.push({ //  resjason["sexp"] = {
                    name: "Subsystem dev experience",
                    descrption:  "The number of commits the developer made in the past to the subsystems that are touched by the current commit. Commits made by a developer with high subsystem experience are less risky\n\n",
                    significant: response[0]["sexp_sig"],
                    buggy: response[0]["sexpbuggy"],
                    nonbuggy: response[0]["sexpnonbuggy"]
                });

                resjason['metrics'] = metrics;

                cb(null, resjason);
            }   
        }); 
    }


    });
    };
    Metrics.remoteMethod('metricByRepo', {
        http: {
            path: '/metricByRepo',
            verb: 'get'
        },
        accepts: {arg: 'rid', type: 'string', http: { source: 'query' } },
        returns: {
            arg: 'metricByRepo',
            type: 'string'
        }
    });

};
