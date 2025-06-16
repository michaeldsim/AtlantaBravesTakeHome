from flask import Flask, jsonify
from flask_cors import CORS
from data_loader import load_data
import pandas as pd

app = Flask(__name__)
CORS(app)
data = load_data()
data = data.fillna("N/A")

POSSIBLE_OUTCOMES = ['Single', 'Double', 'Triple', 'HomeRun', 'Out']
CACHE = {}

@app.get('/')
def index():
    return "Welcome to the Baseball Stats API!"

@app.get('/api/players')
def get_all_players():
    if 'players' in CACHE:
        return jsonify({'players': CACHE['players']})
    batter_data = data[['BATTER_ID', 'BATTER']].drop_duplicates().rename(columns={
        'BATTER' : 'name',
        'BATTER_ID' : 'id'
    }).assign(type='batter')
    pitcher_data = data[['PITCHER_ID', 'PITCHER']].drop_duplicates().rename(columns={
        'PITCHER' : 'name',
        'PITCHER_ID' : 'id'
    }).assign(type='pitcher')

    combined = pd.concat([batter_data, pitcher_data], ignore_index=True)
    players = combined.to_dict(orient='records')
    CACHE['players'] = players
    return jsonify({'players': players})

@app.get('/api/batters')
def get_batters():
    if 'batters' in CACHE:
        return jsonify({'batters': CACHE['batters']})
    
    batters = []
    for batter_id, group in data.groupby('BATTER_ID'):
        stats = process_batter_data(group)
        batters.append({
            'id': batter_id,
            'name': group['BATTER'].iloc[0],
            'average_exit_speed': stats['average_exit_speed'],
            'average_launch_angle': stats['average_launch_angle'],
            'average_hit_distance': stats['average_hit_distance'],
            'hard_hit_rate': stats['hard_hit_rate'],
            'total_games': len(group), 
        })
    CACHE['batters'] = batters
    return jsonify({'batters': batters})

@app.get('/api/pitchers')
def get_pitchers():
    if 'pitchers' in CACHE:
        return jsonify({'pitchers': CACHE['pitchers']})
    pitchers = []
    for pitcher_id, group in data.groupby('PITCHER_ID'):
        stats = process_pitcher_data(group)
        pitchers.append({
            'id': pitcher_id,
            'name': group['PITCHER'].iloc[0],
            'average_exit_speed': stats['average_exit_speed'],
            'hard_hit_rate': stats['hard_hit_rate'],
            'total_games': len(group),
        })
    CACHE['pitchers'] = pitchers
    return jsonify({'pitchers': pitchers})

@app.get('/api/batter/<int:batter_id>')
def get_batter_data(batter_id: int):
    filtered_rows = data[data['BATTER_ID'] == batter_id]
    if not len(filtered_rows):
        return {
            "message": "No data found"
        }
    
    processed_data = process_batter_data(filtered_rows)
    processed_data['game_history'] = filtered_rows.sort_values('GAME_DATE', ascending=False).to_dict(orient='records')
    return processed_data

@app.get('/api/pitcher/<int:pitcher_id>')
def get_pitcher_data(pitcher_id: int):
    filtered_rows = data[data['PITCHER_ID'] == pitcher_id]
    if not len(filtered_rows):
        return {
            "message": "No data found"
        }

    processed_data = process_pitcher_data(filtered_rows)
    processed_data['game_history'] = filtered_rows.sort_values('GAME_DATE', ascending=False).to_dict(orient='records')
    return processed_data

def process_pitcher_data(filtered_rows: pd.DataFrame):
    hard_hits = filtered_rows[filtered_rows['EXIT_SPEED'] > 95]
    outcomes = filtered_rows['PLAY_OUTCOME'].apply(lambda x: x if x in POSSIBLE_OUTCOMES else 'Other').value_counts().to_dict()
    return {
        'name' : filtered_rows['PITCHER'].iloc[0],
        'type' : 'pitcher',
        'average_exit_speed' : filtered_rows['EXIT_SPEED'].mean(),
        'hard_hit_rate': len(hard_hits) / len(filtered_rows),
        'outcomes' : outcomes
    }
    
def process_batter_data(filtered_rows: pd.DataFrame):
    hard_hits = filtered_rows[filtered_rows['EXIT_SPEED'] > 95]
    outcomes = filtered_rows['PLAY_OUTCOME'].apply(lambda x: x if x in POSSIBLE_OUTCOMES else 'Other').value_counts().to_dict()
    return {
        'name' : filtered_rows['BATTER'].iloc[0],
        'type' : 'batter',
        'average_exit_speed' : filtered_rows['EXIT_SPEED'].mean(),
        'average_launch_angle' : filtered_rows['LAUNCH_ANGLE'].mean(),
        'average_hit_distance' : filtered_rows['HIT_DISTANCE'].mean(),
        'hard_hit_rate': len(hard_hits) / len(filtered_rows),
        'outcomes' : outcomes
    }

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)