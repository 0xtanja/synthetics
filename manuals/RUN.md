# synthetics-run(1) -- Run a Synthetics script locally

## SYNOPSYS

`synthetics run <file> [chrome driver options ...]`

## DESCRIPTION

Initialise an instance of Chrome Driver to execute a script on.

### Return Codes

- `0` Script ran successfully and can be interpreted as an indicator that both syntax and code are correct and will possibly run correctly on Synthetics. Nothing will be feeded to the terminal as the intention of the program is to indicate when is good to push changes to Synthetics.

- `>=1` Something went wrong.

### Chrome Driver

All arguments after the filename are passed verbatim to Chrome Driver.

For a complete list of arguments available, run `chromedriver --help`.

## EXAMPLES

To run a script in incognito mode:

`synthetics run example.js --incognito`

## SEE ALSO

synthetics(1)

## AUTHOR

Written by [Mario Álvarez](https://github.com/m4grio)
