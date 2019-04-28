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

def insertdb(name, cellphone, company, email):

    mycursor = connection.cursor()

    sql = "INSERT INTO 51_agents (name, cellphone, company, email) VALUES (%s, %s, %s, %s)"

    mycursor.execute(sql, (name, cellphone, company, email))

    connection.commit()

def get_info(agent_info):

    name = agent_info.find('span', attrs={'class': 'a-name'}).text
    cellphone = agent_info.find('b', attrs={'class': 'a-tel'}).text
    company = agent_info.find('span', attrs={'class': 'a-areas'}).text
    email_org = agent_info.find('a', title=True)
    email = email_org['title']
    insertdb(name, cellphone, company, email)

def main():

    with open('/media/wilson/5e9579c2-89e5-45be-bf05-2cc6329d349f/wilson/scrapy_realestate/quotes-220.html') as fp:

        soup_content = BeautifulSoup(fp, 'html.parser')

        # agents_list = soup_content.find_all('div', attrs={'class': 'agents-list-wrap'})

        # logger.info(agents_list)

        for agent_info in soup_content.find_all('div', attrs={'class': 'agent-item'}):

            get_info(agent_info)


if __name__ == "__main__":

    main()

