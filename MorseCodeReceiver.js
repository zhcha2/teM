/*
 * Morse Code receiver app information:
 *
 * Function: messageFinished(): stops the capturing process
 *
 *     You can call this function to let the app know that the
 *     end-of-transmission signal has been received.
 *
 * -------------------------------------------------------
 *
 * ID: messageField: id of the message text area
 *
 *     This will be a textarea element where you can display
 *     the recieved message for the user.
 *
 * -------------------------------------------------------
 *
 * ID: restartButton: id of the Restart button
 *
 *     This is a button element.  When clicked this should
 *     cause your app to reset its state and begin recieving
 *     a new message.
 *
 */


// ADD YOUR ADDITIONAL FUNCTIONS AND GLOBAL VARIABLES HERE
var demorse = "";
var morse = "";
var numOn = 0;
var numOff = 0;


// lookup table to de-morse
// contain alphabets, numbers, signs
var lookupTable = {
    "._" : "a",
    "_..." : "b",
    "_._." : "c",
    "_.." : "d",
    "." : "e",
    ".._." : "f",
    "__." : "g",
    "...." : "h",
    ".." : "i",
    ".___" : "j",
    "_._" : "k",
    "._.." : "l",
    "__" : "m",
    "_." : "n",
    "___" : "o",
    ".__." : "p",
    "__._" : "q",
    "._." : "r",
    "..." : "s",
    "_" : "t",
    ".._" : "u",
    "..._" : "v",
    ".__" : "w",
    "_.._" : "x",
    "_.__" : "y",
    "__.." : "z",
    "_____" : "0",
    ".____" : "1",
    "..___" : "2",
    "...__" : "3",
    "...._" : "4",
    "....." : "5",
    "_...." : "6",
    "__..." : "7",
    "___.." : "8",
    "____." : "9",
	".____." : "'",
    "_.__." : "(",
    "_.__._" : ")",
    "._.._." : "\"",
    "..._.._" : "$",
    "._____." : "\\",
    "_.._." : "/",
    "._._." : "+",
    "___..." : ":",
    "._._._" : ".",
    "__..__" : ",",
    "..__.." : "?",
    "_...._" : "-",
    ".__._." : "@",
    "_..._" : "=",
    "..__._" : "_",
    "_._.__" : "!",
    "._._" : "\n",
    "..._._" : ""  
  };

/*
 * This function is called once per unit of time with camera image data.
 *
 * Input : Image Data. An array of integers representing a sequence of pixels.
 *         Each pixel is representing by four consecutive integer values for
 *         the 'red', 'green', 'blue' and 'alpha' values.  See the assignment
 *         instructions for more details.
 * Output: You should return a boolean denoting whether or not the image is
 *         an 'on' (red) signal.
 */

function decodeCameraImage(data)
{
  // initialise values
  var numRed = 0;
  var numBlue = 0;
  var numGreen = 0;
  var result = true;

  for(var i = 0, n = data.length; i < n; i += 4)
  {
    // checking Red > Blue of one pixel
	// consider case of some pixels being green
	// comparing the count of colour( Red is on and Blue is off )
	  
    if(data[i] > data[i+2])
    {
      		numRed++;
    }
    else 
    {
      		numBlue++;
   	}
  }

  if(morse == "..._._")
  {
    messageFinished();
  }

     if(numRed > numBlue)
  	 {
    	numOn++;
	
	 if(morse === "" && demorse === "")
	 {
	  	numOff = 0;
	 }
		
     if(numOff ===1 || numOff ===2 )
     {
        // inter-element
        numOff = 0;  
     }
     else if(numOff <= 6 && numOff >= 3 )
     {
        // inter-character
       	demorse += lookupTable[morse]; // decoding the message by lookupTable
        morse = "";
		numOff = 0;
     }
     else if(numOff >= 7)
     {
        // inter-word
        demorse += lookupTable[morse];
        demorse += " ";
        morse = "";
		numOff = 0;
     }
    
    result = true; // the function returns boolean value based on colour
  }
  
  else
  {
     numOff++;
    	
	  if (numOn === 1 || numOn === 2)
      {
       	  // dot
          numOn = 0;
          morse += ".";
      }
      else if ( numOn >= 3 )
      {
          // dash
          numOn = 0;
          morse += "_";
      }
  
    result = false;
  }
	
// displaying the decoded message
  document.getElementById("messageField").innerHTML = demorse;

// the function returns boolean value based on colour
  return result;
  }

  // restartButton function to reset
  document.getElementById("restartButton").onclick = function()
  {
   demorse = "";
   morse = "";
   numOn = 0;
   numOff = 0;
   document.getElementById("messageField").innerHTML = "";
  }
 