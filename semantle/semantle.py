import pickle

from flask import (
    Flask,
    send_file,
    send_from_directory,
    jsonify,
    render_template
)

import word2vec
from process_similar import get_nearest

app = Flask(__name__)
print("loading valid nearest")
with open('data/valid_nearest.dat', 'rb') as f:
    valid_nearest_words, valid_nearest_vecs = pickle.load(f)
with open('data/secrets.txt', 'r', encoding='utf-8') as f:
    secrets = [l.strip() for l in f.readlines()]
print("initializing nearest words for solutions")
app.secrets = dict()
app.nearests = dict()


@app.route('/guess/<int:id>/<string:word>')
def get_guess(id: int, word: str):
    if id not in app.secrets:
        app.secrets[id] = secrets[id]
        app.nearests[id] = get_nearest(id, app.secrets[id], valid_nearest_words, valid_nearest_vecs)

    print(app.secrets[id])
    if app.secrets[id].lower() == word.lower():
        word = app.secrets[id]
    rtn = {"guess": word}
    # check most similar
    if id in app.nearests and word in app.nearests[id]:
        rtn["sim"] = app.nearests[id][word][1]
        rtn["rank"] = app.nearests[id][word][0]
    else:
        try:
            rtn["sim"] = word2vec.similarity(app.secrets[id], word)
            rtn["rank"] = "1000위 이상"
        except KeyError:
            return jsonify({"error": "unknown"}), 404
    return jsonify(rtn)
