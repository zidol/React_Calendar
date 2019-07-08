import React, {Component} from 'react';
import styled from 'styled-components';

const Header = styled.div`
    font-szie: 2rem;
    font-weight: bold;
    padding : 16px;
    text-align: center;
`
const Container = styled.div`
    padding :16px;

`

const Item = styled.div`
    margin-bottom : 8px;
    padding : 16px;
    box-shadow: 2px 2px 2px #eee;
`
class ScheduleBoard extends Component {

    state = { content : ''}

    static defaultProps = {
        selected: null,
        items : []
    }

    onHandleChange = e => {
        this.setState({
            content : e.target.value
        })
    }

    onAdd = e => {
        if(this.props.onAdd) {
            this.props.onAdd(this.props.selected, this.state.content);
            this.setState({
                content: ''
            })
        }
    }


    render() {      
        const { content} =this.state;
        const {selected, items} = this.props;   
        if(!selected) {
            return <Header>select Date</Header>
        }

        const list = items.map((item, index) => {
            return <Item key={index}>{item}</Item>
        })

        return (
            <Container>
                {list}

                <input value={content} onChange={this.onHandleChange}></input>
                <button onClick={this.onAdd}>add</button>
            </Container>
        )
    }
}
export default ScheduleBoard;