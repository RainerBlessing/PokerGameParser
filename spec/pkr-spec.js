var PKR = require("../src/pkr");
var fs = require('fs');
describe("game parsing", function () {
    it("parses a sng game", function () {
          var game;

          var data = fs.readFileSync('spec/standard (31191109).txt','utf8');

          game = PKR.parse(data);
          expect(game.number).toBe('31191109');
          expect(game.hands[0].number).toBe('2689494271');
          //console.log(game.hands[1].data);
    });
});
