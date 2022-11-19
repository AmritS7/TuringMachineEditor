let qCounter = 1;
var currentTape = [];
var currentPointer = [];
var currentPointerPosition = 0;
var currentArray = [];
var map = new Map();
var hasRedundant = false;
var recentKeyStrokes = [];
var counter=0;
var currentStep=1;
var executionNumber=1;
var tempMap = new Map();
var instrucVisible = "hidden";
var highlightCounter = 0;
var deleteCounter = 0;

document.querySelector("meta[name=viewport]").setAttribute("content", "width=device-width, initial-scale="+(1/window.devicePixelRatio));

document.addEventListener('DOMContentLoaded', function() {

  colorSwitch.addEventListener('change', colorChange);


  input.addEventListener('keydown', saveInput);


  newQuad.addEventListener("click", addQuadruple);


  userEntry.addEventListener("keydown", readEntry);

  userEntry.addEventListener("focusout", checkSource);


  userEntry.addEventListener("click", registerButton);


  start.addEventListener("click", setupTape);


  clear.addEventListener("click", clearAll);

  showInstructions.addEventListener("click", showIns);

  addMarker.addEventListener("click", setHeighlightCounter);

  delMarker.addEventListener("click", setDeleteCounter);

});



    function checkEntryp2(input){
          var regex =  /[^1 || B]/gi;
          input.value = input.value.replace(regex, "");
      }
    function checkEntryp3(input){
            var regex =  /[^1 || B || L || R]/gi;
            input.value = input.value.replace(regex, "");
    }


   function addQuadruple(e) {

     qCounter+=1;
     document.getElementById('toInsert').innerHTML += `<div class = "row">
        <div class = "col-1" style="max-width:11%;flex-basis:11;%">
          <p class = "instrucNumber" style=visibility:${instrucVisible};">${qCounter}</p>
        </div>
        <div class = "col-2">
          <input type= "number" class = "p1" data-action="answer" data-answer="${qCounter-1}""/> <p>,<p>
        </div>
        <div class = "col-2">
          <input type= "text" class = "p2" data-action="answer" data-answer="${qCounter-1}" maxlength="1" onkeyup="checkEntryp2(this)"/> <p>,<p>
        </div>
        <div class = "col-2">
          <input type= "text" class = "p3" data-action="answer" data-answer="${qCounter-1}" maxlength="1" onkeyup="checkEntryp3(this)"/> <p>,<p>
        </div>
        <div class = "col-2">
          <input type= "number" class = "p4" data-action="answer" data-answer="${qCounter-1}""/>
        </div>
        <div class = "col-2">
        <div class="btn-group" id="entryButtons">
          <button type="button" class="addBetween" data-action="answer" data-answer="${qCounter-1} class="btn">&#43;</button>
          <button type="button" class="delete" data-action="answer" data-answer="${qCounter-1} class="btn"> &#0215;</button>
       </div>
        </div>
      </div>`;

      for(i=0; i <currentArray.length; i++){
        var instruction = currentArray[i].InstructionNumber;
        document.getElementsByClassName("p1")[instruction].value = currentArray[i].Position1;
        document.getElementsByClassName("p2")[instruction].value = currentArray[i].Position2;
        document.getElementsByClassName("p3")[instruction].value = currentArray[i].Position3;
        document.getElementsByClassName("p4")[instruction].value = currentArray[i].Position4;
      }
   }



    function setupTape() {
      currentTape = [];
      currentPointer = [];
      currentStep = 1;
      currentPointerPosition = 0;
      executionNumber = 1;
      var allNumbers = true;
      var inputList = document.querySelector("#input").value.split(',');
      for(i=0; i<inputList.length; i++){
        if(! (/^\d+$/.test(inputList[i]))){
          allNumbers=false;
          currentTape = [];
          currentPointer = [];
        }
      else {
          tapeOutput = {
            text: "B",
            color: "regular"
          }
          currentTape.push(tapeOutput);
          while(inputList[i]>0){
            tapeOutput = {
              text: "1",
              color: "regular"
            }
            currentTape.push(tapeOutput);
            inputList[i] -= 1;
          }
          if(i==inputList.length-1){
            tapeOutput = {
              text: "B",
              color: "regular"
            }
            currentTape.push(tapeOutput);
          }
        }
      }

      if(!allNumbers){
        alert("All inputs must be numbers seperated by a comma")
      }
      else{
        currentPointer.push('p');
        updateTapeAndPointer();

        document.querySelector('#buttonBar').innerHTML = `<div class="btn-group">
          <button type="button" id="edit" class="btn">Edit</button>
          <button type="button" id="step" class="btn">Step</button>
          <button type="button" id="run" class="btn">Run</button>
       </div>`;

      document.getElementById("step").addEventListener("click", doStep);
      document.getElementById("run").addEventListener("click", doRun);
      document.getElementById("edit").addEventListener("click", enableEdit);

       disableEdit();

      document.getElementById('cout').innerHTML += "<p>Setting up Tape...<p>";
      document.getElementById('pQuad').innerHTML = "Not executed";
      document.getElementById('cState').innerHTML = `Q1: B`;
      document.getElementById("cout").innerHTML += `<p>Execution: #0 <br> Not Executed <br> ${currentArrayForOutput(currentTape, currentPointerPosition)}`
      try{
      if(currentArray[0].Position2.toUpperCase()=="B"){
      document.getElementById("nQuad").innerHTML = `Q${currentStep}, ${currentArray[0].Position2.toUpperCase()}, ${currentArray[0].Position3.toUpperCase()}, Q${currentArray[0].Position4}`;
      }
      else {
        document.getElementById("nQuad").innerHTML = "None Available";
      }
      }
      catch(e){
        document.getElementById("nQuad").innerHTML = "None Available";
      }
    }

    }

    function disableEdit(){
      document.getElementById('input').disabled = true;
      document.getElementById('toInsert').disabled = true;
      document.getElementById('newQuad').disabled = true;
      document.getElementById('open').disabled = true;
      document.getElementById('addMarker').disabled = false;
      document.getElementById('delMarker').disabled = false;

      for(i = 0; i < document.querySelectorAll('.p1').length; i++){
        if( document.getElementsByClassName('p1')[i]!=null){
         document.getElementsByClassName('p1')[i].disabled = true;
         document.getElementsByClassName('p2')[i].disabled = true;
         document.getElementsByClassName('p3')[i].disabled = true;
         document.getElementsByClassName('p4')[i].disabled = true;
         document.getElementsByClassName('addBetween')[i].disabled = true;
         document.getElementsByClassName('delete')[i].disabled = true;
       }
      }
    }
    function enableEdit(){
        document.getElementById("pQuad").innerHTML = "";
        document.getElementById("cState").innerHTML = "";
        document.getElementById("nQuad").innerHTML = "";
        document.getElementById("cout").innerHTML = "";
        document.getElementById("result").innerHTML = "";


        document.querySelector('#buttonBar').innerHTML = `<div class="btn-group">
          <button type="button" id="clear" class="btn">Clear</button>
          <button type="button" id="start" class="btn">Start</button>
       </div>`;

       document.getElementById('input').disabled = false;
       document.getElementById('toInsert').disabled = false;
       document.getElementById('newQuad').disabled = false;
       document.getElementById('open').disabled = false;
       document.getElementById('addMarker').disabled = true;
       document.getElementById('delMarker').disabled = true;

       for(i = 0; i < document.querySelectorAll('.p1').length; i++){
         if( document.getElementsByClassName('p1')[i]!=null){
          document.getElementsByClassName('p1')[i].disabled = false;
          document.getElementsByClassName('p2')[i].disabled = false;
          document.getElementsByClassName('p3')[i].disabled = false;
          document.getElementsByClassName('p4')[i].disabled = false;
          document.getElementsByClassName('addBetween')[i].disabled = false;
          document.getElementsByClassName('delete')[i].disabled = false;
       }
     }

       document.querySelector("#pointer").innerHTML="";
       document.querySelector("#tape").innerHTML="";
       start.addEventListener("click", setupTape);
       clear.addEventListener("click", clearAll);
    }

    function colorChange(){
      if (this.checked) {
        var r = document.querySelector(':root');
        r.style.setProperty('--primaryColor', '#333');
        r.style.setProperty('--secondaryColor', '#292929');
        r.style.setProperty('--accentColor', 'Aquamarine');
        r.style.setProperty('--textColor', 'White');
        r.style.setProperty('--btnColor', 'black');
        }
       else {
          var r = document.querySelector(':root');
           r.style.setProperty('--primaryColor', 'white');
           r.style.setProperty('--secondaryColor', 'WhiteSmoke');
           r.style.setProperty('--accentColor', '#333');
           r.style.setProperty('--textColor', 'black');
           r.style.setProperty('--btnColor', 'white');
        }
      };

      function readEntry(e){
        if(e.target.classList.contains('p1')){
          recentKeyStrokes[counter] = event.keyCode;
          counter++;
          if(counter>=2){
            counter = 0;
          }
           if(event.keyCode==13 || event.keyCode==9){
               e.preventDefault();
               document.getElementsByClassName("p2")[e.target.dataset.answer].focus();
               }
          else if(recentKeyStrokes[0]==8 && recentKeyStrokes[1]==8 && document.getElementsByClassName("p1")[e.target.dataset.answer].value==""){
            if(e.target.dataset.answer==0){
              document.getElementById("input").focus();
            }
            else{
              document.getElementsByClassName("p4")[e.target.dataset.answer-1].focus();
              }
            }
          }


        else if(e.target.classList.contains('p2')){
          recentKeyStrokes[counter] = event.keyCode;
          counter++;
          if(counter>=2){
            counter = 0;
          }
           if(event.keyCode==13 || event.keyCode==9){
             e.preventDefault();
               document.getElementsByClassName("p3")[e.target.dataset.answer].focus();
               }
         else if(recentKeyStrokes[0]==8 && recentKeyStrokes[1]==8 && document.getElementsByClassName("p2")[e.target.dataset.answer].value==""){
             document.getElementsByClassName("p1")[e.target.dataset.answer].focus();
             }
           }

        else if(e.target.classList.contains('p3')){
          recentKeyStrokes[counter] = event.keyCode;
          counter++;
          if(counter>=2){
            counter = 0;
          }
           if(event.keyCode==13 || event.keyCode==9){
              e.preventDefault();
             document.getElementsByClassName("p4")[e.target.dataset.answer].focus();
             }
         else if(recentKeyStrokes[0]==8 && recentKeyStrokes[1]==8 && document.getElementsByClassName("p3")[e.target.dataset.answer].value==""){
             document.getElementsByClassName("p2")[e.target.dataset.answer].focus();
             }
           }


        else if(e.target.classList.contains('p4')){
          recentKeyStrokes[counter] = event.keyCode;
          counter++;
          if(counter>=2){
            counter = 0;
          }
           if((event.keyCode==13 || event.keyCode==9) && ((qCounter-1)==parseInt(e.target.dataset.answer))){
              e.preventDefault();
              saveEntry(e);
              if(hasRedundant==false){
              addQuadruple(e);
              document.getElementsByClassName("p1")[parseInt(e.target.dataset.answer)+1].focus();
              }
              else{
                e.preventDefault();
                hasRedundant = false;
              }
            }
          else if(event.keyCode==13||event.keyCode==9){
            e.preventDefault();

            saveEntry(e);

            document.getElementsByClassName("p1")[parseInt(e.target.dataset.answer)+1].focus();
            }
        else if(recentKeyStrokes[0]==8 && recentKeyStrokes[1]==8 && document.getElementsByClassName("p4")[e.target.dataset.answer].value==""){
            document.getElementsByClassName("p3")[e.target.dataset.answer].focus();
            }
          }

  };

  function checkSource(e){
      if (e.target.classList.contains('p1') || e.target.classList.contains('p2') || e.target.classList.contains('p3') ){
        saveEntry(e);
      }
      else if(e.target.classList.contains('p4')){
        if(recentKeyStrokes[counter-1]!= 13 && recentKeyStrokes[counter-1]!=9){
          saveEntry(e);
        }
      }
  }

  function saveEntry(e){
    try{
    if((document.getElementsByClassName("p1")[e.target.dataset.answer].value !="") && (document.getElementsByClassName("p2")[e.target.dataset.answer].value !="") && (document.getElementsByClassName("p3")[e.target.dataset.answer].value !="") && (document.getElementsByClassName("p4")[e.target.dataset.answer].value !="")){
      recentKeyStrokes = [];
      var arrayCheck = checkArray(e);
      if(arrayCheck){
        updateArray(e);
      }
      else {
        addToArray(e);
       }
      }
    }
    catch(error){};
  }


  function checkArray(e){
    let containsInstructionNumber = currentArray.some(currQuad=> currQuad['InstructionNumber'] === e.target.dataset.answer);
    return containsInstructionNumber;
  }

  function updateArray(e){
    instrucNumberToUpdate = e.target.dataset.answer;
    var toEdit = e.target.className;
    var updatedValue = document.getElementsByClassName(toEdit)[e.target.dataset.answer].value;

    if(toEdit=="p1" || toEdit=="p2"){
      if(map.has(instrucNumberToUpdate)){
        var inputPair = String(document.getElementsByClassName("p1")[e.target.dataset.answer].value) + "_" + String(document.getElementsByClassName("p2")[e.target.dataset.answer].value);
        map.set(e.target.dataset.answer, inputPair);
      }
    }

    for(i=0; i<currentArray.length; i++){
      if(currentArray[i].InstructionNumber == instrucNumberToUpdate){
        if(toEdit == "p1"){
          currentArray[i].Position1 = updatedValue;
        }
        else if(toEdit == "p2"){
          currentArray[i].Position2 = updatedValue;
        }
        else if(toEdit == "p3"){
          currentArray[i].Position3 = updatedValue;
        }
        else if(toEdit == "p4"){
          currentArray[i].Position4 = updatedValue;
        }

      }
    }

  }

  function addToArray(e){
    try{

  if((document.getElementsByClassName("p1")[e.target.dataset.answer].value !="") && (document.getElementsByClassName("p2")[e.target.dataset.answer].value !="") && (document.getElementsByClassName("p3")[e.target.dataset.answer].value !="") && (document.getElementsByClassName("p4")[e.target.dataset.answer].value !="")){

    var currQuad = {
      InstructionNumber: e.target.dataset.answer,
      Position1: document.getElementsByClassName("p1")[e.target.dataset.answer].value,
      Position2: document.getElementsByClassName("p2")[e.target.dataset.answer].value,
      Position3: document.getElementsByClassName("p3")[e.target.dataset.answer].value,
      Position4: document.getElementsByClassName("p4")[e.target.dataset.answer].value,
    }


    var inputPair = String(document.getElementsByClassName("p1")[e.target.dataset.answer].value) + "_" + String(document.getElementsByClassName("p2")[e.target.dataset.answer].value);

    const values = [...map.values()];
    if(values.includes(inputPair)){
      alert("Redundant Quadruple!")
      hasRedundant = true;
    }
    else{
      map.set(e.target.dataset.answer, inputPair);
      currentArray.push(currQuad);
    }
  }

}
  catch(error){}
}

  function saveInput(e){
          if ((event.keyCode == 13) || (event.keyCode == 9)) {
            e.preventDefault();
              document.getElementsByClassName("p1")[0].focus();
              }

        }

    //
    //Clears all values and arrays
    //
    function clearAll(){
      document.getElementById('input').value='';
      document.getElementById('toInsert').innerHTML='';
      document.getElementsByClassName('p1')[0].value='';
      document.getElementsByClassName('p2')[0].value='';
      document.getElementsByClassName('p3')[0].value='';
      document.getElementsByClassName('p4')[0].value='';

      qCounter = 1;
      currentTape = [];
      currentPointer = [];
      currentPointerPosition = 0;
      currentArray = [];
      map = new Map();
      hasRedundant = false;
      recentKeyStrokes = [];
      counter=0;
      currentStep=1;
      executionNumber=1;
      tempMap = new Map();

    }



    function doStep(){
      console.log(currentArray);
      var addedOnRight = false;
      var addedOnLeft = false;
      for(i = 0; i<currentArray.length; i++){
        if(currentArray[i].Position1==currentStep){
          if(currentArray[i].Position2.toUpperCase()==currentTape[currentPointerPosition].text){
              //if right move pointer right
              if (currentArray[i].Position3=="r"){
                currentPointer.unshift("");
                if(currentPointerPosition==currentTape.length-1){
                  tapeOutput = {
                    text: "B",
                    color: "regular"
                  }
                  currentTape.push(tapeOutput);
                  addedOnRight = true;
                }
                currentPointerPosition++;
              }
              else if (currentArray[i].Position3=="l"){
                if(currentPointerPosition!=0){
                currentPointer.splice(0, 1);
                currentPointerPosition--;
                }
                else{
                  tapeOutput = {
                    text: "B",
                    color: "regular"
                  }
                  currentTape.unshift(tapeOutput);
                  addedOnLeft = true;
                }
              }
              else if (currentArray[i].Position3=="1"){
                tapeOutput = {
                  text: "1",
                  color: "regular"
                }
                currentTape[currentPointerPosition] = tapeOutput;
                if(currentPointerPosition==0){
                    currentPointer.unshift("");
                    tapeOutput = {
                      text: "B",
                      color: "regular"
                    }
                    currentTape.unshift(tapeOutput);
                    addedOnLeft = true;
                }
                else if(currentPointerPosition==currentTape.length-1){
                  tapeOutput = {
                    text: "B",
                    color: "regular"
                  }
                  currentTape.push(tapeOutput);
                    addedOnRight = true;
                }
              }
              else if(currentArray[i].Position3=="b"){
                tapeOutput = {
                  text: "B",
                  color: "regular"
                }
                currentTape[currentPointerPosition] = tapeOutput;
              }

              document.getElementById("pQuad").innerHTML = `Q${currentStep}, ${currentArray[i].Position2.toUpperCase()}, ${currentArray[i].Position3.toUpperCase()}, Q${currentArray[i].Position4}`;
              cP4 = currentArray[i].Position4;
              document.getElementById("cout").innerHTML += `<p>Execution: #${executionNumber} <br> Q${currentStep}, ${currentArray[i].Position2.toUpperCase()}, ${currentArray[i].Position3.toUpperCase()}, Q${cP4} <br> ${currentArrayForOutput(currentTape, currentPointerPosition)}`
              cout.scrollTop = cout.scrollHeight;
              executionNumber++;
              currentStep = cP4;
              document.getElementById("cState").innerHTML = `Q${currentStep}: ${currentTape[currentPointerPosition].text}`
              document.getElementById("nQuad").innerHTML = peek(currentStep);

              updateTapeAndPointer();
              if(addedOnRight==true){
              document.getElementById('pointerAndTape').scrollLeft = pointerAndTape.scrollWidth;
              }
              else if(addedOnLeft==true){
                document.getElementById('pointerAndTape').scrollLeft = 0;
              }
              return true;
          }
        }
      }
    }

    function doRun(){
      var nextStepExists = false;
      var startTime = Date.now();

       do{
       nextStepExists = doStep();
        }
        while (nextStepExists==true && (Date.now()-startTime)<5000);

  }


    function updateTapeAndPointer(){
      var currPointerOut = "";
      var currTapeOut = "";
      for(i=0; i<currentTape.length; i++){
        if(currentPointer[i]=='p'){
          currPointerOut +=	`<div class="inPointer" style="color:var(--accentColor)"> &#9660 </div>`;
        }
        else{
          currPointerOut +=	`<div class="inPointer"></div>`
        }
        if(i==0){
          if(currentTape[i].color == "red"){
          currTapeOut += `<div class="inTape" style="border-top-left-radius:20px; border-bottom-left-radius:20px;"><h3 style="color:red" data-action="answer" data-answer=${i}>${currentTape[i].text}<h3></div>`;
          }
          else {
            currTapeOut += `<div class="inTape" style="border-top-left-radius:20px; border-bottom-left-radius:20px;"><h3 style="color:var(--textColor)" data-action="answer" data-answer=${i}>${currentTape[i].text}<h3></div>`;
          }
        }
        else if(i==currentTape.length-1){
          if(currentTape[i].color == "red"){
          currTapeOut += `<div class="inTape" style="border-top-right-radius:20px; border-bottom-right-radius:20px;"><h3 style="color:red" data-action="answer" data-answer=${i}>${currentTape[i].text}<h3></div>`;
          }
          else{
            currTapeOut += `<div class="inTape" style="border-top-right-radius:20px; border-bottom-right-radius:20px;"><h3 style="color:var(--textColor)" data-action="answer" data-answer=${i}>${currentTape[i].text}<h3></div>`;
          }
        }
        else if (currentTape[i].color == "red"){
          currTapeOut += `<div class="inTape"><h3 style="color:red" data-action="answer" data-answer=${i}>${currentTape[i].text}<h3></div>`
        }
        else currTapeOut += `<div class="inTape"><h3 style="color:var(--textColor)" data-action="answer" data-answer=${i}>${currentTape[i].text}<h3></div>`;
      }

      document.querySelector("#pointer").innerHTML=currPointerOut;
      document.querySelector("#tape").innerHTML=currTapeOut;
    }

    function peek(cStep){
      for(i = 0; i<currentArray.length; i++){
        if(currentArray[i].Position1==cStep){
          if(currentArray[i].Position2.toUpperCase()==currentTape[currentPointerPosition].text){
            return (`Q${cStep}, ${currentArray[i].Position2.toUpperCase()}, ${currentArray[i].Position3.toUpperCase()}, Q${currentArray[i].Position4}`);
          }
    }
  }
  var finalResult = 0;
  for(i = 0; i<currentTape.length; i++){
    if(currentTape[i].text=="1"){
      finalResult++;
    }
  }
  document.getElementById("result").innerHTML = finalResult;
  document.getElementById("cout").innerHTML += `<p>No more quadruples available <br> Ended with result: ${finalResult}`;
  document.getElementById('cout').scrollTop = cout.scrollHeight;
  return("None Available")
}


function currentArrayForOutput(cTape, cPPos){
  var toReturn = "";
  for(i = 0; i<cTape.length; i++){
    if(i == cPPos){
      toReturn += "||" + cTape[i].text + "||";
    }
    else{
      toReturn += cTape[i].text;
    }
  }
  return toReturn;

}

function registerButton(e){
  if(e.target.classList.contains('addBetween')){
    addB(e);
  }
  else if(e.target.classList.contains('delete')){
    del(e);
  }
}
function addB(e){

  tempMap = new Map();
  var qC = parseInt(e.target.dataset.answer);

    qCounter+=1;
    document.getElementById('toInsert').innerHTML += `<div class = "row">
       <div class = "col-1" style="max-width:11%;flex-basis:11;%">
         <p class = "instrucNumber" style="visibility:${instrucVisible};">${qCounter}</p>
       </div>
       <div class = "col-2">
         <input type= "number" class = "p1" data-action="answer" data-answer="${qCounter-1}""/> <p>,<p>
       </div>
       <div class = "col-2">
         <input type= "text" class = "p2" data-action="answer" data-answer="${qCounter-1}" maxlength="1" onkeyup="checkEntryp2(this)"/> <p>,<p>
       </div>
       <div class = "col-2">
         <input type= "text" class = "p3" data-action="answer" data-answer="${qCounter-1}" maxlength="1" onkeyup="checkEntryp3(this)"/> <p>,<p>
       </div>
       <div class = "col-2">
         <input type= "number" class = "p4" data-action="answer" data-answer="${qCounter-1}""/>
       </div>
       <div class = "col-2">
       <div class="btn-group" id="entryButtons">
         <button type="button" class="addBetween" data-action="answer" data-answer="${qCounter-1} class="btn">&#43;</button>
         <button type="button" class="delete" data-action="answer" data-answer="${qCounter-1} class="btn"> &#0215;</button>
      </div>
       </div>
     </div>`;



  for(i=0; i <qC; i++){
  document.getElementsByClassName('p1')[i].value='';
  document.getElementsByClassName('p2')[i].value='';
  document.getElementsByClassName('p3')[i].value='';
  document.getElementsByClassName('p4')[i].value='';
  }

  for(i=0; i <currentArray.length; i++){
    if(i<=qC){
      document.getElementsByClassName("p1")[i].value = currentArray[i].Position1;
      document.getElementsByClassName("p2")[i].value = currentArray[i].Position2;
      document.getElementsByClassName("p3")[i].value = currentArray[i].Position3;
      document.getElementsByClassName("p4")[i].value = currentArray[i].Position4;
    }
    else{
    currentArray[i].InstructionNumber = String(parseInt(currentArray[i].InstructionNumber)+1);
    var instruction = currentArray[i].InstructionNumber;

    document.getElementsByClassName("p1")[instruction].value = currentArray[i].Position1;
    document.getElementsByClassName("p2")[instruction].value = currentArray[i].Position2;
    document.getElementsByClassName("p3")[instruction].value = currentArray[i].Position3;
    document.getElementsByClassName("p4")[instruction].value = currentArray[i].Position4;
  }
  }

  for(i=0;i<map.size;i++){
    if(i<=qC){
      tempMap.set(String(i), map.get(String(i)));
    }
    else {
      tempMap.set(String(i+1), map.get(String(i)));
    }
  }
    map = tempMap;

  }

function del(e){
  tempMap = new Map();
  var qC = parseInt(e.target.dataset.answer);
  currentArray.splice(qC, 1)
  var prevQCounter = qCounter;
  qCounter = 1;
  document.getElementById('toInsert').innerHTML = '';




    for(i = 0; i<currentArray.length; i++){
      if(i>=qC){
        currentArray[i].InstructionNumber = String(parseInt(currentArray[i].InstructionNumber)-1);
      }
       qCounter++;
    document.getElementById('toInsert').innerHTML += `<div class = "row">
       <div class = "col-1" style="max-width:11%;flex-basis:11;%">
         <p class = "instrucNumber" style="visibility:${instrucVisible};">${qCounter}</p>
       </div>
       <div class = "col-2">
         <input type= "number" class = "p1" data-action="answer" data-answer="${qCounter-1}""/> <p>,<p>
       </div>
       <div class = "col-2">
         <input type= "text" class = "p2" data-action="answer" data-answer="${qCounter-1}" maxlength="1" onkeyup="checkEntryp2(this)"/> <p>,<p>
       </div>
       <div class = "col-2">
         <input type= "text" class = "p3" data-action="answer" data-answer="${qCounter-1}" maxlength="1" onkeyup="checkEntryp3(this)"/> <p>,<p>
       </div>
       <div class = "col-2">
         <input type= "number" class = "p4" data-action="answer" data-answer="${qCounter-1}""/>
       </div>
       <div class = "col-2">
       <div class="btn-group" id="entryButtons">
         <button type="button" class="addBetween" data-action="answer" data-answer="${qCounter-1} class="btn">&#43;</button>
         <button type="button" class="delete" data-action="answer" data-answer="${qCounter-1} class="btn"> &#0215;</button>
      </div>
       </div>
     </div>`;
     document.getElementsByClassName("p1")[i].value = currentArray[i].Position1;
     document.getElementsByClassName("p2")[i].value = currentArray[i].Position2;
     document.getElementsByClassName("p3")[i].value = currentArray[i].Position3;
     document.getElementsByClassName("p4")[i].value = currentArray[i].Position4;
   }



  for(i=0;i<map.size;i++){
    if(i<=qC){
      tempMap.set(String(i), map.get(String(i)));
    }
    else {
      tempMap.set(String(i-1), map.get(String(i)));
    }
  }
    map = tempMap;

}


function showIns(){

  if(instrucVisible=="hidden"){
    for (let el of document.querySelectorAll('.instrucNumber')) el.style.visibility = 'visible';
    instrucVisible = "visible";
  }
  else{
    for (let el of document.querySelectorAll('.instrucNumber')) el.style.visibility = 'hidden';
    instrucVisible = "hidden";
  }
}


function highlight(e){


  if(highlightCounter==1){
    if(e.target.classList.contains("inTape")){
      var toModify = e.target.children[0].dataset.answer;
      currentTape[toModify].color = "red";
      e.target.children[0].style.color="red";
      highlightCounter=0;
      document.getElementById("markerIndicator").style.visibility = "hidden";
      document.removeEventListener("click", highlight);
    }
    else if(e.target.innerHTML == "B"||"1"){
      try{
      var toModify = e.target.dataset.answer;
      currentTape[toModify].color = "red";
      e.target.style.color="red";
      highlightCounter=0;
      document.getElementById("markerIndicator").style.visibility = "hidden";
      document.removeEventListener("click", highlight);
    }
    catch(e){
      document.getElementById("markerIndicator").style.visibility = "hidden";
      document.removeEventListener("click", highlight);
    }
    }
  }
  else{
    highlightCounter=highlightCounter-1;
    if(highlightCounter==0){
    document.getElementById("markerIndicator").style.visibility = "hidden";
    document.removeEventListener("click", highlight);
    }
  }
}

function setHeighlightCounter(e){
  highlightCounter = 2;
  document.getElementById("markerIndicator").style.visibility = "visible";
  document.getElementById("markerIndicator").style.color = "green";
  document.addEventListener("click", highlight);
}

function setDeleteCounter(e){
  deleteCounter = 2;
  document.getElementById("markerIndicator").style.visibility = "visible";
  document.getElementById("markerIndicator").style.color = "red";
  document.addEventListener("click", deleteHighlight);
}

function deleteHighlight(e){
  if(deleteCounter==1){
    if(e.target.classList.contains("inTape")){
      var toModify = e.target.children[0].dataset.answer;
      currentTape[toModify].color = "regular";
      e.target.children[0].style.color="var(--textColor)";
      deleteCounter=0;
      document.getElementById("markerIndicator").style.visibility = "hidden";
      document.removeEventListener("click", deleteHighlight);
    }
    else if(e.target.innerHTML == "B"||"1"){
      try{
      var toModify = e.target.dataset.answer;
      currentTape[toModify].color = "regular";
      e.target.style.color = "var(--textColor)";
      deleteCounter=0;
      document.getElementById("markerIndicator").style.visibility = "hidden";
      document.removeEventListener("click", deleteHighlight);
      }
      catch(e){
        document.getElementById("markerIndicator").style.visibility = "hidden";
        document.removeEventListener("click", deleteHighlight);
      }

    }
  }
  else{
    deleteCounter=deleteCounter-1;
    if(deleteCounter==0){
      console.log("hide")
    document.getElementById("markerIndicator").style.visibility = "hidden";
    document.removeEventListener("click", deleteHighlight);
    }
  }
}
