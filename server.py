from flask import Flask, session, redirect, request, url_for, render_template
from main_db_controll import db

def index():
   if request.method == "GET":
      return render_template('main.html')
   if request.method == "POST":
      info = request.form.to_dict(flat=False)
      db.add_data(info)
      data = db.get_data()
      return render_template('answer.html', obj=data)

app = Flask(__name__)
app.add_url_rule('/', 'index', index, methods=["GET", "POST"])

if __name__ == '__main__':
   app.run(debug=True)