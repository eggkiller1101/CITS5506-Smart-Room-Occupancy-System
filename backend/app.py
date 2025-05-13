from flask import Flask, jsonify, request
from flask_cors import CORS
from db import get_db, close_db, init_db
from config import OCCUPANCY_THRESHOLD

app = Flask(__name__)
CORS(app)

CURRENT_THRESHOLD = OCCUPANCY_THRESHOLD

app.teardown_appcontext(close_db)

@app.before_request
def before_first_request():
    init_db()

# POST /api/occupancy/update
@app.route('/api/occupancy/update', methods=['POST'])
def update_occupancy():
    data = request.get_json()
    timestamp = data.get('timestamp')              # e.g., "2025-05-13T15:23:00Z"
    delta = data.get('delta')                      # +1 or -1
    current_count = data.get('current_count')      # result after delta applied
    event_type = data.get('event_type')            # 'entry' or 'exit'
    sensor_trace = data.get('sensor_trace')        # e.g., "S4->S3"
    validated_by = data.get('validated_by')        # e.g., "S1" or "S2"

    db = get_db()
    db.execute(
        '''INSERT INTO occupancy (
            timestamp, delta, resulting_count,
            event_type, sensor_trace, validated_by
        ) VALUES (?, ?, ?, ?, ?, ?)''',
        (timestamp, delta, current_count, event_type, sensor_trace, validated_by)
    )
    db.commit()

    return jsonify({"status": "success"}), 200

# GET /api/occupancy/current
@app.route('/api/occupancy/current', methods=['GET'])
def get_current():
    db = get_db()
    row = db.execute(
        'SELECT resulting_count, timestamp FROM occupancy ORDER BY id DESC LIMIT 1'
    ).fetchone()

    if row:
        current_count = row['resulting_count']
        last_update = row['timestamp']
    else:
        current_count = 0
        last_update = None

    overcrowding = current_count >= CURRENT_THRESHOLD

    return jsonify({
        "current_count": current_count,
        "overcrowding": overcrowding,
        "threshold": CURRENT_THRESHOLD,
        "last_update": last_update
    })

# GET /api/occupancy/history
@app.route('/api/occupancy/history', methods=['GET'])
def get_history():
    from_ts = request.args.get('from')
    to_ts = request.args.get('to')

    db = get_db()
    query = 'SELECT timestamp, delta, resulting_count, door FROM occupancy WHERE 1=1'
    params = []

    if from_ts:
        query += ' AND timestamp >= ?'
        params.append(from_ts)
    if to_ts:
        query += ' AND timestamp <= ?'
        params.append(to_ts)

    query += ' ORDER BY timestamp ASC'

    rows = db.execute(query, params).fetchall()
    history = [
        {
            "timestamp": row["timestamp"],
            "delta": row["delta"],
            "resulting_count": row["resulting_count"],
            "door": row["door"]
        } for row in rows
    ]

    return jsonify({"history": history})

# GET /api/alert/status
@app.route('/api/alert/status', methods=['GET'])
def alert_status():
    db = get_db()
    row = db.execute('SELECT resulting_count FROM occupancy ORDER BY id DESC LIMIT 1').fetchone()
    current_count = row['resulting_count'] if row else 0
    overcrowding = current_count >= CURRENT_THRESHOLD

    return jsonify({
        "overcrowding": overcrowding,
        "threshold": CURRENT_THRESHOLD,
        "current_count": current_count
    })

# POST /api/occupancy/reset
@app.route('/api/occupancy/reset', methods=['POST'])
def reset_occupancy():
    db = get_db()
    db.execute('DELETE FROM occupancy')
    db.commit()
    return jsonify({"status": "reset_done"})

# GET /api/config/threshold
# Raspberry Pi can call this to fetch the current threshold
@app.route('/api/config/threshold', methods=['GET'])
def get_threshold():
    return jsonify({"threshold": CURRENT_THRESHOLD})

# POST /api/config/threshold
@app.route('/api/config/threshold', methods=['POST'])
def update_threshold():
    global CURRENT_THRESHOLD
    data = request.get_json()
    try:
        CURRENT_THRESHOLD = int(data.get('threshold'))
        return jsonify({"message": "Threshold updated", "threshold": CURRENT_THRESHOLD}), 200
    except Exception as e:
        return jsonify({"error": "Invalid threshold"}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8001)