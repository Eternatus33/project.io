from flask import Flask, render_template, request, redirect, url_for
from models import db, Watch

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///watches.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route('/')
def index():
    watches = Watch.query.all()
    return render_template('index.html', watches=watches)

@app.route('/add', methods=['GET', 'POST'])
def add_watch():
    if request.method == 'POST':
        name = request.form['name']
        price = request.form['price']
        description = request.form['description']
        new_watch = Watch(name=name, price=price, description=description)
        db.session.add(new_watch)
        db.session.commit()
        return redirect(url_for('index'))
    return render_template('add_watch.html')

if __name__ == '__main__':
    app.run(debug=True)
  from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Watch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200), nullable=True)

    def __repr__(self):
        return f'<Watch {self.name}>'
