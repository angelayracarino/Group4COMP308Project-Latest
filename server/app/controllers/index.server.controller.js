const tf = require('@tensorflow/tfjs');
require('@tensorflow/tfjs-node');

// Load symptom training and testing data
const symptom = require('../../symptom.json');
const symptomTesting = require('../../symptom-testing.json');

exports.trainAndPredict = function (req, res) {
    const {
        body_temperature,
        heart_rate,
        respiratory_rate,
        pulse_rate
    } = req.body;

    const inputData = tf.tensor2d([[body_temperature, heart_rate, respiratory_rate, pulse_rate]]);

    const trainingData = tf.tensor2d(symptom.map(item => [
        item.body_temperature, item.heart_rate, item.respiratory_rate, item.pulse_rate
    ]));

    const outputData = tf.tensor2d(symptom.map(item => [
        item.to_doctor === "yes" ? 1 : 0,
    ]));

    const testingData = tf.tensor2d(symptom.map(item => [
        item.body_temperature, item.heart_rate, item.respiratory_rate, item.pulse_rate
    ]));

    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: [4],
        activation: "sigmoid",
        units: 5,
    }));

    model.add(tf.layers.dense({
        inputShape: [5],
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
                        console.log(body_temperature, heart_rate, respiratory_rate, pulse_rate);
                    }
                }
            }
        )

        const results = model.predict(testingData);

        results.array().then(array => {
            console.log(array[0][0])
            var resultForData1 = array[0][0] >= 0.5 ? "yes" : "no";
            var dataToSent = { row1: resultForData1 }
            console.log(resultForData1)
            console.log(dataToSent)
            console.log(body_temperature, heart_rate, respiratory_rate, pulse_rate)
            res.status(200).send(dataToSent);
        })
    }
    run()
};
