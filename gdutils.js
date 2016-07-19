/* gdutils.js - Great Divide Web Game Framework - 2016

The below functions are general utilities and won't neccessarily be used
by developers using Great Divide Framework.

For now they are global, and may remain global for this project.
So, we're prefixing with 'GD_'.
*/

// Assertion function.
var GD_assert = function GD_assert(testcase, message)
{
    if (testcase !== true)
    {
        throw ('Assertion Failed: ' + message);
        return false;
    }
    else
    {
        return true;
    }
};


