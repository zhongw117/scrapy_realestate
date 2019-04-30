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

    sql = "INSERT INTO century21 (name, cellphone, title, email) VALUES (%s, %s, %s, %s)"

    mycursor.execute(sql, (name, cellphone, title, email))

    connection.commit()

def get_info(agent_info):

    name = agent_info.find('a', attrs={'class': 'agent-name'}).text
    cellphone = agent_info.find('li', attrs={'class': 'agent-phone-number'}).text
    title = agent_info.find('span', attrs={'class': 'company-name'}).text
    email_org = agent_info.find('a', attrs={'class': 'agent-email'})
    email = email_org['href'].split(":")[-1]
    insertdb(name, cellphone, title, email)

def main():

    with open('/media/wilson/5e9579c2-89e5-45be-bf05-2cc6329d349f/wilson/scrapy_realestate/century6.html') as fp:

        soup_content = BeautifulSoup(fp, 'html.parser')
        count = 0
        for agent_info in soup_content.find_all('div', attrs={'class': 'agent-list-item-info'}):

            get_info(agent_info)
if __name__ == "__main__":

    main()

