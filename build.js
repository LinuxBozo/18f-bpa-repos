'use strict';

var GitHubApi = require('github'),
    Promise = require('bluebird'),
    moment = require('moment'),
    _ = require('lodash');

var github = new GitHubApi({
    version: '3.0.0',
    //debug: true,
    protocol: 'https',
    headers: {
        'user-agent': 'LinuxBozo-ads-app'
    }
});
github.authenticate({
    type: 'token',
    token: '311b94ea28ad23fa8d8796c0bb8f5e1823effd3b'
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
    return repoSearch(options)
    .then(function(data) {
        _.map(data.items, function(repo) {
            // We haven't seen a repo from this owner yet.
            var notFound = Object.keys(self.matchingRepos).indexOf(repo.owner.login) === -1;
            var outdated = !notFound && moment(self.matchingRepos[repo.owner.login].pushed_at) < moment(repo.pushed_at);
            if (notFound || outdated) {
                self.matchingRepos[repo.owner.login] = repo;
            }
        });
    });
};

var data = new BPAData();
var terms = [
    '4QTFHS150004 OR RFQ993471 OR "agile delivery"',
    '18F NOT microcontroller NOT "bad code" NOT font NOT laptop',
    'BPA NOT crypto NOT australia NOT boot',
    'GSA ADS',
    'agile GSA',
    'openFDA',
    'open FDA NOT illustration',
    'FDA agile',
    'FDA food NOT koop',
    'FDA enforcement NOT koop',
    'FDA recall NOT koop',
    'FDA device',
    'FDA drug',
];
Promise.map(terms, function(term) {
    return data.doSearch(term);
})
.then(function() {
    console.log(JSON.stringify(data.matchingRepos, null, 2));
    console.error(Object.keys(data.matchingRepos).length);
});

