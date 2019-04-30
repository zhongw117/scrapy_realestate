import scrapy
from scrapy_splash import SplashRequest

class QuotesSpider(scrapy.Spider):
    name = "century21"

    def start_requests(self):

        urls = [
            'http://www.century21.ca/percyfulton/search/directory/',
                    ]
        for url in urls:
            yield SplashRequest(url=url, callback=self.parse, endpoint='render.html', args={'wait': 0.5})

    def parse(self, response):
        page = response.url.split(".")[1]
        filename = 'quotes-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)