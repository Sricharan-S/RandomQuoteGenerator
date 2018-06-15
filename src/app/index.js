
import React  from 'react';
import { render} from 'react-dom'
import axios from 'axios';
require('./css/quote.css');

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            quote:null,
            author:''
        }
        this.getQuotes = this.getQuotes.bind(this);
        
    }
    
      componentDidMount(){
        
        this.getQuotes();
     }

    getQuotes(){
     var _this = this;   //good one...
     var rand = Math.floor(Math.random()*102);
     axios.get('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
     .then(function(res){
        _this.setState({
            quote:res.data.quotes[rand].quote,
            author:res.data.quotes[rand].author
        });
     })
     var randomColors = function(){
        var sum = '#';
        var hex = '0123456789ABCDEF';
       
        for(var i = 0;i<=5;i++){
         var ran = Math.floor(Math.random()*16);
            sum = sum + hex[ran];
        }
        return sum;
    };
    var q = this.refs.text;
    document.body.style.backgroundColor =   q.style.color = randomColors();
    console.log(q);
    }
    
   render(){
       var tweet = `https://twitter.com/intent/tweet?text=${this.state.quote} + ${this.state.author}`;
     return (
         <div className="quotegens">
       <div id="text" ref="text"> {
           !this.state.quote ? 
           ( <p>Loading</p>) :
           ( <p>{this.state.quote}</p>)
           } 
      </div>
       <div id="author">-{this.state.author}</div>
       <button id="new-quote" onClick={this.getQuotes}>Next Quote</button>
       <a href={tweet} id="tweet-quote">Tweet</a>
       </div>
     );
   }
   


}


//put component into html page
render(<App />,document.getElementById('quote-box'));


