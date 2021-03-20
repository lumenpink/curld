#!/usr/bin/env node
'use strict'
const pkg = require('./package.json')
const input = process.argv.slice(2)
const parseCurl = require('./parse-curl')
const eosp = require('end-of-stream-promise')
const { Readable } = require('streamx')
var parsed

const helpString =
    `${pkg.description}
Usage
  $ curld <curl_command>
  
Options
  -v, --version	Print version
  -h, --help	Display help message`

function printHelp () {
    console.log(helpString)
    process.exit(0)
}

function printVersion () {
    console.log(pkg.version)
    process.exit(0)
}

function printError (n = 0) {
    console.error('I don\'t understand the parameters. Error: ' + n)
    process.exit(-1)
}

function toFetch (data) {

    parsed = parseCurl(data)

    return `
      fetch( 
            '${parsed.url}', 
            {headers:${JSON.stringify(parsed.header)},
            method:'${parsed.method}'}
           )
           .then(console.log, console.error)`
}

function init (data) {
    let res = toFetch(data)
    if (parsed.url)
        switch (parsed.protocol) {
            case 'dat':
                (async function () {
                    const fetch = require('dat-fetch')()
                    try {
                        const response = await fetch(parsed.url)
                        const stream = Readable.from(response.body)
                        stream.pipe(process.stdout)
                        await eosp(stream)
                    } finally {
                        process.exit()
                    }
                })()
                break;
            case 'gemini':
                (async function () {
                    const fetch = require('gemini-fetch')()
                    try {
                        const response = await fetch(parsed.url)
                        const stream = Readable.from(response.body)
                        stream.pipe(process.stdout)
                        await eosp(stream)
                    } finally {
                        process.exit()
                    }
                })()
                break;
            case 'hyper':
                (async function () {
                    const fetch = require('hypercore-fetch')()
                    try {
                        const response = await fetch(parsed.url)
                        const stream = Readable.from(response.body)
                        stream.pipe(process.stdout)
                        await eosp(stream)
                    } finally {
                        fetch.close()
                    }
                })()
                break;
            case 'ipfs':
            case 'ipns':
                (async function () {
                    const IPFS = require('ipfs')
                    const makeIpfsFetch = require('js-ipfs-fetch')
                    const ipfs = await IPFS.create({ silent: true })
                    const fetch = await makeIpfsFetch({ ipfs })
                    try {
                        const response = await fetch(parsed.url)
                        const stream = Readable.from(response.body)
                        stream.pipe(process.stdout)
                        await eosp(stream)
                    } finally {
                        process.exit()
                    }
                })()
                break;
            default:
                console.log('Protocol ' + parsed.protocol + ' not supported');
                process.exit(-1);
        }






    else
        printError(1)
}

process.argv.map(arg => {
    switch (arg) {
        case '-h':
        case '--help':
            printHelp()
            break
        case '-v':
        case '--version':
            printVersion()
    }
})

if (process.stdin.isTTY)
    if (!process.argv[2])
        printHelp()
    else
        init(input)
else
    process.stdin.once('data', data => init(data))