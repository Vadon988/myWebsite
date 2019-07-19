from flask_wtf import FlaskForm 
from wtforms import StringField,SubmitField,PasswordField
from wtforms.validators import DataRequired,Email

class ImdbForm(FlaskForm):
	imdbQuery=StringField()
	submitImdb=SubmitField('Imdb')