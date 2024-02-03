from datetime import datetime
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous.url_safe import URLSafeTimedSerializer as Serializer

from ChainForge import db,login_manager,app
from flask_login import UserMixin


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(20), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)

    arts = db.relationship('Art', backref='user', lazy=True)

    # req = db.relationship('Order', backref='req', lazy=True)

    # art = db.relationship('Order',backref='artist',lazy=True)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['SECRET_KEY'])
        try:
            user_id = s.loads(token)['user_id']
        except:
            return None
        return User.query.get(user_id)
    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"


class Art(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_file = db.Column(db.String(120), unique= True, nullable=False, default='entry.png')
    description = db.Column(db.String(120))
    title = db.Column(db.String(30),unique = True, nullable=False)
    price = db.Column(db.Integer)
    isSold = db.Column(db.Boolean,default = False,nullable = False)
    market = db.Column(db.Boolean,default=False,nullable = False)

    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

class Order(db.Model):
    id = db.Column(db.Integer,primary_key= True)
    description = db.Column(db.String(120))
    title = db.Column(db.String(100),unique = True, nullable = False)
    price = db.Column(db.Integer)

    req_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)
    art_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)


