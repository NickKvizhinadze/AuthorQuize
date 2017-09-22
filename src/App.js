import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'

// var _ = require('lodash');

var data = [
  {
      name: 'Mark Twain', 
      imageUrl: '/images/authors/marktwain.jpg',
      books: ['The Adventures of Huckleberry Finn']
  },
  {
      name: 'Joseph Conrad',
      imageUrl: '/images/authors/josephconrad.png',
      books: ['Heart of Darkness']
  },
  {
      name: 'J.K. Rowling',
      imageUrl: '/images/authors/jkrowling.jpg',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Harry Potter and the Sorcerers Stone']
  },
  {
      name: 'Stephen King',
      imageUrl: '/images/authors/stephenking.jpg',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Pinguino',
      books: ['The Shining','IT']
  },
  {
      name: 'Charles Dickens',
      imageUrl: '/images/authors/charlesdickens.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['David Copperfield', 'A Tale of Two Cities']
  },
  {
      name: 'William Shakespeare',
      imageUrl: '/images/authors/williamshakespeare.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
  }
];

data.selectGame = () => {
  var books = _.shuffle(data.reduce((p, c, i) => {
      return p.concat(c.books);
  }, [])).slice(0, 4);

  var answer = books[_.random(books.length-1)];

  return {
    books: books,
    author: _.find(data, (author) => {
      return author.books.some((title) => {
        return title === answer;
      });
    }),
    checkAnswer: (author, title) => {
      return author.books.some((t) => {
        return t === title;
      });
    }
  };
}

const Book = (props) => {
    return (
      <div className="answer"
          onClick={() => props.onBookSelected(props.title)}>
        <h4>
          {props.title}
        </h4>
      </div>
    );
};

Book.propTypes = {
  title: PropTypes.string.isRequired
};

class Quiz extends Component {
  state = _.extend({
    bgClass: 'neutral',
    showContinue: false
  },this.props.data.selectGame());
  
  handleBookSelected = (title) => {
    var isCorrect = this.state.checkAnswer(this.state.author, title);
    this.setState({
      bgClass: isCorrect ? 'pass': 'fail',
      showContinue: isCorrect
    });
  };

  handleContinue = () => {
    this.setState(() => {
      return _.extend({
        bgClass: 'neutral',
        showContinue: false
      },this.props.data.selectGame());
    });
  };


  render () {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            <img src={this.state.author.imageUrl} className="authorimage col-md-3" alt={this.state.author.name} />
          </div>
          <div className="col-md-7">
            {this.state.books.map((b,i) => {
              return <Book onBookSelected={this.handleBookSelected} key={i} title={b} />;
            }, this)}
          </div>
          <div className={"col-md-1 " + this.state.bgClass}></div>
        </div>
        {this.state.showContinue ? (
          <div className="row">
            <div className="col-md-12">
              <input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Continue"/>
            </div>
          </div>
        ) : <span />}

      </div>
      );
  }
}

Quiz.propTypes = {
  data: PropTypes.array.isRequired
}

class App extends Component {
  render() {
    return <Quiz data={data}/>;
  }
}

export default App;
