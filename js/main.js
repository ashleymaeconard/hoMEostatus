var app = angular.module("app", ["firebase"]);

$(window).load(function() {
  var HR_values = ['Heart Rate'];
  var Acc_values = ['Accelerometer'];
  var HR_timestamp = ['x'];

  var ref = new Firebase("https://hab16-projecta.firebaseio.com/");
  var hr_ref = new Firebase("https://hab16-projecta.firebaseio.com/HeartRateData");
  var motion_ref = new Firebase("https://hab16-projecta.firebaseio.com/MotionData"); 
  var uv_ref = new Firebase("https://hab16-projecta.firebaseio.com/UVData");
  var skin_ref = new Firebase("https://hab16-projecta.firebaseio.com/SkinTempData");
    
  hr_ref.on(
    "child_changed",
    function(child_snapshot, somethingelse) {
      hr_ref.limitToLast(50).on("value", function(snapshot) {
        drawHRGraph(snapshot)
        ////console.log(snapshot.key());
      });
      console.log("HI!")
      for(data in child_snapshot){
        hr_val = parseInt(propValue_HR["Heart Rate"])
        if (hr_val > 75 || hr_val < 60) {
          window.alert("ABNORMAL Heart Rate: " + hr_val);
          console.error("ERROR " + hr_val)
        }
      }
    })

  skin_ref.on(
    "child_changed",
    function(child_snapshot, somethingelse) {
      skin_ref.limitToLast(50).on("value", function(snapshot) {
        console.log("new child values")
        drawSkinTempGraph(snapshot)
       // console.log(snapshot.key());
      });
      
    })

  motion_ref.on(
    "child_changed",
    function(child_snapshot, somethingelse) {
      motion_ref.limitToLast(50).on("value", function(snapshot) {
       // drawMotionGraph(snapshot)
       //// console.log(snapshot.key());
      });
    })

  ref.on(
    "value", 
    function(snapshot) {
      var HR = snapshot.val().HeartRateData;
      ////console.log(HR)
      var Acc = snapshot.val().AccelerometerData;
      //Heart Rate
      console.log("new value from main")
      drawHRGraph(HR)
      drawSkinTempGraph(snapshot.val().SkinTempData)
      //drawMotionGraph(snapshot.val().MotionData)
    }, 
    function (errorObject) {
     // console.log("The read failed: " + errorObject.code);
    });

//  Update function after so many seconds 
//  Find a way to add points, not remake graph
//  Emulate:  http://jsbin.com/yitep/5/edit?html,js,output

});


function drawHRGraph(HR){
    var HR_timestamp = ['x'];
    var HR_values = ['Heart Rate'];

      for(var propName_HR in HR) {
        propValue_HR = HR[propName_HR]
        HR_values.push(parseInt(propValue_HR["Heart Rate"]))
        var parts = propValue_HR["TimeStamp"].split("_")
        HR_timestamp.push(new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]))
      }
      //Accelerometer
      // for(var propName_Acc in Acc) {
      //   propValue_Acc = Acc[propName_Acc]
      //   Acc_values.push(parseInt(propValue_Acc["AccX"]))
      // }
     // console.log(HR_values);
     // console.log(HR_timestamp)

      //Graph Accelerometer vs. Heart Rate
      var tempChart = c3.generate({
      bindto: '#heartChart',
      data: {
        x: 'x',
        columns: [
          HR_timestamp,
          HR_values,
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
                rotate: 75
          },
          height: 60
          // tick: {
          //   //format: '%Y-%m-%d'
          //   format: function(x) { 
          //     var parts = x.split("_")
          //    // console.log(parts); 
          //     return new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]);
          //   }
          // }
        }
      }
      });
}

function drawSkinTempGraph(SkinTemp){
    var SkinTemp_timestamp = ['x'];
    var SkinTemp_values = ['Skin Temperature'];

      for(var propName_ST in SkinTemp) {
        propValue_ST = SkinTemp[propName_ST]
        SkinTemp_values.push(parseInt(propValue_ST["SkinTemp"]))
        var parts = propValue_ST["TimeStamp"].split("_")
        SkinTemp_timestamp.push(new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]))
      }
      //Accelerometer
      // for(var propName_Acc in Acc) {
      //   propValue_Acc = Acc[propName_Acc]
      //   Acc_values.push(parseInt(propValue_Acc["AccX"]))
      // }
     // console.log(SkinTemp_timestamp);
     // console.log(SkinTemp_values)

      //Graph Accelerometer vs. Heart Rate
      var tempChart = c3.generate({
      bindto: '#skinTempChart',
      data: {
        x: 'x',
        columns: [
          SkinTemp_timestamp,
          SkinTemp_values,
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            rotate: 75
          },
          height: 60
          // tick: {
          //   //format: '%Y-%m-%d'
          //   format: function(x) { 
          //     var parts = x.split("_")
          //    // console.log(parts); 
          //     return new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]);
          //   }
          // }
        }
      }
      });
}


function drawMotionGraph(Motion){
    var Motion_timestamp = ['x'];
    var Motion_values = ['Motion Type'];

      for(var propName_M in Motion) {
        propValue_M = Motion[propName_M]
        var motion_value = propValue_M["Motion"]
        var motion_int_value = 1
        if (motion_value == "WALKING"){
            Motion_values.push(2)}
        else if (motion_value == "JOGGING"){
            Motion_values.push(3)}
        else if (motion_value == "RUNNING"){
            Motion_values.push(4)}
        else{
            Motion_values.push(1)}
        var parts = propValue_M["TimeStamp"].split("_")
        Motion_timestamp.push(new Date(parts[0], parts[1], parts[2], parts[3], parts[4], parts[5]))
      }
      //Accelerometer
      // for(var propName_Acc in Acc) {
      //   propValue_Acc = Acc[propName_Acc]
      //   Acc_values.push(parseInt(propValue_Acc["AccX"]))
      // }
     // console.log(Motion_timestamp);
     // console.log(Motion_values)

      //Graph Accelerometer vs. Heart Rate
      var tempChart = c3.generate({
      bindto: '#motionChart',
      data: {
        x: 'x',
        columns: [
          Motion_timestamp,
          Motion_values,
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
                rotate: 75
          },
          height: 60
        }
      }
      });
}