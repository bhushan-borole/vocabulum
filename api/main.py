import os
import sqlite3
import pandas as pd

db_name = 'vocabulum.db'
os.system('rm ' + db_name)
connection = sqlite3.connect(db_name)

cursor = connection.cursor()
cursor.execute('create table vocabulum(id integer primary key, word text, meaning text)')
cursor.close()

connection.commit()

db = pd.read_sql_query('select * from vocabulum', connection)
print(db)
