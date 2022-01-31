import * as React from 'react';
import * as RN from 'react-native';
class Calendar extends React.Component {
    months = ["January", "February", "March", "April", 
    "May", "June", "July", "August", "September", "October", 
    "November", "December"];
 
    weekDays = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
    ];
    nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
     year = this.state.activeDate.getFullYear();
     month = this.state.activeDate.getMonth();
 


    generateMatrix() {
         matrix = [];
        // Create header
        matrix[0] = this.weekDays;
         firstDay = new Date(year, month, 1).getDay();
        state = {
            activeDate: new Date()
        }
         maxDays = this.nDays[month];
        if (month == 1) { // February
          if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
            maxDays += 1;
          }
        }
         counter = 1;
        for ( row = 1; row < 7; row++) {
          matrix[row] = [];
          for ( col = 0; col < 7; col++) {
            matrix[row][col] = -1;
            if (row == 1 && col >= firstDay) {
              // Fill in rows only after the first day of the month
              matrix[row][col] = counter++;
            } else if (row > 1 && counter <= maxDays) {
              // Fill in rows only if the counter's not greater than
              // the number of days in the month
              matrix[row][col] = counter++;
            }
          }
        }
 
        return matrix;
        // More code here
    }
     rows = [];
    rows = matrix.map((row, rowIndex) => {
       rowItems = row.map((item, colIndex) => {
        return (
          <RN.Text
            style={{
              flex: 1,
              height: 18,
              textAlign: 'center',
              // Highlight header
              backgroundColor: rowIndex == 0 ? '#ddd' : '#fff',
              // Highlight Sundays
              color: colIndex == 0 ? '#a00' : '#000',
              // Highlight current date
              fontWeight: item == this.state.activeDate.getDate() 
                                  ? 'bold': ''
            }}
            onPress={() => this._onPress(item)}>
            {item != -1 ? item : ''}
          </RN.Text>
        );
      });
      return (
        <RN.View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 15,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          {rowItems}
        </RN.View>
      );
    });
    _onPress = (item) => {    
        this.setState(() => {
          if (!item.match && item != -1) {
            this.state.activeDate.setDate(item);
            return this.state;
          }
        });
    };


  render() {
   matrix = this.generateMatrix();
    return (
    <View>
        <RN.Text style={{
          fontWeight: 'bold',
          fontSize: 18,
          textAlign: 'center'
        }}>
          {this.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
          { rows }
        </RN.Text>
        <RN.Button title="Previous"
                onPress={() => this.changeMonth(-1)}/>
        <RN.Button title="Next"
                onPress={() => this.changeMonth(+1)}/>
               
    
     </View>
    )
  }
}
