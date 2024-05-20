# Overall project

This project develop front-end and back-end to linking between the webpage and transaltion models. It consists of 5 pages for the web page and 4 python files for running models. These page can translate from Thai to Eng and Eng to Thai by two different models which are transformer and fine-tuned bart, and it also records the history of translation.

**Note: these code on github do not contain the model code because of size of models. You need to download by yourself from summited link.**

## Main Scripts to run the project
In the project, the following commands need to be run at the same time by using different terminal, and the path of model in all python code need to be changed which are eng2thaiServer.py, thai2engServer.py, thai2engServerTransformer.py, and eng2thaiServerTransformer.py.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `python3 eng2thaiServer.py`

This file will run the code to receive English text and translate to Thai text by using fine-tuned bart model Eng-Th. It will run on default port which is 5000. The webpage need to communicate via "http://127.0.0.1:5000/translateEng2thai" to send and receive data between front-end and back-end

### `python3 thai2engServer.py`

This file will run the code to receive Thai texts and translate to English texts by using fine-tuned bart model Th-Eng. It will run on the port 5001. The webpage need to communicate via "http://127.0.0.1:5001/translateThai2eng" to send and receive data between front-end and back-end

### `python3 thai2engServerTransformer.py`

This file will run the code to receive English text and translate to Thai text by using transformer model Th-Eng. It will run on the port 5003. The webpage need to communicate via "http://127.0.0.1:5003/translateThai2engTransformer" to send and receive data between front-end and back-end.

### `python3 eng2thaiServerTransformer.py`

This file will run the code to receive Thai text and translate to English text by using transformer model Eng-Th. It will run on the port 5002. The webpage need to communicate via "http://127.0.0.1:5002/translateEng2thaiTransformer" to send and receive data between front-end and back-end

## Main structure of this project
The code in app.js file will be the center of every pages. It responsible for routing to each page. All web pages code is stored in Containers files. Engtothai.js is the web for traslation from English to Thai while Thaitoeng.js is for translation from Thai to English. The page that its name end with Transformer is the page that use transformer model while the page that its name does'n end with Transformer is the page that use fine-tuned bart model. All four page use the same decoration, so it uses the same css file which is Engtothai.css . After each page perform translation, it will store the history into the object named "wordsList". This object is send to history page to represent the history of the translation.

## The use of webpage
The first page or home page of this webpage is English-Thai page (using fine-tuned bart). To perform translation, users will type in the left text box and then click that translation button. To switch the language from Eng-Th to Th-Eng, users can click `⇄` character to change the page. Users can click the same character to change page back.
If users want to change the model from fine-tuned bart to transformer, users can click Change model button to change the model. Users also can click the same button to change the model back to fine-tuned bart.
