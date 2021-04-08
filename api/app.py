from flask import Flask, request, jsonify
import json
import sqlite3


app = Flask(__name__)
DATABASE = 'words.db'

def connect():
    conn = sqlite3.connect(DATABASE)
    return conn

@app.route('/all-words')
def all_words():
    conn = connect()
    sql = 'SELECT * from vocabulum;'
    cursor = conn.cursor()
    cursor = cursor.execute(sql)
    conn.commit()
    data = cursor.fetchall()
    print(data)
    return jsonify(json.dumps(data)), 200


@app.route('/add-word', methods=['POST'])
def add_word():
    if request.method == 'POST':
        word = request.form['word']
        meaning = request.form['meaning']
        print(word, meaning)
        conn = connect()
        sql = 'INSERT INTO vocabulum VALUES (%s, %s)'
        cursor = conn.cursor()
        try:
            cursor.execute(sql, (word, meaning))
            conn.commit()
            return jsonify({'success': 'Word inserted with its meaning'}), 204
        except:
            return jsonify({'success': 'Word inserted with its meaning'}), 400


@app.route('/')
def hello():
    return "Hello World!"

if __name__ == '__main__':
    app.run(debug=1)