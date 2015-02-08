var PKR = require("../src/pkr");
var fs = require('fs');
describe("game parsing", function () {
    it("parses a sng game", function () {
          var game;

          var data = fs.readFileSync('spec/standard (31191109).txt','utf8');

          game = PKR.parse(data);
          expect(game.number).toBe('31191109');
          expect(game.hands[0].number).toBe('2689494271');
          //console.log(game.hands[0].date);
    });

    it("converts a date string to date", function(){
      var dateString = '17 Jan 2015 16:39:04';

      var date = PKR.convertStringToDate(dateString);
      expect(date).toEqual(new Date(2015,0,17,16,39,4));
    });

    it("converts month name to month number", function(){
      var monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      var i=0;
      monthNames.forEach(function(monthName){
        expect(i++).toBe(PKR.determineMonth(monthName));
      });
    });
});
