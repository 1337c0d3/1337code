import json
from pprint import pprint

with open('response.json') as data_file:
    data = json.load(data_file)
questions = [];
for q in data['stat_status_pairs']:
    questions.append({
        'link': q['stat']['question__title_slug'],
        'title': q['stat']['question__title'],
        'frequency': q['frequency'],
        'id': q['stat']['question_id'],
        'level': q['difficulty']['level'],
        'paid_only': q['paid_only']
    })
with open('questions.json', 'w') as outfile:
    json.dump(questions, outfile)
