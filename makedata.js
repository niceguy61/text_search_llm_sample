const fs = require('fs');
const searchSpaces = [1,2,3,4,5,6,7,8,9,10]

function generateRandomText(searchSpaces) {
    const words = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig', 'grape', 'pig', 'new', 'world', 'order'];
    const sentence = [];
    for (let i = 0; i < searchSpaces; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        sentence.push(words[randomIndex]);
    }
    return sentence.join(' ');
}

// 생성할 데이터 수
const numberOfDataPoints = 1000000;

for(let x = 0; x < searchSpaces.length; x++) {
    const dataset = [];
    for (let i = 0; i < numberOfDataPoints; i++) {
        const randomText = generateRandomText(searchSpaces[x]);
        const data = {
            key: randomText,
            url: `https://${randomText.split(" ")[0]}.com`
        };
        dataset.push(data);
    }
    // 데이터셋을 JSON 파일에 저장
    try {
        fs.writeFileSync(`your_dataset_${searchSpaces[x]}.json`, JSON.stringify(dataset));
    } catch (e) {
        console.log(e.message)
    }
    
}