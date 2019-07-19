import wikipedia
import requests
import json,os
from database import Database
from twython import Twython

class Api():

	def config(cls):
		#print(os.getcwd())
		json_file='config_site1.init'
		with open(json_file,'r',encoding='utf-8') as f:
			data=json.loads(f.read())
		return data

	def wiki_search(cls,query):
		
		try:
			page=wikipedia.page(query)
			title=page.title
			content=wikipedia.summary(query,sentences=6)
			img=page.images[1]
			url=page.url
			wiki_list=[title,img,content,url]
			#print('->',wiki_list)
			return wiki_list
		except Exception as err:
			return err

	def imdb_api(cls,movie,user):
		
		config=cls.config()
		config=config['omdb']
		url=f'http://www.omdbapi.com/?apikey={config}d&t={movie}'#eb0ccd8
		try:
			r=requests.get(url)
			if r.status_code==200:
				data=json.loads(r.text)
				title=data['Title']
				year=data['Year']
				runtime=data['Runtime']
				genre=data['Genre']
				director=data['Director']
				actors=data['Actors']
				plot=data['Plot']
				poster=data['Poster']
				rating=data['imdbRating']
				production=data['Production']
				Database().insert_into('imdb_movie',user,title,year,runtime,genre,director,actors,plot,poster,rating,production)


		except Exception as err:
			print(err)

	def twitter_api(cls):
		config=cls.config()
		
		API_KEY=config['twitter'][0]['api_key']
		API_SECRET_KEY=config['twitter'][0]['api_secret_key']
		ACCESS_TOKEN=config['twitter'][0]['access_token']
		ACCESS_TOKEN_SECRET=config['twitter'][0]['access_token_secret']

		twitter=Twython(API_KEY,API_SECRET_KEY,ACCESS_TOKEN,ACCESS_TOKEN_SECRET)
		twitter=twitter.get_home_timeline()
		if twitter!=None:
			Database().delete_from('twitter_timeline',None,None)
		x=0
		while x<len(twitter):
			try:
				created=twitter[x]['created_at']
				text=twitter[x]['text']
				link=twitter[x]['user']['url']
				name=twitter[x]['user']['screen_name']
				img=twitter[x]['user']['profile_image_url']
				Database().insert_into('twitter_timeline',None,created,text,link,name,img)
				x+=1
			except Exception as err:
				print(err)

	def github_api(cls):
		
		r=requests.get('https://api.github.com/users/Vadon988/repos')
		u=requests.get('https://api.github.com/users/Vadon988')
		
		if u.status_code==200:
			Database().delete_from('git_user')
			userData=u.json()
			try:
				name=userData['login']
				api=userData['url']
				url=userData['html_url']
				repos_url=userData['repos_url']
				type_=userData['type']
				public_repos=userData['public_repos']
				public_gists=userData['public_gists']
				followers=userData['followers']
				following=userData['following']
				created=userData['created_at']
				updated=userData['updated_at']
				Database().insert_into('git_user',None,name,api,url,repos_url,type_,public_repos,public_gists,followers,following,created,updated)

			except Exception as err:
				print(err)
		
		if r.status_code==200:
			Database().delete_from('git_repo')
			repoData=r.json()
			try:
				for x in repoData:
					name=x['name']
					html=x['html_url']
					disc=x['description']
					created=x['created_at']
					updated=x['updated_at']
					pushed=x['pushed_at']
					git_url=x['url']
					size=x['size']
					lang=x['language']
					issues=x['has_issues']
					projects=x['has_projects']
					watchers=x['watchers']
					branch=x['default_branch']
					Database().insert_into('git_repo',None,name,html,disc,created,updated,pushed,git_url,size,lang,issues,projects,watchers,branch)
			except Exception as err:
				print(err)
		
		

