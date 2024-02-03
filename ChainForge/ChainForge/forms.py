from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import (
    StringField,
    PasswordField,
    SubmitField,
    BooleanField,
    SelectField,
    IntegerField,
)
from wtforms.validators import (
    DataRequired,
    Length,
    Email,
    EqualTo,
    ValidationError,
    NumberRange,
)
from wtforms.widgets import TextArea
from ChainForge.models import User, Art
from flask_login import login_user, current_user, logout_user, login_required


class RegistrationForm(FlaskForm):
    username = StringField(
        "Username", validators=[DataRequired(), Length(min=2, max=20)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    confirm_password = PasswordField(
        "Confirm Password", validators=[DataRequired(), EqualTo("password")]
    )
    submit = SubmitField("Sign Up")

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError(
                "That username is taken. Please choose a different one."
            )

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError("That email is taken. Please choose a different one.")


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField("Password", validators=[DataRequired()])
    remember = BooleanField("Remember Me")
    submit = SubmitField("Login")


class UpdateAccountForm(FlaskForm):
    username = StringField(
        "Username", validators=[DataRequired(), Length(min=2, max=20)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])
    picture = FileField(
        "Update Profile Picture", validators=[FileAllowed(["jpg", "png"])]
    )
    submit = SubmitField("Update")

    def validate_username(self, username):
        # need to check if not same as the old one
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError(
                    "That username is taken. Please choose a different one."
                )

    def validate_email(self, email):
        # need to check if not same as the old one
        if email.data != current_user.email:
            user = User.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError(
                    "That email is taken. Please choose a different one."
                )


class ArtAddForm(FlaskForm):
    title = StringField("title", validators=[DataRequired(), Length(min=2, max=20)])

    description = StringField("description", widget=TextArea())

    image = FileField("Art", validators=[FileAllowed(["jpg", "png"])])

    price = IntegerField("Price", validators=[NumberRange(min=1)])

    submit = SubmitField("Upload")

    def validate_title(self, title):
        art = Art.query.filter_by(title=title.data).first()

        if art:
            raise ValidationError("This title is already taken")


class OrderAddForm(FlaskForm):
    artist = IntegerField("Artist", validators=[NumberRange(min=1)])

    title = StringField("title", validators=[DataRequired(), Length(min=2, max=20)])

    description = StringField("description", widget=TextArea())

    price = IntegerField("Price", validators=[NumberRange(min=1)])

    submit = SubmitField("Upload")

    def validate_title(self, title):
        art = Art.query.filter_by(title=title.data).first()

        if art:
            raise ValidationError("This title is already taken")

    def validate_artist(self, artist):
        print(Art.query.all())
        art = User.query.filter_by(id=artist.data).first()

        if not (art):
            raise ValidationError("There is no author with this id")


class OrderAcceptForm(FlaskForm):
    image = FileField("Upload Art", validators=[FileAllowed(["jpg", "png"])])

    submit = SubmitField("Upload")


class DisputeForm(FlaskForm):
    your_id = IntegerField("Your id")
    their_id = IntegerField("their id")

    submit = SubmitField("Dispute")
