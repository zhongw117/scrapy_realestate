import scrapy
from scrapy_splash import SplashRequest
from bs4 import BeautifulSoup
import pymysql

connection = pymysql.connect(host='localhost',
                             user='root',
                             password='abcd@0123',
                             db='agents_inventory',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

def insertdb(name, cellphone, email, position):

    mycursor = connection.cursor()

    sql = "INSERT INTO sothebysrealty (name, cellphone, email, position) VALUES (%s, %s, %s, %s)"

    mycursor.execute(sql, (name, cellphone, email, position))

    connection.commit()


class QuotesSpider(scrapy.Spider):
    name = "sothebysrealty"

    def start_requests(self):

        urls = [
            'https://sothebysrealty.ca/en/find-an-agent/',
                     ]
        for url in urls:
            yield SplashRequest(url=url, callback=self.parse, endpoint='render.html', args={'wait': 0.5})

    def parse_agent(self, response):

        soup_agent = BeautifulSoup(response.body, 'html.parser')
        agent_name_h1 = soup_agent.find('h1', attrs={'class': 'intro'})
        if agent_name_h1 != None:
            agent_name = agent_name_h1.text
        else:
            agent_name = agent_name_h1
        position = soup_agent.find('span', attrs={'class': 'quali'}).text
        cellphone = soup_agent.find('a', attrs={'class': 'profile_phone'}).text
        email = soup_agent.find('a', attrs={'class': 'orange'}).text

        insertdb(agent_name, cellphone, email, position)

    def parse(self, response):

        soup_content = BeautifulSoup(response.body, 'html.parser')

        for agent_page_html in soup_content.find_all('a', title=True):
            agent_page_html_attr = agent_page_html['href']
            agent_page = 'https://sothebysrealty.ca'+agent_page_html_attr
            if agent_page:
                yield SplashRequest(url=agent_page, callback=self.parse_agent, endpoint='render.html', args={'wait': 0.5})


