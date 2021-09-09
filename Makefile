# Makefile

.PHONY: test

all: install build

build:
	./node_modules/.bin/babel src --out-dir dist --copy-files --extensions .ts,.tsx --source-maps inline
start:
	node dist/index.js
test:
	./node_modules/.bin/jest
cleanup:
	rm -r -f dist
	rm -rf node_modules
typecheck:
	./node_modules/.bin/tsc --noEmit
lint:
	./node_modules/.bin/eslint . --ext .ts
install:
	yarn
fix:
	yarn prettier --write .
lint:
	yarn eslint . --ext .ts
heroku:
	babel src --out-dir dist --copy-files --extensions .ts,.tsx --source-maps inline