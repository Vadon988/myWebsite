import mysql.connector


class Database():
	
	def connect(cls):
		try:
			#user='vadimv',password='sky_data_nine',host='vadimv.mysql.pythonanywhere-services.com',database='vadimv$default'
			conn=mysql.connector.connect(user='vadon',password='mySuser',host='localhost',database='vadon$website')#user='vadon',password='mySuser',host='localhost',database='vadon$website'
			return conn
		except mysql.connector.Error as err:
			print(err)

	def delete_from(cls,table,user=None,col=None,val=None):

		conn=cls.connect()
		cursor=conn.cursor()
		if col!=None and val!=None:
			query=f'DELETE FROM {table} WHERE username="{user}" AND {col}="{val}"'
		elif user!=None:
			query=f'DELETE FROM {table} WHERE username="{user}"'
		else:
			query=f'DELETE FROM {table}'
		
		try:
			cursor.execute(query)
			conn.commit()
			print(f'{cursor.rowcount} in {table} deleted')
		except mysql.connector.Error as err:
			print(err)
		finally:
			cursor.close()
			conn.close()

	def select_from(cls,table,user=None):
		
		conn=cls.connect()
		cursor=conn.cursor()
		if user==None:
			query=f'SELECT * FROM {table}'
		else:
			query=f'SELECT * FROM {table} WHERE username="{user}"'
		try:
			if table!='science_news' and table!='popluer_machine':
				cursor.execute(query)
				data=cursor.fetchall()
				return data
			else:
				cursor.execute(query)
				data=cursor.fetchall()
				n=[]
				x=0
				while x<4:
					n.append(data[x])
					x+=1
				return n
		except mysql.connector.Error as err:
			print(err)
		finally:
			cursor.close()
			conn.close()



	def create_user(cls,*args):
		
		conn=cls.connect()
		cursor=conn.cursor()
		
		query=f'INSERT INTO users (username,email,password)VALUES(%s,%s,%s)'
		vals=(args)
		try:
			cursor.execute(query,args)
			conn.commit()
			print(f'{cursor.rowcount} in users updated')
		except mysql.connector.Error as err:
			print(err)
		finally:
			cursor.close()
			conn.close()
	
	def insert_into(cls,table,user=None,*args):
		conn=cls.connect()
		cursor=conn.cursor()
		val=(args)
		try:
			if table=='rate':
				query=f'INSERT INTO {table} (d_rate,d_xrate,p_rate,p_xrate,y_rate,y_xrate,e_rate,e_xrate) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='events':
				query=f'INSERT INTO {table} (username,event,hour,descreption,type_e,date) VALUES ("{user}",%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='wiki_search':
				query=f'INSERT INTO {table} (username,title,content,img,url) VALUES ("{user}",%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='science_news':
				query=f'INSERT INTO {table} (source,img,link,title,text,meta) VALUES (%s,%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='imdb_movie':
				query=f'INSERT INTO {table} (username,title,year,runtime,genre,director,actors,plot,poster,rating,production) VALUES ("{user}",%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='twitter_timeline':
				query=f'INSERT INTO {table} (created,text,link,name,img) VALUES (%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='popluer_machine':
				query=f'INSERT INTO {table} (link,img,title,content,author) VALUES (%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='yt_channels':
				query=f'INSERT INTO {table} (username,title,views,href) VALUES ("{user}",%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='git_repo':
				query=f'INSERT INTO {table} (name,html,disc,created,updated,pushed,git_url,size,lang,issues,projects,watchers,branch)VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')

			if table=='git_user':
				query=f'INSERT INTO {table} (name,api,url,repos_url,type_,public_repos,public_gists,followers,following,created,updated)VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
				cursor.execute(query,val)
				conn.commit()
				print(f'{cursor.rowcount} in {table} updated')



		except mysql.connector.Error as err:
			print(err)
		finally:
			cursor.close()
			conn.close()

Database().connect()