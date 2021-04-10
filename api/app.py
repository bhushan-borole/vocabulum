from flask import Flask, request, jsonify, abort
import json
from flask_cors import CORS
import sqlite3


app = Flask(__name__)
CORS(app)
DATABASE = 'vocabulum.db'

def connect():
    conn = sqlite3.connect(DATABASE)
    return conn

@app.route('/all-words')
def all_words():
    conn = connect()
    sql = 'SELECT * from vocabulum;'
    cursor = conn.cursor()
    cursor.execute(sql)
    conn.commit()
    data = cursor.fetchall()
    print(data)
    conn.close()
    return jsonify(json.dumps(data)), 200


@app.route('/add-word', methods=['POST'])
def add_word():
    if request.method == 'POST':
        data = request.get_json(force=True)
        word = data['word']
        meaning = data['meaning']
        conn = connect()
        sql = 'INSERT INTO vocabulum (word, meaning) VALUES ("%s", "%s")'
        cursor = conn.cursor()
        try:
            cursor.execute(sql % (word, meaning))
            conn.commit()
            conn.close()
            return jsonify({'message': 'Word inserted with its meaning'})
        except Exception as e:
            abort(400, 'Word could not be added')


if __name__ == '__main__':
    app.run(debug=1)