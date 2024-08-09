"use strict";
var Os;
(function (Os) {
    Os["Android"] = "Android";
    Os["IOS"] = "IOS";
})(Os || (Os = {}));
var Pixel = {
    OS: Os.Android,
    Manufacturer: "Google",
    CPU: "Snapdragon",
    RAM: 8,
    Memory: 128
};
function displayMobileConfiguration(mobile) {
    console.log(mobile.OS);
}
displayMobileConfiguration(Pixel);
