String.prototype.chomp = function () {
return this.replace(/(\n|\r)+$/, '');
};

exports.parse =  function(game){
      var line,
        _hands,
        hand,
        hand_length,
        hand_start_match,
        hand_end_marker,
        hand_end_match
        ;
      var game_array=game.split("\n");
      var line0_match = /#(\d+).+#(\d+)/.exec(game_array[0]);
      var line1_match = /(.+) #(\d+)/.exec(game_array[1]);
      var hand_start_marker=line1_match[1];
    
      _hands=[]; 
      hand=-1;
      game_array.forEach(function(line){
        if(hand_start_match = new RegExp(hand_start_marker+' #(\\d+)').exec(line)){
          _hands[++hand]={
            number:hand_start_match[1]
          };
          hand_length=0;
          _hands[hand].data=[];
        }
        else
          if(_hands[hand] && !hand_end_marker){
            if(hand_end_match = new RegExp('(.?) #'+_hands[hand].number).exec(line)){
              hand_end_marker = hand_end_match[1];
            }
          }
          
         if(_hands[hand]) _hands[hand].data[hand_length++]=line.chomp();
      });

      return {
        table: line0_match[1],
        number: line0_match[2],
        hands: _hands
      }; 
};
