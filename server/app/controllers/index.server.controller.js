const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

// Load symptom training and testing data
const symptom = require('../../symptom.json');
const symptomTesting = require('../../symptom-testing.json');

exports.trainAndPredict = function (req, res) {
    const {
        fever,
        cough,
        fatigue,
        headache,
        loss_taste_smell,
        sore_throat,
        shortness_breath,
        muscle_aches,
        nausea_vomiting,
        diarrhea,
        runny_stuffy_nose,
        chills,
        to_doctor
    } = req.body;

    const inputData = tf.tensor2d([[fever, cough, fatigue, headache, loss_taste_smell, sore_throat, shortness_breath, muscle_aches, nausea_vomiting, diarrhea, runny_stuffy_nose, chills]]);

    const trainingData = tf.tensor2d(symptom.map(item => [
        item.fever, item.cough, item.fatigue, item.headache, item.loss_taste_smell, item.sore_throat,
        item.shortness_breath, item.muscle_aches, item.nausea_vomiting, item.diarrhea, item.runny_stuffy_nose, item.chills
    ]));

    const outputData = tf.tensor2d(symptom.map(item => [
        item.to_doctor === "yes" ? 1 : 0,
    ]));

    const testingData = tf.tensor2d(symptom.map(item => [
        item.fever, item.cough, item.fatigue, item.headache, item.loss_taste_smell, item.sore_throat,
        item.shortness_breath, item.muscle_aches, item.nausea_vomiting, item.diarrhea, item.runny_stuffy_nose, item.chills
    ]));

    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [12],
        activation: "sigmoid",
        units: 6,
    }));

    model.add(tf.layers.dense({
        inputShape: [6],
        activation: "sigmoid",
        units: 4,
    }));

    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 1,
    }));

    model.compile({
        loss: "binaryCrossentropy",
        optimizer: tf.train.adam(0.001),
        metrics: ['accuracy'],
    });

    console.log(model.summary());

    async function run() {
        const startTime = Date.now()

        await model.fit(trainingData, outputData,
            {
                epochs: 100,
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log(`Epoch ${epoch}: lossValue = ${log.loss}`);
                        elapsedTime = Date.now() - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                        console.log(fever, cough, fatigue, headache, loss_taste_smell, sore_throat, shortness_breath, muscle_aches, nausea_vomiting, diarrhea, runny_stuffy_nose, chills);
                    }
                }
            }
        )

        const results = model.predict(testingData);

        results.array().then(array => {
            console.log(array)
            var resultForData1 = array[0];
            var dataToSent = { to_doctor: resultForData1 > 0.5 ? "yes" : "no" };
            console.log(resultForData1)
            res.status(200).send(dataToSent);
        })
    }
    run()
};
