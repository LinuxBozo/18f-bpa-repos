'use strict';

var GitHubApi = require('github'),
    Promise = require('bluebird'),
    _ = require('lodash');

var github = new GitHubApi({
    version: '3.0.0',
    //debug: true,
    protocol: 'https'
});

function BPAData() {
    this.matchingRepos = {};
    this.defaultSearchOptions = {
        q: 'created:>=2015-06-15 -user:gsa -user:18F in:name,description,readme',
        sort: 'updated',
        per_page: 100
    };
}

BPAData.prototype.doSearch = function(terms) {
    var self = this;
    var options = _.clone(self.defaultSearchOptions);
    options.q += ' ' + terms;
    var repoSearch = Promise.promisify(github.search.repos);
    console.error(options);
    return repoSearch(options)
    .then(function(data) {
        //console.log(JSON.stringify(data, null, 2));
        _.map(data.items, function(repo) {
            // We haven't seen a repo from this owner yet.
            var notFound = Object.keys(self.matchingRepos).indexOf(repo.owner.login) === -1;
            var outdated = self.matchingRepos[repo.owner.login] && self.matchingRepos[repo.owner.login].pushed_at < repo.pushed_at;
            if (notFound || outdated) {
                self.matchingRepos[repo.owner.login] = repo;
            }
        });
    });
};

var data = new BPAData();
var terms = [
    '4QTFHS150004 OR RFQ993471 OR "agile delivery" OR 18F',
    'BPA NOT crypto NOT australia',
    'GSA ADS',
    'agile GSA',
    'open FDA',
    'FDA food',
    'FDA enforcement',
    'FDA recall',
    'FDA device',
    'FDA drug',
];
Promise.map(terms, function(term) {
    return data.doSearch(term);
})
.then(function() {
    //console.log(Object.keys(data.matchingRepos).length);
    console.log(JSON.stringify(data.matchingRepos, null, 2));
    console.error(Object.keys(data.matchingRepos).length);
});

