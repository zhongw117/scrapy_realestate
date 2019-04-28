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

    sql = "INSERT INTO harveykalles (name, cellphone, company, email) VALUES (%s, %s, %s, %s)"

    mycursor.execute(sql, (name, cellphone, company, email))

    connection.commit()

def get_info(agent_info):

    name = agent_info.find('figcaption', attrs={'class': 'name'}).text
    cellphone = agent_info.find('figcaption', attrs={'class': 'phone'}).text
    company = 'Harvey Kalles'
    email = agent_info.find('figcaption', attrs={'class': 'email'}).text
    insertdb(name, cellphone, company, email)
def main():

    with open('/media/wilson/5e9579c2-89e5-45be-bf05-2cc6329d349f/wilson/scrapy_realestate/quotes-harveykalles.com.html') as fp:

        soup_content = BeautifulSoup(fp, 'html.parser')

        count = 0

        for agent_name_list in soup_content.find_all('div', attrs={'class': 'col-xs-12'}):


            for agent_info in agent_name_list.find_all('a'):

                name = agent_info.find('figcaption', attrs={'class': 'name'})

                if name == None:

                    continue

                get_info(agent_info)


if __name__ == "__main__":

    main()

