from flask import Flask,render_template,url_for,request,redirect,session,flash
from flask_wtf import FlaskForm
from flask_bcrypt import Bcrypt 
from flask_wtf.csrf import CSRFProtect
from loginForm import LoginForm,LogoutForm,Signup
from database import Database
from googleForm import GoogleForm
from scrap import Scrap
from eventForm import EventForm,DelEvent
from wikiForm import WikiForm
from api import Api
from imdbForm import ImdbForm



app=Flask(__name__)
app.config['SECRET_KEY']='real_sec'
bcrypt=Bcrypt(app)
csrf=CSRFProtect(app)



@app.route('/',methods=['GET','POST'])
def login():
	loginForm=LoginForm(prefix='A')
	#user=Database().select_from('users',loginForm.username.data)
	
	if loginForm.validate_on_submit() and loginForm.loginSubmit.data:
		if loginForm.username.data=='orange_boom' and loginForm.email.data=='orange@gmail.com' and loginForm.password.data=='secret_orange':
			session['signup']='new_signup'
			return redirect(url_for('signup'))
		else:
			user=Database().select_from('users',loginForm.username.data)
			if user:
				if bcrypt.check_password_hash(user[0][2],loginForm.email.data) and bcrypt.check_password_hash(user[0][3],loginForm.password.data):
					session['user']=user[0][1]
					#flash(f'Welcome {user[0][1]}!',category='success')
					return redirect(url_for('index'))
				else:
					pass
					flash(f'Login error !',category='warning')
			else:
				pass
				flash('User dosnt exists !',category='warning')

	return render_template('login.html',
							loginForm=loginForm)

@app.route('/signup',methods=['GET','POST'])
def signup():
	sign_up=Signup(prefix='1')

	if sign_up.validate_on_submit() and sign_up.signSubmit.data:
		users=Database().select_from('users')
		exsits=False
		i=0
		while i<len(users):
			if users[i][1]==sign_up.username.data or bcrypt.check_password_hash(users[i][2],sign_up.email.data):
				flash(f'User {sign_up.username.data} all ready exists !',category='warning')
				exsits=True
				break
			i+=1

		if not exsits:
			if sign_up.password.data==sign_up.confPassword.data:
				newUser=sign_up.username.data
				newEmail=bcrypt.generate_password_hash(sign_up.email.data).decode('utf-8')
				newPassword=bcrypt.generate_password_hash(sign_up.password.data).decode('utf-8')
				flash(f'Welcome {newUser}',category='success')
				Database().create_user(newUser,newEmail,newPassword)
				return redirect(url_for('login'))
			else:
				flash('Passwords dosnt match',category='warning')
		
	
	if 'signup' in session:
		return render_template('signUp.html',sign_up=sign_up)
	return redirect(url_for('login'))

@app.route('/index',methods=['GET','POST'])
def index():

	user=session.get('user')
	logoutForm=LogoutForm(prefix='A')
	googleForm=GoogleForm(prefix='B')
	eventForm=EventForm(prefix='C')
	delForm=DelEvent(prefix='D')
	wikiForm=WikiForm(prefix='E')
	imdbForm=ImdbForm(prefix='F')


	#FORMS
	if logoutForm.validate_on_submit() and logoutForm.outSubmit.data:
		session.pop('user',None)
		return redirect(url_for('login'))

	print(googleForm.submitSearch.data)
	if googleForm.validate_on_submit() and googleForm.submitSearch.data:
		Scrap().google_query(googleForm.search.data)
		return redirect(url_for('index'))

	if eventForm.validate_on_submit() and eventForm.save_e.data:
		Database().insert_into('events',user,eventForm.event.data,eventForm.hour.data,eventForm.discreption.data,eventForm.type_e.data,eventForm.date.data,)
		flash(f'Event {eventForm.event.data} Saved !',category='success')
		return redirect(url_for('index'))

	if delForm.validate_on_submit() and delForm.delSubmit.data:
		Database().delete_from('events',user,'event',delForm.delName.data)
		flash(f'Event {delForm.delName.data} deleted !',category='warning')
		return redirect(url_for('index'))

	if wikiForm.validate_on_submit() and wikiForm.submit.data:
		wikiQuery=Api().wiki_search(wikiForm.query.data)
		try:
			Database().delete_from('wiki_search',user)
			Database().insert_into('wiki_search',user,wikiQuery[0],wikiQuery[2],wikiQuery[1],wikiQuery[3])
		except Exception as err:
			flash(f'Wiki Error',category='warning')
			print('wikiForm Error->',err)
		wikiData=Database().select_from('wiki_search',user)
		return redirect(url_for('index'))

	if imdbForm.validate_on_submit() and imdbForm.submitImdb.data:
		return redirect(url_for('index'))

	#UPDATES
	if 1>2:
		rate=Scrap().boi_rate()
		scinceScrap=Scrap().science_scrap()
		popMachine=Scrap().populer_machine()
		imdb=Scrap().imdb_scrap(user)
		yout=Scrap().youtube_scrap('vadon')
		tweeter=Api().twitter_api()
		gitRepo=Api().github_api()
	#print(r)
	
	

	rateData=Database().select_from('rate')
	eventsData=Database().select_from('events',user)
	wikiData=Database().select_from('wiki_search',user)
	scienceData=Database().select_from('science_news')
	popmData=Database().select_from('popluer_machine')
	imdbData=Database().select_from('imdb_movie',user)
	ytData=Database().select_from('yt_channels','vadon')
	twitterData=Database().select_from('twitter_timeline')
	gitRepoData=Database().select_from('git_repo')
	gitUserData=Database().select_from('git_user')
	#print(gitUserData)
	
	
	if len(wikiData)<1:
		wikiQuery=Api().wiki_search('internet')
		Database().insert_into('wiki_search',user,wikiQuery[0],wikiQuery[2],wikiQuery[1],wikiQuery[3])
		wikiData=Database().select_from('wiki_search',user)
	
	
	
	
	#email=bcrypt.generate_password_hash('test@gmail.com').decode('utf-8')
	#password=bcrypt.generate_password_hash('password').decode('utf-8')
	#Database().create_user('test',email,password)
	
	if 'user' in session:
		user=session.get('user')
		return render_template('index.html'
								,user=user,
								logoutForm=logoutForm,
								googleForm=googleForm,
								rateData=rateData,
								eventForm=eventForm,
								eventsData=eventsData,
								delForm=delForm,
								wikiForm=wikiForm,
								wikiData=wikiData,
								scienceData=scienceData,
								popmData=popmData,
								imdbData=imdbData,
								ytData=ytData,
								imdbForm=imdbForm,
								twitterData=twitterData,
								gitRepoData=gitRepoData,
								gitUserData=gitUserData,
								)
	return redirect(url_for('login'))

if __name__=='__main__':
	app.run(debug=True)