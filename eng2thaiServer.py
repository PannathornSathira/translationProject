from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import MBartForConditionalGeneration, AutoTokenizer

app = Flask(__name__)
CORS(app)

# Load your model and tokenizer
model_name = "./Models/eng_to_thai_BART"  # Replace with your model path or name
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = MBartForConditionalGeneration.from_pretrained(model_name)

@app.route('/translateEng2thai', methods=['POST'])
def translate():
    data = request.get_json()
    text_to_translate = data.get('text')
    if not text_to_translate:
        return jsonify({'error': 'No text provided'}), 400

    # Tokenize the input text
    inputs = tokenizer.encode(text_to_translate, return_tensors="pt")

    # Generate translation
    outputs = model.generate(inputs, max_length=512, num_beams=4, early_stopping=True)

    # Decode the output
    translated_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    
    return jsonify({'translated_text': translated_text})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
