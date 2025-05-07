from flask import Flask,request, jsonify, render_template
from flask_cors import CORS
from db import get_db, close_db, init_db
from config import OCCUPANCY_THRSHOLD

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

app.teardown_appcontext(close_db)

@app.route('/')
def index():
    return render_template('index.html')

@app.before_request
def setup():
    init_db()

# POST /api/occupancy/update
@app.route('/api/occupancy/update', methods=['POST'])
def update_occupancy():
    data = request.get_json()
    timestamp = data['timestamp']
    delta = data['delta']
    door = data['door']

    db = get_db()
    last = db.execute('SELECT resulting_count FROM occupancy ORDER BY id DESC LIMIT 1').fetchone()
    current = last['resulting_count'] if last else 0
    new_count = current + delta

    db.execute(
        'INSERT INTO occupancy (timestamp, delta, resulting_count, door) VALUES (?, ?, ?, ?)',
        (timestamp, delta, new_count, door)
    )
    db.commit()

    return jsonify({"message": "Occupancy updated", "current_count": new_count}), 200

# GET /api/occupancy/current
@app.route('/api/occupancy/current')
def get_current():
    db = get_db()
    last = db.execute('SELECT resulting_count FROM occupancy ORDER BY id DESC LIMIT 1').fetchone()
    count = last['resulting_count'] if last else 0
    return jsonify({"current_count": count})

# GET /api/alert/status
@app.route('/api/alert/status')
def alert_status():
    db = get_db()
    last = db.execute('SELECT resulting_count FROM occupancy ORDER BY id DESC LIMIT 1').fetchone()
    count = last['resulting_count'] if last else 0
    return jsonify({
        "overcrowded": count >= OCCUPANCY_THRSHOLD,
        "current_count": count
    })

# GET /api/occupancy/history
@app.route('/api/occupancy/history')
def get_history():
    db = get_db()
    rows = db.execute('SELECT timestamp, resulting_count FROM occupancy ORDER BY id ASC').fetchall()
    result = [{"timestamp": row["timestamp"], "resulting_count": row["resulting_count"]} for row in rows]
    return jsonify({"history": result})

# POST /api/occupancy/reset
@app.route('/api/occupancy/reset', methods=['POST'])
def reset_occupancy():
    db = get_db()
    db.execute('DELETE FROM occupancy')
    db.commit()
    return jsonify({"message": "Occupancy count reset"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=8000)