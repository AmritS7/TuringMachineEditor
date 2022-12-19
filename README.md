# Turing Machine Editor

## About
A webapp designed to help visualize how Turing Machines work. Created for academic use in high level education. Inspired by Dr. Ronald Fechter. You can directly view the website at: <br>
https://amrits7.github.io/TuringMachineEditor/ 

## Turing Machines - What are they?

Here are some fundamentals about Turing Machines:

<ol>
  <li>
    A Turing Machine (invented by Alan Turing in a paper published in 1936) is an abstract machine designed to express (i.e. DEFINE) the meaning—in general—of an algorithm for computing on numbers.
  </li>
  <li>
    Main components of a Turing Machine:
    <ul>
      <li>
        an infinite tape, divided into sections;
      </li>
      <li>
        a finite tape alphabet, s1, s2, ..., sn, consisting of symbols that can be printed on the sections of the tape;
      </li>
      <li>
        a tape head, that can move, right or left—one section at a time—along the tape, or else can print a symbol on the section currently being scanned (thereby erasing what was previously printed there);
      </li>
      <li>
        the Turing Machine is capable of a finite number of "internal states" which are symbolized: q1, q2, . . . , qn; by convention, q1 is always the "starting state";
      </li>
      <li>
        a "program" consists of a finite number of "quadruples" of any one of the following three forms:
       </li>
         <ul>
           <li>
             qi sj R qm means: when in state qi, reading sj, move Right one section, and go into state qm
           </li>
           <li>
             qi sj L qm means: when in state qi, reading sj, move Left one section, and go into state qm
           </li>
           <li>
            qi sj sk qm means: when in state qi, reading sj, print sk, and go into state qm (note: printing sk erases sj)
           </li>
         </ul>
         </ul>        
Note: in the above 3 types of quadruples,  qi  and  qm may be the same state (i.e.,  qi  may equal  qm) 
            
</li>
<li>
Conventions for input and output:
  <ul>
    <li>
       for this brief introduction, we will assume that the tape alphabet consists of just 'B' (stands for "blank") and '1' ; we will represent numbers by multiple strokes of 1 (on successive sections of the tape), so 1 = 1; 2 = 11; 3 = 111; 4 = 1111, etc. (this is referred to as a unary number system)
    </li>
    <li>
      Key Assumption: At any given time, all but a finite number of sections of the tape contain 'B'
    </li>
    <li>
      the inputs will be represented by a sequence of numbers (multiple strokes of 1) on the tape, each input separated by a single B (blank) from the next input;
    </li>
    <li>
      the machine will begin in state q1 with the tape head scanning a B (blank) immediately to the left of the first input;
    
    
example 1: the inputs are 2 and 3; the initial tape is:  B 1 1 B 1 1 1 B, with the tape head scanning the B on the left (all other sections of the tape are B);
    
example 2: the inputs are 3, 1, and 4; the initial tape is:  B 1 1 1 B 1 B 1 1 1 1 B, with the tape head scanning the B on the left (all other sections of the tape are B);
   
example 3: the (single) input is 5; the initial tape is B 1 1 1 1 1 B, with the tape head scanning the B on the left (all other sections of the tape are B).
    </li>
    <li>
      the output is a single string of 1's on the tape (no embedded blanks), with the tape head scanning the B immediately to the left of the output string (all other sections of the tape are B).
    </li>
    <li>
      in order to simplify the presentation, we will assume that all inputs are positive integers:  i.e., for each input xi, we assume that xi ≥ 1.
    </li>
   </ul>
 </li>
 <li>
  A TURING MACHINE HALTS WHEN THE TAPE HEAD IS SCANNING A SECTION OF TAPE, READING EITHER B OR 1, WHILE CURRENTLY IN STATE qi—BUT THERE IS NO QUADRUPLE BEGINNING EITHER WITH   'qi B'  OR  'qi 1' (respectively). In other words, if the machine is in state qi reading a B and there is no quadruple in the machine beginning qi B then it halts; and if the machine is in state qi reading a 1 and there is no quadruple in the machine beginning qi 1 then it halts.
</li>
<li>
Example: Write a Turing Machine (program) which computes the function f(x) = x + 1. The input will be a single string x, with x ≥ 1, and the output will be x + 1. The following simple program computes the function f:

  q1 B R q2

  q2 1 R q2

  q2 B 1 q3

  q3 1 L q3

Here, the tape head begins reading the B at the left end of the input string, it moves one square to the right, then it moves right as long as it reads a 1 (the second quadruple is executed repeatedly while 1's are being read), then when it reaches a B at the right end of the input it prints a 1 (thus adding 1 to the length of the input string), then it moves left as long as it reads 1's, until it reached the B at the left end–at which point the machine halts because there is no quadruple beginning with q3 B.
</li>
</ol>

## Documentation
<ul>
  <li>
    Entering input: <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_input.PNG" alt="drawing"/>
    <br>Simply click on the text box and type the input separated by commas. Only accepts numbers, otherwise will throw an error.<br> 
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_noInput.PNG" alt="drawing"/>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_invalidInput.PNG" alt="drawing"/>
   </li>
   <li>
    Entering Quadruples: 
    You can either individually click on the boxes individually, or if you enter a number in a previous box, you can press tab or enter to focus onto the next box. When you arrive at the last box for that quadruple you can press tab/enter again and a new line will be created, or press the large plus button underneath.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_newQuad.PNG" alt="drawing"/> <br>
    If you are focusing on the input box, you can press enter/tab and it will then move down to the first quadruple box. <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_inputEnter.PNG" alt="drawing"/> <br>
    To go to a previous box, click on it. Or if the next box is clear and you press backspace, it will delete the contents of the previous box.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_backspace.PNG" alt="drawing"/> <br>
    If you want to enter a quadruple at a specific place (ie between two quadruples), press the plus symbol, or to delete one, press the minus symbol next to that quadruple.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_addB_delete.PNG" alt="drawing"/> <br>
   </li>
   <li>
    Starting/Setting Up:
    To setup the tape, once you are done entering your inputs and the quadruples press the start button. The tape information and the tape will become visible. The pointer is always at your current position. At this point, you are unable to edit the quadruples or the input, as that may cause errors when running.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_startButtons.PNG" alt="drawing"/> <br>
    Example with input 2,4: <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_tape.PNG" alt="drawing"/> <br>
    If you press start without an input or with the wrong syntax, you will get an error as seen before<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_noInput.PNG" alt="drawing"/>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_invalidInput.PNG" alt="drawing"/> <br>
    Once you press start the buttons on the bottom left will change: <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_startedButtons.PNG" alt="drawing"/> <br>
    Edit cancels the current progress and allows you to make changes to the program once again. These buttons change back to the original buttons.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_startButtons.PNG" alt="drawing"/> <br>
    Step executes the next quadruple: <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_step.PNG" alt="drawing"/> <br>
    The tape info gets dynamically updated. The console also displays these steps along with the executed quadruple and a visual representation of the tape after execution.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_stepConsole.PNG" alt="drawing"/> <br>
    Once no more steps are available, execution stops and the console and result get updated:<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_completionExample.PNG" alt="drawing"/> <br>
    Run repeatedly executes step (without console outputs), until it is finished executing (no more quads available), or 14.5 seconds pass (as there may be an infinite loop). If there is not an infinite loop, you can simply press run again and it will continue for another 14.5 seconds. The number of executions in those 14.5 seconds largely depend on the device you are using.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_runIncomplete.PNG" alt="drawing"/> <br>
    To clear all quadruples and inputs press the clear button:<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_startButtons.PNG" alt="drawing"/><br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_cleared.PNG" alt="drawing"/> <br>
   </li>
   <li>
    Markers:<br>
    Add Marker allows you one click on the tape, where the color of that position is changed to red. Changes back to black/the text color if it is overridden <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_addMButton.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_addMarker.PNG" alt="drawing"/> <br>
    You can also add a marker to highlight a singular quadruple line. To do so, press the add marker button and then click inside a input box for that quadruple. <br> 
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_addMQuad.png" alt="drawing"/> <br>
    Delete Marker allows you one click on the tape, where the color of that position is changed to black/text color <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_delMButton.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_deleteMarker.PNG" alt="drawing"/> <br>
    You can also delete a marker/highlight on a singular quadruple line. To do so, press the delete marker button and then click inside a input box for that quadruple. <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_delMQuad.png" alt="drawing"/> <br>
    There is also an indicator telling you whether or not you are in add marker or delete marker mode <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_markerMode.PNG" alt="drawing"/> <br>
   </li>
   <li>
    Instruction Numbers: <br>
    Show instructions button toggles visible instruction numbers <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_showIButton.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_instructionToggle.PNG" alt="drawing"/> <br>
  </li>
  <li>
    Open: <br>
    The Open button opens a modal window where you can either upload a file, or copy and paste and if in the right format (as seen in the txt files provided by Dr. Fechter). You must press save to apply the changes.<br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_openModal.PNG" alt="drawing" style="height:500px;" /> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_openBrowser.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_openExample.PNG" alt="drawing"/> <br>
    If the file is not in the correct format, you will get an error <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_invalidFile.PNG" alt="drawing"/> <br>
   </li>
   <li>
    Save: <br>
    The save button allows you to download the quadruples in the discussed format <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_saveBrowser.PNG" alt="drawing" style="width:500px;"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_saveExample.PNG" alt="drawing"/> <br>
   </li>
   <li>
    About: <br>
    The about button opens a link to the github repository if you want to view the source code or read the documentation <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_aboutButton.PNG" alt="drawing"/> <br>
    Enter Second here... <br>
   </li>
   <li>
    Scrolling: <br>
    If there are many quadruples or a large tape, a scrollbar is automatically created <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_longTape.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_longQuads.PNG" alt="drawing" style="height:500px;"/> <br>
   </li>
   <li>
    Colors: <br>
    The slider on the top right allows you to change the colors of the page (between light and dark). The selection also gets saved between sessions <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_slider.PNG" alt="drawing"/>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_sliderDark.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_light.PNG" alt="drawing"/> <br>
    <img src="https://raw.githubusercontent.com/AmritS7/TuringMachineEditor/main/images/TME_dark.PNG" alt="drawing"/> <br>
   </li>
   <li>
    Page Loading: <br>
    The Turing Machine uses a localstorage to save your most recent quadruples. If you reload the page, it will autofill the quadruples from your last session. 
   </li>
  




    
    
