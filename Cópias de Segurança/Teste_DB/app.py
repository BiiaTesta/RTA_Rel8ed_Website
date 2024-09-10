from flask import Flask, request, jsonify, send_file
import sqlite3
import pandas as pd
import os

app = Flask(__name__)

DATABASE = 'rta.db'

def query_db(query, args=(), one=False):
    con = sqlite3.connect(DATABASE)
    cur = con.cursor()
    cur.execute(query, args)
    rv = cur.fetchall()
    con.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/data/<table_name>', methods=['GET'])
def get_data(table_name):
    try:
        data = query_db(f'SELECT * FROM {table_name}')
        if not data:
            return jsonify({'error': 'Table not found or empty'}), 404
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/upload', methods=['POST'])
def upload():
    if request.form['password'] != '1234':
        return 'Senha incorreta', 401

    file = request.files['file']
    if not file:
        return 'Nenhum arquivo enviado', 400

    table_name = request.form['table']
    if table_name not in ['schedule', 'program_duration', 'versions', 'weekly_ibm_trainings', 'weekly_wednesday_lectures', 'lectures']:
        return 'Tabela inválida', 400

    df = pd.read_excel(file)
    con = sqlite3.connect(DATABASE)
    df.to_sql(table_name, con, if_exists='replace', index=False)
    con.close()

    return 'Arquivo enviado com sucesso', 200

@app.route('/download/<table_name>', methods=['GET'])
def download(table_name):
    if table_name not in ['schedule', 'program_duration', 'versions', 'weekly_ibm_trainings', 'weekly_wednesday_lectures', 'lectures']:
        return 'Tabela inválida', 400

    data = query_db(f'SELECT * FROM {table_name}')
    if not data:
        return 'Tabela não encontrada ou vazia', 404

    df = pd.DataFrame(data)
    file_path = f'{table_name}.xlsx'
    df.to_excel(file_path, index=False)

    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
