from bs4 import BeautifulSoup
import pymysql.cursors

import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

connection = pymysql.connect(host='localhost',
                             user='root',
                             password='abcd@0123',
                             db='agents_inventory',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)

def insertdb(name, cellphone, title, email):

    mycursor = connection.cursor()

    sql = "INSERT INTO remaxrougeriverrealty (name, cellphone, title, email) VALUES (%s, %s, %s, %s)"

    mycursor.execute(sql, (name, cellphone, title, email))

    connection.commit()

def get_info(agent_info):

    name = agent_info.find('h3', attrs={'class': 'contact-name'}).text
    cellphone = agent_info.find('a', attrs={'class': 'contact-phone'}).text
    title = agent_info.find('h3', attrs={'class': 'contact-title'}).text
    email_str = agent_info.find('a', attrs={'class': 'contact-email'})['href']
    email = email_str.split(':')[-1]
    insertdb(name, cellphone, title, email)

def main():

    with open('/media/wilson/5e9579c2-89e5-45be-bf05-2cc6329d349f/wilson/scrapy_realestate/remaxrougeriverrealty.html') as fp:

        soup_content = BeautifulSoup(fp, 'html.parser')

        # count = 0

        for agent_info in soup_content.find_all('div', attrs={'class': 'agents-single'}):
            # count += 1
            # print('This is the %d agent' % count)
            get_info(agent_info)


if __name__ == "__main__":

    main()

