import sqlite3

def setup_database():
    connection = sqlite3.connect('rta.db')
    cursor = connection.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS schedule (
        id INTEGER PRIMARY KEY,
        time TEXT NOT NULL,
        monday TEXT,
        tuesday TEXT,
        wednesday TEXT,
        thursday TEXT,
        friday TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS program_duration (
        id INTEGER PRIMARY KEY,
        start TEXT NOT NULL,
        end TEXT NOT NULL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS versions (
        id INTEGER PRIMARY KEY,
        v1 TEXT,
        v2 TEXT,
        v3 TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS weekly_ibm_trainings (
        id INTEGER PRIMARY KEY,
        w1 TEXT,
        w2 TEXT,
        w3 TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS weekly_wednesday_lectures (
        id INTEGER PRIMARY KEY,
        w1_1 TEXT,
        w2_2 TEXT,
        w3_3 TEXT
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS lectures (
        id INTEGER PRIMARY KEY,
        week TEXT NOT NULL,
        date TEXT NOT NULL,
        instructor TEXT NOT NULL,
        topic TEXT NOT NULL
    )
    ''')

    connection.commit()
    connection.close()

if __name__ == '__main__':
    setup_database()
