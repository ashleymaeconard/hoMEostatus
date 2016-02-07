var app = angular.module("app", ["firebase"]);

$(window).load(function() {
  var HR_values = ['Heart Rate'];
  var Acc_values = ['Accelerometer'];

  var ref = new Firebase("https://hab16-projecty.firebaseio.com/");
    
    ref.on(
      "value", 
      function(snapshot) {
        var HR = snapshot.val().HeartRateData;
        var Acc = snapshot.val().AccelerometerData;
        //Heart Rate
        for(var propName_HR in HR) {
          propValue_HR = HR[propName_HR]
          HR_values.push(parseInt(propValue_HR["Heart Rate"]))
        }
        //Accelerometer
        for(var propName_Acc in Acc) {
          propValue_Acc = Acc[propName_Acc]
          Acc_values.push(parseInt(propValue_Acc["Accelerometer"]))
        }
        console.log(HR_values);
        console.log(Acc_values)

        //Graph Accelerometer vs. Heart Rate
        var tempChart = c3.generate({
        bindto: '#tempChart',
        data: {
          x: 'Accelerometer',
          columns: [
            Acc_values,
            HR_values,
          ]
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: {
              format: '%Y-%m-%d'
            }
          }
        }
        });
      }, 
      function (errorObject) {
        console.log("The read failed: " + errorObject.code);
      });

//  Update function after so many seconds 
//  Find a way to add points, not remake graph
//  Emulate:  http://jsbin.com/yitep/5/edit?html,js,output

});

