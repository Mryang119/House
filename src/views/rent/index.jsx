import React, { Component } from 'react'
import MyNavBar from '../../components/navBar'
import HouseItem from '../../components/houseLitst'
import { WingBlank } from 'antd-mobile'
import  styles  from './index.module.scss'

export default class Rent extends Component {
    state = {
        houseList: null
    }

    componentDidMount() {
        this.getHouseListData()
        console.log('111');
        
    }

    getHouseListData = async () => {
        const result = await this.axios.get('/user/houses')

        if (result.data.status === 200) {
            this.setState({
                houseList: result.data.body
            })
        }
    }

    render() {
        const { houseList } = this.state
        return (
            <div>
                <MyNavBar title="我的出租列表" className={styles.MyNavBar} />
                <WingBlank size="md">
                {
                   houseList && houseList.map(item => {
                       return <HouseItem key={item.houseCode} {...item}/>
                   })
                }
                </WingBlank>
            </div>
        )
    }
}
