import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import 'react-bootstrap-table/css/react-bootstrap-table.css';

var _ = require('lodash');

var questions = require('./data/questions.json');
var tags = require('./data/tags.json');
var questionData = {};

function populateQuestions(questions){
  _.forEach(questions, (q) => {
    questionData[q.id] = {
      link: q.link,
      title: q.title,
      frequency: Math.round(q.frequency),
      id: q.id,
      level: q.level === 3 ? 'Hard' : q.level === 2 ? 'Medium': 'Easy',
      paid_only: q.paid_only ? '√' : '',
      companies: [],
      topics: [],
    };
  });
}
function populateCompanies(companies){
  _.forEach(companies, (company) => {
    _.forEach(company.questions, (id) => {
      if(questionData[id]) {
        questionData[id].companies.push(company.name);
      }
      else {
        console.error("Couldn't find question "+id+" for this company: "+company.name);
      }
    });
  });
}
function populateTopics(topics){
  _.forEach(topics, (topic) => {
    _.forEach(topic.questions, (id) => {
      if(questionData[id]) {
        questionData[id].topics.push(topic.name);
      }
      else {
        console.error("Couldn't find question "+id+" for this topic: "+topic.name);
      }
    });
  });
}
function convertArraysToStrings(){
  _.forEach(questionData,(question) => {
    question.companies = question.companies.join(", ");
    question.topics = question.topics.join(", ");
  });
}

populateQuestions(questions);
populateCompanies(tags.companies);
populateTopics(tags.topics);
convertArraysToStrings();

class App extends Component {
  render() {
    return (
      <div className="App">
        <BootstrapTable data={_.values(questionData)} pagination search exportCSV striped hover>
          <TableHeaderColumn width='5%' dataField='id' isKey dataSort
            dataFormat={(id) => {
              return <a target="_blank" href={"https://leetcode.com/problems/"+questionData[id].link}>{id}</a>;
            }}>
            ID
          </TableHeaderColumn>
          <TableHeaderColumn dataField='title' dataSort tdStyle={ { whiteSpace: 'normal' } }>Title</TableHeaderColumn>
          <TableHeaderColumn width='5%' dataField='paid_only' dataSort>Paid</TableHeaderColumn>
          <TableHeaderColumn width='7%' dataField='level' dataSort>Difficulty</TableHeaderColumn>
          <TableHeaderColumn width='5%' dataField='frequency' dataSort>Freq</TableHeaderColumn>
          <TableHeaderColumn dataField='topics' tdStyle={ { whiteSpace: 'normal' , ellipsis:'false'} }  >Topics</TableHeaderColumn>
          <TableHeaderColumn dataField='companies' tdStyle={ { whiteSpace: 'normal', ellipsis:'false' } }>Companies</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

export default App;
