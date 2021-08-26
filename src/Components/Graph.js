import React, { Component } from 'react';
import {Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine ,SparklineTooltip, SparklineTheme, ISparklineLoadEventArgs} from 'react-sparklines';
import {
    Sparkline,
    LineSeries,
    HorizontalReferenceLine,
    BandLine,
    PatternLines,
    PointSeries ,WithTooltip ,VerticalReferenceLine} from '@data-ui/sparkline';
    import { allColors } from '@data-ui/theme'; 
    
class App extends Component {

    constructor(props) {
        super(props);
        this.state = { data: [this.props.data] };
        setInterval(() =>
            this.setState({
                data: this.state.data.concat(this.props.data)
            }), 1000)
         
              
    }

    render() {
        const style3 = {
            height: "75px",
            alignSelf: 'flex-end',
            margin:'0,200,0,0'
          };
        return (
            <div className="App">
        
          <WithTooltip renderTooltip={({ datum }) => datum.y}>
<Sparkline
      ariaLabel="A line graph of randomly-generated data"
      margin={{ top: 24, right: 64, bottom: 24, left: 64,}}
      width={600}
      height={300}
      data={this.state.data}
      valueAccessor={datum => datum}
     
    >
      {/* this creates a <defs> referenced for fill */}
      <PatternLines
        id="unique_pattern_id"
        height={6}
        width={6}
        stroke={allColors.grape[6]}
        strokeWidth={1}
        orientation={['diagonal']}
      />

      {/* display the median */}
      <HorizontalReferenceLine
      key="ref-hline"
        stroke={allColors.grape[8]}
        strokeWidth={1}
        strokeDasharray="4 4"
        reference="min"
        ariaLabel="Price"
        labelPosition="right"
        labelOffset={12}
        renderLabel={() => ('Time')}
      />
       <VerticalReferenceLine
                      key="ref-vline"
                      strokeWidth={1}
                      stroke={allColors.pink[8]}
                      reference={this.state.data.index}
                      strokeDasharray="4,4"
                      ariaLabel="Time"
                      labelPosition="right"
        labelOffset={12}
        renderLabel={() => ('Price')}
                    />,
      {/* Series children are passed the data from the parent Sparkline */}
      <LineSeries
        showArea={false}
        stroke={allColors.grape[7]}
      />
      <PointSeries
        points={['min', 'max']}
        fill={allColors.grape[3]}
        size={5}
        stroke="#fff"
        
    
      />
    </Sparkline>
    </WithTooltip>
            </div>
        );
    }
}

export default App;
