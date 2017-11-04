check:
	npm run standard
test: check
pre-release: test
	npm run docs
clean:
	rm synthetics.1
