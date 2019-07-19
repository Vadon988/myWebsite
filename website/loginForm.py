from flask_wtf import FlaskForm 
from wtforms import StringField,SubmitField,PasswordField
from wtforms.validators import DataRequired,Email

class Signup(FlaskForm):
	username=StringField('New Username',validators=[DataRequired()])
	email=StringField(validators=[DataRequired()])
	password=PasswordField(validators=[DataRequired()])
	confPassword=PasswordField(validators=[DataRequired()])
	signSubmit=SubmitField('Sign up')

class LoginForm(FlaskForm):
	username=StringField(validators=[DataRequired()])
	email=StringField(validators=[DataRequired(),Email()])
	password=PasswordField(validators=[DataRequired()])
	loginSubmit=SubmitField('Login')

class LogoutForm(FlaskForm):
	user=StringField()
	outSubmit=SubmitField('Logout')