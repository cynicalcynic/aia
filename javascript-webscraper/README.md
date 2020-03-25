# Javascript single malt web scraper
Whisky webscraper. Calculates unit price (PLN/100ml/year of maturation) of single malt whiskies found on https://singlemalt.pl.

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

## Sample output
```
$ whisky --num 5

Fetching whiskies...
Fetched 5 whiskies
No  Name                                                                     Price [PLN]  Unit price [PLN/100ml/year]
1   Brora 38 Years Old / Diageo Special Release 2016 / 48,6% / 0,7 l         6749         25.37
2   Brora 37 Years Old / Diageo Special Release 2015 / 50,4% / 0,7 l         6299         24.32
3   Ardbeg 23 Years Old / Twenty Something / 46,3% / 0,7 l                   2969         18.44
4   Cragganmore 25 Years Old  / Diageo Special Release 2014 / 51,4% / 0,7 l  2499         14.28
5   Glenfarclas 40 Years Old / 43% / 0,7 l                                   3789         13.53
```