import React, { Component } from 'react';
import styled from 'styled-components';
import Calendar from './component/Calendar';
import ScheduleBoard from './component/ScheduleBoard';
import * as moment from 'moment';

const Container = styled.div`
  margin: 0 auto;
  width : ${props => props.width || '100%'};
  display: flex;
`

const Content = styled.div`
  width=70%;
`

const SideContent = styled.div`
  width:30%;
`

class App extends Component {
  state = {
    current: moment().date(1), //현재 달
    today: moment().startOf('day'),
    selected: null,
    items : []
  }

  onClickNextMonth = () => {
    this.setState({
      current: this.state.current.clone().add(1, 'month'),
    })
  }

  onClickPrevMonth = () => {
    this.setState({
      current: this.state.current.clone().add(-1, 'month'),
    })
  }

  onClickDate = (selected) => {
    this.setState({
      selected
    })
  }

  onAdd = (selected, content) => {
    this.setState({
      items: [...this.state.items, {
        selected,
        content
      }]
    })
  }

  render() {

    const { current, today, selected, items } = this.state;

    const selectedItems = items
    .filter(item => item.selected.isSame(selected))
    .map((item) => item.content);
    
    return (
      <Container>
        <Content>
          <Calendar 
            current={current} 
            today={today} 
            items={items}
            selected={selected}
            onClickNextMonth={this.onClickNextMonth}
            onClickPrevMonth={this.onClickPrevMonth}
            onClickDate={this.onClickDate}
          />
        </Content>
        <SideContent>
          <ScheduleBoard selected={selected} items={selectedItems} onAdd={this.onAdd}/>
        </SideContent>
      </Container>
    )
  }

}


export default App;
