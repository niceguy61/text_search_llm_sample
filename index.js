const tf = require('@tensorflow/tfjs-node');
const natural = require('natural');
const fs = require('fs');
const searchQuery = 'cherry love'; // 사용자의 검색어
// 검색어 입력
const searchSpaces = searchQuery.split(" ").length;

// JSON 파일에서 데이터셋 로드
const jsonDataset = JSON.parse(fs.readFileSync(`your_dataset_${searchSpaces}.json`));

// 학습 데이터셋 추출
const dataset = jsonDataset.map(data => data.key);

// 텍스트 데이터 토큰화 및 단어 숫자 인코딩
const tokenizer = new natural.WordTokenizer();
const tokenizedData = dataset.map(text => tokenizer.tokenize(text));

// 단어 사전 만들기
const vocabulary = Array.from(new Set(tokenizedData.flat()));

const textToNumeric = text => {
    return text.map(word => vocabulary.indexOf(word));
};

const numericData = tokenizedData.map(text => textToNumeric(text));

const inputTensor = tf.tensor(numericData);

// 검색어 토큰화 및 숫자 인코딩
const searchTokens = tokenizer.tokenize(searchQuery);
const searchNumeric = searchTokens.map(word => vocabulary.indexOf(word));
const searchTensor = tf.tensor([searchNumeric]);

// 모델을 사용하여 검색어와 학습 데이터 간의 유사도 계산
const similarityScores = inputTensor.matMul(searchTensor.transpose());

// 유사도가 가장 높은 텍스트 찾기
const maxSimilarityIndex = similarityScores.argMax().dataSync()[0];
const mostSimilarData = jsonDataset[maxSimilarityIndex];

console.log(mostSimilarData);