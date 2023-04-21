//
// A GraphQL schema that defines types, queries and mutations
//
var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var GraphQLBoolean = require('graphql').GraphQLBoolean;
var GraphQLFloat = require('graphql').GraphQLFloat;

// You can now use GraphQLFloat as a scalar type in your GraphQL schema or resolver code


// Models
var AlertModel = require('../models/Alert');
var SymptomModel = require('../models/Symptom');
var TipModel = require('../models/Tip');
var UserModel = require('../models/User');
var VitalModel = require('../models/Vital');

//
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "some_secret_key"; // generate this elsewhere
const jwtExpirySeconds = 1000;

//
// Create a GraphQL Object Type for Student model
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type.
const userType = new GraphQLObjectType({
  name: 'user',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      firstName: {
        type: GraphQLString
      },
      lastName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      password: {
        type: GraphQLString
      },
      address: {
        type: GraphQLString
      },
      city: {
        type: GraphQLString
      },
      province: {
        type: GraphQLString
      },
      postalCode: {
        type: GraphQLString
      },
      phone: {
        type: GraphQLString
      },
      role: {
        type: GraphQLString
      }
    }
  }
});
//

const vitalType = new GraphQLObjectType({
  name: 'vital',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      bodyTemperature: {
        type: GraphQLString
      },
      heartRate: {
        type: GraphQLString
      },
      bloodPressure: {
        type: GraphQLString
      },
      respiratoryRate: {
        type: GraphQLString
      },
      pulseRate: {
        type: GraphQLString
      },
      date: {
        type: GraphQLString
      },
      time: {
        type: GraphQLString
      },
      patient: {
        type: GraphQLString
      }
    }
  }
});

const tipType = new GraphQLObjectType({
  name: 'tip',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      title: {
        type: GraphQLString
      },
      description: {
        type: GraphQLString
      }
    }
  }
});

const alertType = new GraphQLObjectType({
  name: 'alert',
  fields: function () {
    return {
      _id: {
        type: GraphQLID
      },
      responderName: {
        type: GraphQLString
      },
      email: {
        type: GraphQLString
      },
      phoneNumber: {
        type: GraphQLString
      },
      patientName: {
        type: GraphQLString
      },
      address: {
        type: GraphQLString
      },
      message: {
        type: GraphQLString
      },
    }
  }
});

const symptomsType = new GraphQLObjectType({
  name: 'Symptom',
  fields: function () {
    return {
      selectedSymptom: { type: GraphQLNonNull(GraphQLList(GraphQLNonNull(GraphQLString))) },
      patient: { type: GraphQLNonNull(GraphQLString) },
      date: { type: GraphQLNonNull(GraphQLString) },
      time: { type: GraphQLNonNull(GraphQLString) },
    }
  }
});

//Create a graphql Object Type for payload
const PayloadType = new GraphQLObjectType({
  name: 'Payload',
  fields: () => ({
    _id: { type: GraphQLID },
    email: { type: GraphQLString },
    role: { type: GraphQLString },
    token: { type: GraphQLString }
  })
});

const ClearCookieToken = (context) => {
  context.res.clearCookie('token');
};

const GetPayloadFromCookies = async (context) => {
  if (!context.req.cookies.token) {
    throw new Error('Error retrieving token from cookie');
  }
  var payload;
  try {
    payload = jwt.verify(context.req.cookies.token, JWT_SECRET);
  }
  catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Json Web Token Error');
    }
    else {
      throw new Error('Error verifying token');
    }
  }
  return payload;
}


// Create a GraphQL query type that returns a student by id
// In this case, the queries are defined within the fields object.
// The fields object is a required property of a GraphQLObjectType 
// and it defines the different fields or query/mutations that are available
// in this type. 
//
const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: function () {
    return {
      alerts: {
        type: new GraphQLList(alertType),
        resolve: function () {
          const alerts = AlertModel.find().exec()
          if (!alerts) {
            throw new Error('Error')
          }
          return alerts
        }
      },
      alert: {
        type: alertType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const alertInfo = AlertModel.findById(params.id).exec()
          if (!alertInfo) {
            throw new Error('Error')
          }
          return alertInfo
        }
      },
      tips: {
        type: new GraphQLList(tipType),
        resolve: function () {
          const tips = TipModel.find().exec()
          if (!tips) {
            throw new Error('Error')
          }
          return tips
        }
      },
      tip: {
        type: tipType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const tipInfo = TipModel.findById(params.id).exec()
          if (!tipInfo) {
            throw new Error('Error')
          }
          return tipInfo
        }
      },
      symptoms: {
        type: new GraphQLList(symptomsType),
        resolve: function () {
          const symptoms = SymptomModel.find().exec()
          if (!symptoms) {
            return [];
          }
          return symptoms
        }
      },
      symptom: {
        type: symptomsType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        }
      },
      vitals: {
        type: new GraphQLList(vitalType),
        resolve: function () {
          const vitals = VitalModel.find().exec()
          if (!vitals) {
            throw new Error('Error')
          }
          return vitals
        }
      },
      vital: {
        type: vitalType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const vitalInfo = VitalModel.findById(params.id).exec()
          if (!vitalInfo) {
            throw new Error('Error')
          }
          return vitalInfo
        },
      },
      vitalByName: {
        type: new GraphQLList(vitalType),
        args: {
          patient: {
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const vitals = VitalModel.find({ patient: params.patient })
          if (!vitals) {
            throw new Error('Error')
          }
          return vitals
        }
      },      
      users: {
        type: new GraphQLList(userType),
        resolve: function () {
          const users = UserModel.find().exec()
          if (!users) {
            throw new Error('Error')
          }
          return users;
        }
      },
      user: {
        type: userType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: function (root, params) {
          const userInfo = UserModel.findById(params.id).exec()
          if (!userInfo) {
            throw new Error('Cannot find user')
          }
          return userInfo;
        }
      },
      nurses: {
        type: new GraphQLList(userType),
        resolve: async function () {
          const nurses = await UserModel.find({ role: 'nurse' })
          if (!nurses) {
            throw new Error('Error locating role for user')
          }
          return nurses;
        }
      },
      patients: {
        type: new GraphQLList(userType),
        resolve: async function () {
          const patients = await UserModel.find({ role: 'patient' });
          if (!patients) {
            throw new Error('Error locating role for patient')
          }
          return patients;
        }
      },
      patient: {
        type: userType,
        args: {
          id: {
            name: '_id',
            type: GraphQLString
          }
        },
        resolve: async function (root, params) {
          const patientInfo = await UserModel.findById(params.id);
          if (!patientInfo) {
            throw new Error('Cannot find patient');
          }
          return patientInfo;
        }
      },
      payload: {
        type: PayloadType,
        resolve: async function (root, params, context) {
          try {
            return await GetPayloadFromCookies(context);
          }
          catch (error) {
            throw new Error(error);
          }
        }
      }
    }
  }
});

// Add a mutation for creating user
// In this case, the createUser mutation is defined within the fields object.
const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: function () {
    return {
      createUser: {
        type: userType,
        args: {
          firstName: { type: GraphQLNonNull(GraphQLString) },
          lastName: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
          password: { type: GraphQLNonNull(GraphQLString) },
          address: { type: GraphQLNonNull(GraphQLString) },
          city: { type: GraphQLNonNull(GraphQLString) },
          province: { type: GraphQLNonNull(GraphQLString) },
          postalCode: { type: GraphQLNonNull(GraphQLString) },
          phone: { type: GraphQLNonNull(GraphQLString) },
          role: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: async function (root, params) {
          const userModel = new UserModel(params);
          const newUser = userModel.save();
          if (!newUser) {
            throw new Error('User Not Added!!');
          }
          return newUser;
        }
      },

      // a mutation to log in the user
      loginUser:
      {
        type: PayloadType,
        args: {
          email: {
            name: 'email',
            type: GraphQLString
          },
          password: {
            name: 'password',
            type: GraphQLString
          }
        },

        resolve: async function (root, params, context) {
          console.log('email:', params.email)
          // find the student with email if exists
          const userInfo = await UserModel.findOne({ email: params.email }).exec()
          console.log(userInfo)
          if (!userInfo) {
            throw new Error('Error - user not found')
          }
          else {
            console.log(userInfo.password)
            // check if the password is correct
            const isMatched = await bcrypt.compare(params.password, userInfo.password);
            console.log(isMatched + ": |" + params.password + "| vs |" + userInfo.password + "|")
            console.log(params.password == userInfo.password)
            console.log(params.password === userInfo.password)

            if (!isMatched) {
              throw new Error('Incorrect password')
            }
            else {
              // sign the given payload (arguments of sign method) into a JSON Web Token 
              // and which expires 300 seconds after issue
              const token = jwt.sign({ _id: userInfo._id, email: userInfo.email, role: userInfo.role }, JWT_SECRET,
                { algorithm: 'HS256', expiresIn: jwtExpirySeconds });
              console.log('registered token:', token)

              // set the cookie as the token string, with a similar max age as the token
              // here, the max age is in milliseconds
              context.res.cookie('token', token, { maxAge: jwtExpirySeconds * 1000, httpOnly: true });
              console.log('cookie set with:', userInfo.email)
              const payload = {
                _id: userInfo._id,
                email: userInfo.email,
                role: userInfo.role,
                token: token,
              }
              console.log(payload);
              return payload;
            }
          }
        } //end of resolver function
      },
      // a mutation to log the student out
      logOut: {
        type: GraphQLString,
        resolve: async (root, params, context) => {
          if (context.req.cookies.token !== undefined) {
            try {
              const payload = await GetPayloadFromCookies(context);
              // clear cookie
              ClearCookieToken(context);
              return payload.email;
            }
            catch (error) {
              throw new Error(error);
            }
          }
          else {
            return 'Already logged out'
          }
        }
      },
      //
      createVital: {
        type: vitalType,
        args: {
          bodyTemperature: { type: GraphQLNonNull(GraphQLString) },
          heartRate: { type: GraphQLNonNull(GraphQLString) },
          bloodPressure: { type: GraphQLNonNull(GraphQLString) },
          respiratoryRate: { type: GraphQLNonNull(GraphQLString) },
          pulseRate: { type: GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLNonNull(GraphQLString) },
          time: { type: GraphQLNonNull(GraphQLString) },
          patient: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const vitalModel = new VitalModel(params);
          const newVital = vitalModel.save();
          if (!newVital) {
            throw new Error('Error');
          }
          return newVital
        }
      },
      updateVital: {
        type: vitalType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          bodyTemperature: { type: GraphQLNonNull(GraphQLString) },
          heartRate: { type: GraphQLNonNull(GraphQLString) },
          bloodPressure: { type: GraphQLNonNull(GraphQLString) },
          respiratoryRate: { type: GraphQLNonNull(GraphQLString) },
          pulseRate: { type: GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLNonNull(GraphQLString) },
          time: { type: GraphQLNonNull(GraphQLString) },
          patient: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          try {
            const updateVital = VitalModel.findByIdAndUpdate(
              params.id, {
              bodyTemperature: params.bodyTemperature,
              heartRate: params.heartRate,
              bloodPressure: params.bloodPressure,
              respiratoryRate: params.respiratoryRate,
              pulseRate: params.pulseRate,
              date: params.date,
              time: params.time,
              patient: params.patient
            }, { new: true }).exec();
            if (!updateVital) {
              throw new Error('Error')
            }
            return updateVital;
          } catch (err) {
            console.log(err)
          }
        }
      },
      deleteVital: {
        type: vitalType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const deleteVital = VitalModel.findByIdAndRemove(params.id).exec();
          if (!deleteVital) {
            throw new Error('Error')
          }
          return deleteVital;
        }
      },
      createTip: {
        type: tipType,
        args: {
          title: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const tipsModel = new TipModel(params);
          const newTips = tipsModel.save();
          if (!newTips) {
            throw new Error('Error');
          }
          return newTips
        }
      },
      updateTip: {
        type: tipType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
          title: { type: GraphQLNonNull(GraphQLString) },
          description: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          try {
            const updateTips = TipModel.findByIdAndUpdate(
              params.id, {
              title: params.title,
              description: params.description,
            }, { new: true }).exec();
            if (!updateTips) {
              throw new Error('Error')
            }
            return updateTips;
          } catch (err) {
            console.log(err)
          }
        }
      },
      deleteTip: {
        type: tipType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const deleteTips = TipModel.findByIdAndRemove(params.id).exec();
          if (!deleteTips) {
            throw new Error('Error')
          }
          return deleteTips;
        }
      },
      createAlert: {
        type: alertType,
        args: {
          responderName: { type: GraphQLNonNull(GraphQLString) },
          email: { type: GraphQLNonNull(GraphQLString) },
          phoneNumber: { type: GraphQLNonNull(GraphQLString) },
          patientName: { type: GraphQLNonNull(GraphQLString) },
          address: { type: GraphQLNonNull(GraphQLString) },
          message: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const alertModel = new AlertModel(params);
          const newAlert = alertModel.save();
          if (!newAlert) {
            throw new Error('Error');
          }
          return newAlert
        }
      },
      deleteAlert: {
        type: alertType,
        args: {
          id: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: function (root, params, context) {
          const deleteAlert = AlertModel.findByIdAndRemove(params.id).exec();
          if (!deleteAlert) {
            throw new Error('Error')
          }
          return deleteAlert;
        }
      },
      createSymptom: {
        type: symptomsType,
        args: {
          selectedSymptom: { type: GraphQLList(GraphQLString) },
          patient: { type: GraphQLNonNull(GraphQLString) },
          date: { type: GraphQLNonNull(GraphQLString) },
          time: { type: GraphQLNonNull(GraphQLString) }
        },
        resolve: async function (root, { selectedSymptom, patient, date, time }) {
          try {
            const symptom = new SymptomModel({
              selectedSymptom,
              patient,
              date,
              time
            });
            const newSymptom = await symptom.save();
            return newSymptom;
          } catch (err) {
            console.log(err);
            throw new Error('Error creating new symptom');
          }
        }
      },
    }
  }
});
//
module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });