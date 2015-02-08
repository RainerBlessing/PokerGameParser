String.prototype.chomp = function () {
return this.replace(/(\n|\r)+$/, '');
};

var determineMonth = function(monthName){
  var month;

  switch(monthName){
    case 'Jan':
      month=0;
      break;
    case 'Feb':
      month=1;
      break;
    case 'Mar':
      month=2;
      break;
    case 'Apr':
      month=3;
      break;
    case 'May':
      month=4;
      break;
    case 'Jun':
      month=5;
      break;
    case 'Jul':
      month=6;
      break;
    case 'Aug':
      month=7;
      break;
    case 'Sep':
      month=8;
      break;
    case 'Oct':
      month=9;
      break;
    case 'Nov':
      month=10;
      break;
    case 'Dec':
      month=11;
      break;
    default:
      break;
  };

  return month;
};
exports.determineMonth= determineMonth;

exports.convertStringToDate = function(dateString){
  var date, dateStringArray, timeArray;
  var year,month,day,hour,minute,second;

  dateStringArray=dateString.split(' ');
  year = dateStringArray[2];
  month = determineMonth(dateStringArray[1]);
  day = dateStringArray[0];
  timeArray = dateStringArray[3].split(':');
  hour = timeArray[0];
  minute = timeArray[1]; 
  second = timeArray[2];

  return new Date(year,month,day,hour,minute,second);
};

var parseHands = function(hands){
  hands.forEach(function(hand){
    hand.data.forEach(function(handLine){
      i=0;
      switch(i++){
        case 1:
          hand.date = convertStringToDate(handLine);
        break;
        default:
          break;
      };
    });
  });
}

exports.parse =  function(game){
      var line,
        _hands,
        hand,
        hand_length,
        hand_start_match,
        hand_end_marker,
        hand_end_match,
        i
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

      parseHands(_hands);

      return {
        table: line0_match[1],
        number: line0_match[2],
        hands: _hands
      }; 
};
