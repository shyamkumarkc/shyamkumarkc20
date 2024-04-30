from flask import Flask, jsonify

app = Flask(__name__)

# Dummy data (replace with actual data from your database)
branches = [
    {"bank": "Bank A", "branch": "Branch 1", "district": "District 1", "local_level": "Local Level 1"},
    {"bank": "Bank B", "branch": "Branch 2", "district": "District 1", "local_level": "Local Level 2"},
    # More branches...
]

# Endpoint to get all branches
@app.route('/branches', methods=['GET'])
def get_all_branches():
    return jsonify(branches)

# Endpoint to get branches in a specific district
@app.route('/branches/<district>', methods=['GET'])
def get_branches_by_district(district):
    district_branches = [branch for branch in branches if branch['district'] == district]
    return jsonify(district_branches)

# Endpoint to get branches in a specific local level within a district
@app.route('/branches/<district>/<local_level>', methods=['GET'])
def get_branches_by_local_level(district, local_level):
    local_level_branches = [branch for branch in branches if branch['district'] == district and branch['local_level'] == local_level]
    return jsonify(local_level_branches)

if __name__ == '__main__':
    app.run(debug=True)
