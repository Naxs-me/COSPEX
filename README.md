# *COSPEX* - Code Summarization via Program Execution

## What is *COSPEX*?
1. *COSPEX*, is an *Atom* IDE extension, that generates explanation for Python code snippets dynamically.
2. The current version takes source code snippet and test cases as input from developers.
3. Automated test case inputs can be added in the future to *COSPEX*.

## Features of *COSPEX*:
1. *COSPEX* dynamically extracts dynamic information such as inputs, outputs, comments (if present in the snippet) alongwith changes in variable values during runtime. 
2. Presents the dynamic information in the form of examples to the developers while also adding natural language phrases using pre-defined templates.
3. Provides interactive interface such as colapsible blocks, which when clicked upon, reveal lower level information of the particular function call. 
4. A sliding window interface for loops is also provided where each window represents an iteration of the loop.

## Uses of *COSPEX*:
Developers rely on code documentation to understand the functionality of the code snippet. However, manually creating and maintaining the documentation is effort-intensive and prone to errors. 

*COSPEX* aids developers to automatically generate explanation of the *Python* code snippets dynamically.

With the help of *COSPEX*, developers can summarize the code snippet at hand from the editor environment itself. 
*COSPEX* also presents information of the data-flow inside a method to the users.
## Working of *COSPEX*:
*COSPEX* is developed as a package for Atom using the following approach:

<img alt="approach" src="https://user-images.githubusercontent.com/35232831/99877164-24a16800-2c22-11eb-9012-5b70841c7216.jpeg">

1. The developer opens the code snippet in Atom and calls the functions which need to be tested using appropriate test cases before invoking the tool.     
2. The preprocessor combines a hook with input code and the test cases into a separate program which is then executed. The hook intercepts any events passed between any software components and uses callback functions to run different functions based upon its state.
3. The execution of the program is traced using the hook. The trace function takes 3 arguments- stack frame, event and arguments for the event. Stack frame maintains a record of all the data on the stack corresponding to a subprogram call and includes information about the return address, argument variables, and local variables. The value of event is detected by the hook and it can take 3 values- Line, Call and Return.
4. Each event represents a different state of the program and provides a set of information unique to that state. We propose to call it the dynamic information instance of the state. The events are defined as follows:
    1. Call: When a function is called, a call event is generated. The tool extracts the name of the function and the arguments provided to it using the arguments of the event and the caller of the function from the stack frame for the function call dynamic information instance.
    2. Line: Before a line of code is executed, a line event is generated. The tool monitors any change in local variables using the stack frame. Upon detection, the change is extracted and stored in code dynamic information instance corresponding to the line of code. The tool also extracts the line number and the corresponding code using the arguments of the line event.
    3. Return: When a function is returned, a return event is generated. The tool extracts the value returned by it and stores it in the return value dynamic information instance. 
5. This information is extracted for every line of code in the program and compiled into a dynamic information instance of the complete program.
6. The extracted dynamic information instance of the complete program is compiled into a dynamic summary. We have framed natural language sentences for instances such as function call, variable introduction and return event  to make the summary more readable. The dynamic summary is presented in the form of collapsible blocks, each of which represents a function. Each collapsible block, when expanded reveals further lower-level information inside the function call. Figure below explains the structure of the generated output for a part of the summary presented for a Quick Sort program. 


## Example generated for QuickSort program:
<figure>
<img width=500 alt="Explanation" src="https://user-images.githubusercontent.com/35232831/117125604-616bb080-adb7-11eb-9048-c006557ab804.png">
<figcaption>
Part of the generated output for Quick Sort program. [A] is the expanded view of the first collapsible block and hence includes lower level information as well. [B] is the sliding-window interface for loops. [C] represent the high level information for the first recursive call. [H] shows the value returned by the function shown in [A]. [D] shows the arrows using which we can navigate through iterations of the loop.[E] highlights the line number of the corresponding line of code. [F] contains the line of code. [G] highlights our natural language description for the change in variables due to [F]. [I] shows the name of the file.
</figcaption>
</figure>

## Important files in *COSPEX* Repository:
In the lib directory,   
"my-second-package.js" file contains all the source code related to activating and deactivating the package, extracting user's code, combining it into the hook and initiating summary generation.

In the lib directory,   
"injectCodepython.py" file includes the code related to tracing the execution of the input code snippet.

In the keymaps directory,   
"my-second-package.json" file contains the shortcut key to trigger the package.

## Steps to install *COSPEX*:
1. Download and install *Atom* on your local machine.
2. Download the repository on your local machine.  
3. Unzip the folder and extract the package to the package repository of *Atom*(Default for Windows: C:/Users/user_name>/.atom/packages/ )
4. Run "npm install" inside the package directory.
5. Open Atom or refresh Atom if it was already open.

## Steps to use *COSPEX*:
1. Open Atom or refresh Atom if it was already open.
2. Open the working code snippet that needs to be summarized.
3. Press ctrl-alt-q to generate the summary.
A window will open which contains the summary of the code.

## Walkthrough:
You can find the walkthrough of the tool <a href="https://youtu.be/GHNIE2D-YXQ">here</a>

## How to contribute to *COSPEX*:
We will be very happy to receive any kind of contributions. Incase of a bug or an enhancement idea or a feature improvement idea, please open an issue or a pull request. Incase of any queries or if you would like to give any suggestions, please feel free to contact Nakshatra Gupta (cs17b020@iittp.ac.in), Ashutosh Rajput (cs17b007@iittp.ac.in) or Sridhar Chimalakonda (ch@iittp.ac.in) of RISHA Lab, IIT Tirupati, India.
