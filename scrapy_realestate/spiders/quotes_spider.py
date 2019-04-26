import scrapy


class QuotesSpider(scrapy.Spider):
    name = "quotes"

    def start_requests(self):
        urls = [
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=100',
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=120',
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=140',
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=160',
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=180',
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=200',
            'https://house.51.ca/agent?keyword=&language=0&city=0&offset=220',

            # 'http://quotes.toscrape.com/page/2/',
        ]
        for url in urls:
            yield scrapy.Request(url=url, callback=self.parse)

    def parse(self, response):
        page = response.url.split("=")[-1]
        filename = 'quotes-%s.html' % page
        with open(filename, 'wb') as f:
            f.write(response.body)
        self.log('Saved file %s' % filename)