# 18F ADS BPA Repo Stats

This app performs some pre-configured searches against the [github developer API](https://developer.github.com/v3) to try to compile a list of repositories that are involved in the [18F](https://18f.gsa.gov/) [Agile Delivery Services Blanket Purchase Agreement (BPA)](https://18f.gsa.gov/2015/06/15/agile-bpa-is-here/) Request For Quotation (RFQ) process.

See it LIVE: https://adsbpastats.herokuapp.com

## Build & development

[Generate a github OAuth token](https://github.com/settings/tokens/new)

Export your token as an environment variable:

```shell
$ export GITHUB_API_TOKEN=<your token>
```

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.
