# Makefile

build:
	./node_modules/.bin/babel src --out-dir lib --copy-files --extensions \".ts,.tsx\" --source-maps inline
start:
	node lib/index.js
test:
	./node_modules/.bin/jest
cleanup:
	rm -r -f lib
	rm -rf node_modules
typecheck:
	./node_modules/.bin/tsc --noEmit
lint:
	./node_modules/.bin/eslint . --ext .ts