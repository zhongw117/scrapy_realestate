## scrapy startproject scrapy_realestate
Under the root path

$ scrapy crawl quotes

Under the folder of content_parser

$ python3 content_parser.py

refer to the article: https://github.com/scrapy-plugins/scrapy-splash

setup settings file

!!! importance:

The difference is 

SPLASH_URL = 'http://localhost:8050'

when employing on server: 

SPLASH_URL = 'http://192.168.59.103:8050'

