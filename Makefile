check:
	npm run standard
test: check
pre-release: test docs
clean:
	rm manuals/*.1
docs:
	npm run docs-main
	npm run docs-run
