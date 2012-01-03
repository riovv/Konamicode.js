# About Konamicode.js
This is an JavaScript implementation of the Konami code.
It's well suited for easter eggs or just about anything geeky.  
Being written without any external library dependencies makes it easily used on any website you want.  
[Watch the demo](http://i-are-rio.github.com/Konamicode.js/).

## What is the Konami code?
The Konami Code, known in Japan as the Konami Command (コナミコマンド Konami Komando), 
is a cheat code that appears in many Konami video games, although the code also appears in some non-Konami games.
The code was first used in the 1986 release of Gradius for the Nintendo Entertainment System 
but was popularized among North American players in the NES version of Contra, 
for which it was also dubbed both the "Contra Code" and "30 Lives Code". 
During the title screen before the game demo begins, 
the player could press the following sequence of buttons on the game controller: &uarr; &uarr; &darr; &darr; &larr; &rarr; &larr; &rarr; B A

## Getting Started
Get the code or [download .zip file](https://github.com/I-ARE-RIO/Konamicode.js/zipball/master).

    git clone git://github.com/I-ARE-RIO/Konamicode.js.git
Include the Konamicode.js script file on your page.

    <script type="text/javascript" src="Konamicode.js"></script>
Initialize the Konami code listener.

    Konamicode(function() {alert('success');}, // called when the Konami code has been completed successfully.
    {
        timelimit: 3000, // timelimit between key presses (defaults to 1000ms).
        correct: function() {console.log('correct');}, // called when a correct key is pressed.
        incorrect: function() {console.log('incorrect');}, // called when an incorrect key is pressed.
        timeout: function() {console.log('timed out');} // called when timelimit has been reached between key presses.
    });
**Thats it!**  
The first parameter is a callback function that gets fired when the code has been completed successfully.  
The second one is an optional Object containing timelimit setting and other callbacks for more advanced implementations.

## Removing the Konami code listener.
The Konami code initializer returns an Object which contains a method to remove the listener.

    var Konami = Konamicode(function() {alert('success')});
    Konami.remove(); // removes the Konami code event listener.
    
## Sites using this code.
None yet that I know of :) except the [project page](http://i-are-rio.github.com/Konamicode.js/) of course.  
If you have used this code I would be happy to hear from you and see your usage of the Konami code.