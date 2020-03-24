# Javascript single malt webscraper
Whisky webscraper. Calculates unit price (PLN/100ml/year of maturation) of single malt whiskeys found on https://singlemalt.pl.

JSDOM library has been used to parse the site and fetch the information from the DOM. Price, maturation time and volume are contained in whisky's name and are separated using regular expressions.

## Install
```
sudo npm install -g
```
## Run
```
whisky [OPTIONS]
```

## Options
```
--num, -n      Display n whiskeys                                     [number]
--reverse, -r  Sort ascending                                        [boolean]
--help         Show help                                             [boolean]
```