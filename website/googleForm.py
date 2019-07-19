from flask_wtf import FlaskForm 
from wtforms import StringField,SubmitField,PasswordField
from wtforms.validators import DataRequired,Email

class GoogleForm(FlaskForm):
	search=StringField()
	submitSearch=SubmitField()