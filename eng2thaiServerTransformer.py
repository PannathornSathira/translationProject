from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import AutoTokenizer
import torch
from Models.transformer import Transformer

app = Flask(__name__)
CORS(app)

# Load your model and tokenizer
model_name = "./Models/en2th_transformer.pth"  # Replace with your model path or name
tokenizer_path = "./Models/eng_to_thai_BART"

tokenizer = AutoTokenizer.from_pretrained(tokenizer_path)

# Transformer model configurations // don't touch if want to use pre-trained!
src_vocab_size = 260000
tgt_vocab_size = 260000
d_model = 512
num_heads = 8
num_layers = 6
d_ff = 2048
max_seq_length = 200
dropout = 0.1
device = torch.device("cpu")

model = Transformer(src_vocab_size, tgt_vocab_size, d_model, num_heads, num_layers, d_ff, max_seq_length, dropout, device)
model.load_state_dict(torch.load(model_name, map_location=torch.device('cpu')))

class Translator:
    def __init__(self, model, tokenizer, device):
        self.model = model
        self.tokenizer = tokenizer
        self.device = device

    def greedy_decode(self, src, max_len, start_symbol_ind, end_symbol_ind):
        tgt = torch.tensor([[start_symbol_ind]])  # Initialize with start symbol on the correct device
        for i in range(max_len - 1):  # Generate one token at a time
            with torch.no_grad():
                output = self.model(src, tgt)  # Forward pass through the model
                pred = output.argmax(dim=-1)[:, -1].unsqueeze(0)  # Predict the next token by selecting the one with highest probability
                if pred.item() == end_symbol_ind:  # If the predicted token is the end of sequence token
                    break
                tgt = torch.cat((tgt, pred), dim=-1)  # Append the predicted token to the output sequence
        return tgt.squeeze(0)

    def translate(self, input_text, max_seq_length):
        encoded_in = self.tokenizer(input_text, return_tensors="pt")['input_ids']
        start_symbol = tokenizer.lang_code_to_id['th_TH']
        end_symbol = self.tokenizer.convert_tokens_to_ids(self.tokenizer.eos_token)
        with torch.no_grad():
            generated_tokens = self.greedy_decode(encoded_in, max_seq_length, start_symbol, end_symbol)

        translated_text = self.tokenizer.decode(generated_tokens, skip_special_tokens=True)
        return translated_text
    
translator = Translator(model, tokenizer, device)

@app.route('/translateEng2thaiTransformer', methods=['POST'])
def translate():
    data = request.get_json()
    text_to_translate = data.get('text')
    if not text_to_translate:
        return jsonify({'error': 'No text provided'}), 400

    translated_text = translator.translate(text_to_translate, 50)
    
    return jsonify({'translated_text': translated_text})

if __name__ == '__main__':
    app.run(debug=True , port=5002)
