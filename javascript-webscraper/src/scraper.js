#!/usr/bin/env node

const request = require('request-promise');
const {JSDOM} = require('jsdom');
const chalk = require('chalk');
const argv = require('yargs')
    .usage('$0 [OPTIONS]')
    .option('num', {
        alias: 'n',
        describe: "Display n whiskeys",
        type: 'number'
    })
    .option('reverse', {
        alias: 'r',
        describe: 'Sort ascending',
        type: 'boolean'
    })
    .version(false)
    .help('help')
    .locale('en')
    .argv;


(async function () {
    console.log('Fetching whiskeys...');
    let productList = [];

    const url = 'https://singlemalt.pl/single-malt?limit=80&mode=list';
    let res, dom;
    try {
        res = await request.get(url);
        dom = new JSDOM(res);
    } catch (e) {
        console.error(chalk.bold.red('Connection failed\nQuitting...'));
        process.exit(1);
    }

    let page = 1;
    while (true) {
        if (dom.window.document.querySelectorAll('.next').length === 0) {
            break;
        }

        try {
            res = await request.get(
                `${url}&p=${page++}`
            );
            dom = new JSDOM(res);
        } catch (e) {
            console.error(e.message + '\nQuitting...');
            process.exit(1);
        }

        const list = dom.window.document.querySelectorAll('#products-list li');
        if (list.length === 0) {
            console.error(chalk.bold.red('Something went wrong...\nQuitting...'));
            process.exit(1);
        }
        list.forEach((el) => {

            let productName = el.querySelector('.product-name>a').innerHTML;
            const match = productName.match(/(?<age>[0-9]+) (Years? Old)/);
            if (match) {
                let price = el.querySelector('.price').innerHTML;
                price = Number.parseInt(price.replace('&nbsp;', '').replace(',', '.').split('zł')[0]);
                const age = Number.parseInt(match.groups.age);
                const volume = Number.parseFloat(productName.match(/(?<volume>[0-9](,[0-9]+)?) l/).groups.volume.replace(',', '.'));
                const unitPrice = Number.parseFloat((price / (volume * 10) / age).toFixed(2));
                productList.push({
                    name: productName,
                    price,
                    unitPrice
                });
            }
        });
    }

    productList.sort((a, b) => {
        return argv.reverse ? a.unitPrice - b.unitPrice : b.unitPrice - a.unitPrice;
    });

    if (argv.num && argv.num > 0) {
        productList = productList.slice(0, argv.num);
    }

    const maxNameLength = Math.max.apply(Math, productList.map(el => el.name.length));

    console.log(`Fetched ${chalk.bold.yellow(productList.length)} whiskeys`);
    console.log(chalk.bold('No.'.padEnd(5) + `Name`.padEnd(maxNameLength + 2) + 'Price [PLN]'.padEnd(13) + 'Unit price [PLN/100ml/year]'));
    productList.forEach((product, index) => {
        console.log((index + 1).toString().padEnd(4), product.name.padEnd(maxNameLength - 1 + 2), product.price.toString().padEnd(12), product.unitPrice.toString().padEnd(4, '0'));
    });
})();



