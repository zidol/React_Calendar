import React, { Component } from 'react';
import styled from 'styled-components';

const CalendarContainer = styled.div`
    width:100%;
`

const Header = styled.div`
  display: flex;
`

const Title = styled.div`
  flex-grow : 1;
  height: 60px;
  border : 1px solid #eee;
  line-height : 60px;
  text-align : center; 
  font-weight: bold;
  font-size : 1.5rem;
`

const Left = styled.div`
  height : 60px;
  width : 60px;
  border : 1px solid #eee;
  line-height : 60px;
  text-align : center;
  &:hover {
    cursor: pointer;
  }
`

const Right = styled.div`
  height : 60px;
  width : 60px;
  border : 1px solid #eee;
  line-height : 60px;
  text-align : center;
  &:hover {
    cursor: pointer;
  }
`
const HeadItem = styled.div`
flex: 1 0 14%;
overflow: hidden;
height : 40px;
line-height: 20px;
text-align : center;
border : 1px solid #eee;
box-sizing : border-box;
padding: 8px;
background-color : ${props => props.background || 'white'};
`

const Item = styled.div`
  flex: 1 0 14%;
  overflow: hidden;
  min-height : 100px;
  border : 1px solid #eee;
  box-sizing : border-box;
  padding: 8px;
  background-color : ${props => props.background || 'white'};
  &hover{
    cursor: pointer;
  }
`

const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`

class Day extends Component {
  onClick = e => {
    if(this.props.onClick) {
      this.props.onClick(this.props.day);
    }
  }
   render() {
     const { day, background, items} = this.props;

     const list = items.map((item) => {
         return <div>{item}</div>
     })
     return (
      <Item background={background} onClick={this.onClick}> 
        {day.date()} 
        {list}
      </Item>
     )
   }
}

class Calendar extends Component {

  onPrev = e => {
      if(this.props.onClickPrevMonth){
          this.props.onClickPrevMonth();
      }
  }

  onNext = e => {
    if(this.props.onClickNextMonth){
        this.props.onClickNextMonth();
    }
  }

  renderHeader = () => {
    const {current} = this.props;
    const title = `${current.year()} - ${current.month()+1}`
    return(
      <Header>
            <Left onClick={this.onPrev}>
              이전
            </Left>
            <Title>
              {title}
            </Title>
            <Right onClick={this.onNext}>
              다음
            </Right>
          </Header>
    )
  }

  renderDaysOfWeek = () => {
    const titles = ['일', '월', '화', '수', '목', '금', '토'];
    const items = titles.map((title, index) => {
      return <HeadItem key={index}>{title}</HeadItem>
    })
    return (
      <Content>
        {items}
      </Content>
    )
  }

  onItemClick = (selected) => {
    if(this.props.onClickDate){
        this.props.onClickDate(selected);
    }
  }
  renderWeeks = () => {
    const { current, today, selected, items } = this.props;
    // 선택된 월의 첫번재 날 (1일)이 포함된 주의 일요일
    // const firstDay = moment().month(month).date(1).day(0).startOf('day');  //date(1)선택 달의 첫번째 일(날) .day(0) 그 주의 일요일 startof ; 00:00:00
    const firstDay = current.clone().day(0).startOf('day');
    // const firstDayOfNextMonth = moment().month(month +1).date(1).startOf('day');  // 다음달 1일
    const firstDayOfNextMonth = current.clone().add(1, 'month').startOf('day');  // 다음달 1일
    const days = [];

    let index = firstDay;

    while(index.isBefore(firstDayOfNextMonth)) {
      for(let i = 0; i<7; i++) {
        let background = "#FFF";

        if(index.isSame(selected)) {
          background= "#95adbe";
        } else if( index.isSame(today)){
          background = "#dff0ea";
        } else if(index.month() !== current.month()) {
          background = "#DEDEDE";
        }  
        const selectedItems = items.filter((item) => item.selected.isSame(index)).map((item) => item.content);

        days.push(<Day key={index.format()} onClick={this.onItemClick} day={index} items={selectedItems} background={background}></Day>)
        
        index = index.clone().add(1, 'days'); 
      }
    }

    return <Content>
      {days}
    </Content>;
  }

  render() {
    return (
      <CalendarContainer>
          {this.renderHeader()}
          {this.renderDaysOfWeek()}
          {this.renderWeeks()}
      </CalendarContainer>
    )
  }

}


export default Calendar;
