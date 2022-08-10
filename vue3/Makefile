DEST?=dist
ENV?=dev
dev:
	env PROXY_ENV=${ENV} node_modules/.bin/vite

clear:
	rm -rf ${DEST}/*

build: clear
	# node_modules/.bin/tsc -p . --noEmit && node_modules/.bin/vite build --outDir ${DEST}
	node_modules/.bin/vite build --outDir ${DEST}
	# git describe --tags --long > ${DEST}/VERSION

lint:
	node_modules/.bin/eslint .

install:
	pnpm i
