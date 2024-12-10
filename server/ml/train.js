import * as tf from '@tensorflow/tfjs-node';
import natural from 'natural';
import fs from 'fs/promises';

async function buildModel() {
  const model = tf.sequential();
  
  model.add(tf.layers.dense({
    units: 128,
    activation: 'relu',
    inputShape: [5000]
  }));
  
  model.add(tf.layers.dropout({ rate: 0.5 }));
  
  model.add(tf.layers.dense({
    units: 64,
    activation: 'relu'
  }));
  
  model.add(tf.layers.dropout({ rate: 0.3 }));
  
  model.add(tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  }));

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

async function trainModel() {
  const model = await buildModel();
  
  // Training logic here
  
  await model.save('file://./public/models/phishing-detection-model');
  console.log('Model trained and saved successfully');
}

trainModel().catch(console.error);