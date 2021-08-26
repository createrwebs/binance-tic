import React, { Component ,useState,setState} from 'react';
import Websocket from 'react-websocket';
import Graph from "./Components/Graph.js"
import './App.css';

class App extends Component {

    constructor(){
        super();
        this.state = {
            data: "",
            percent: "",
            pricec : "",
        }
    }
    

    handleData(data){
        
        let bestPrice = JSON.parse(data).a;
        bestPrice = parseFloat(bestPrice).toFixed(2);
        let perChange = JSON.parse(data).P;
        perChange = parseFloat(perChange).toFixed(2);
        let priceChange = JSON.parse(data).p;
        priceChange = parseFloat(priceChange).toFixed(2);
        console.log("log stream:" + data);
        // console.log("WEBSOCKET DATA: "+JSON.parse(data).a)
        // console.log("A DATA: "+JSON.parse(data).A)
        // console.log("All DATA: "+data)
       const newIds =[]
        if(this.state.todos){
  
    let ids = [...this.state.todos];
    ids[9] = this.state.todos[8]
    ids[8] = this.state.todos[7]
    ids[7] = this.state.todos[6]
    ids[6] = this.state.todos[5]
    ids[5] = this.state.todos[4]
    ids[4] = this.state.todos[3]
    ids[3] = this.state.todos[2]
    ids[2] = this.state.todos[1]
    ids[1] = this.state.todos[0]
    ids[0] = bestPrice
  
    
    let ptb = [...this.state.pricetb];
    ptb[9] = this.state.pricetb[8]
    ptb[8] = this.state.pricetb[7]
    ptb[7] = this.state.pricetb[6]
    ptb[6] = this.state.pricetb[5]
    ptb[5] = this.state.pricetb[4]
    ptb[4] = this.state.pricetb[3]
    ptb[3] = this.state.pricetb[2]
    ptb[2] = this.state.pricetb[1]
    ptb[1] = this.state.pricetb[0]
    ptb[0] = priceChange + '(' + perChange + '%)'
        this.setState({
          data: bestPrice,
          percent: perChange,
          pricec : priceChange,
          todos:  ids ,
          pricetb: ptb
      });
      console.log('state',this.state)
        } else {
          this.setState({
            data: bestPrice,
            percent: perChange,
            pricec : priceChange,
            todos:  [],
            pricetb:[]
        });
        }
        
    
    }

    render() {
        let todos =[]
        let pricetb =[]
        const SYMBOL = "btcusdt";
        let graph;
        if(this.state.data == ""){
            graph = <h1></h1>;
        }
        else{
            graph = <Graph data = {this.state.data}/>
        }
        if(!this.state.todos) {
            todos = ['']
        } else {
          todos = this.state.todos.slice(0,10)
        }
        if(!this.state.pricetb) {
          pricetb = ['']
      } else {
        pricetb = this.state.pricetb.slice(0,10)
      }
      const styles = {
        border: '1px solid rgba(0, 0, 0, 0.1)', 
   };
        return (
          
            <div>
                <h3>{SYMBOL}:${this.state.data}   PriceChange {this.state.pricec} Percent {this.state.percent}</h3>
                <Websocket url={'wss://stream.binance.com:9443/ws/'+ SYMBOL + '@ticker'}
                           onMessage={this.handleData.bind(this)}/>
                <div >
                {graph}
                </div> 
                <table className="table table-striped" style={styles}>
                        <thead>
                            <tr styles={{width: '200px',border: '1px solid rgba(0, 0, 0, 0.1)'}}>
                                <th styles={{width: '50%',border: '1px solid rgba(0, 0, 0, 0.1)'}}>Price</th>
                                <th styles={{width: '50%',border: '1px solid rgba(0, 0, 0, 0.1)'}}>PriceChange</th>                                
                            </tr>
                        </thead>
                        <tbody> 
                                <tr styles={{width: '200px',border: '1px solid rgba(0, 0, 0, 0.1)'}}>
                                  <td styles={{width: '100%',border: '1px solid rgba(0, 0, 0, 0.1)'}}>
                                {todos.slice(0, 10).map((todo,index) => (
                                    <div  key={index}>{todo}</div>
                                    ))}
                                    </td>
                                    <td styles={{width: '100%',border: '1px solid rgba(0, 0, 0, 0.1)'}}>
                                    {pricetb.slice(0, 10).map((pricetbs,index) => (
                                    <div key={index}>{pricetbs}</div>
                                    ))}
                                    </td>
                                </tr>
                            
                        </tbody>
                    </table>
             
              
            </div>
        );
    }
}

export default App;
