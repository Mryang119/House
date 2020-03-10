import React, { Component } from 'react'
import { BASE_URL } from '../../utils/url'
import { Carousel, Flex, Grid, WingBlank } from 'antd-mobile'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
// 导入静态资源
import image1 from '../../static/images/nav-1.png'
import image2 from '../../static/images/nav-2.png'
import image3 from '../../static/images/nav-3.png'
import image4 from '../../static/images/nav-4.png'
// 导入搜索子组件
import Search from '../../components/search/index'
import {getCurrencity} from '../../utils/city'
class Home extends Component {
  constructor () {
    super()

    this.state = {
      swipers: null, // 轮播图
      groups: null, // 租房小组
      news: null, // 最新资讯
      cityName:'深圳'
    }
  }
  // 定义的实例属性
  navs = [
    { icon: image1, text: '整租', path: '/layout/houselist' },
    { icon: image2, text: '合租', path: '/layout/houselist' },
    { icon: image3, text: '地图找房', path: '/map' },
    { icon: image4, text: '去出租', path: '/rent/add' }
  ]

  componentDidMount () {
    // 加载轮播图
    this.getSwiperData()
    // 记载租房小组
    this.getGroupsData()
    // 获取最新资讯
    this.getNewsData()
    
    this.getCityname()
  }
  // 获取定位城市信息
   getCityname = async() =>{
     let city = window.localStorage.getItem('city')
     if(city){
       this.setState({
        cityName:JSON.parse(city).label
       })
     } else {
      let res = await getCurrencity()
      this.setState({
        cityName:res.label
      })
     }
  }
  // 获取租房小组数据
  getGroupsData = async () => {
    const result = await this.axios.get(
      '/home/groups?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    if (result.data.status === 200) {
      this.setState({
        groups: result.data.body
      })
    }
  }
  // 获取最新资讯
  getNewsData = async () => {
    const result = await this.axios.get(
      '/home/news?area=AREA%7C88cff55c-aaa4-e2e0'
    )

    if (result.data.status === 200) {
      this.setState({
        news: result.data.body
      })
    }
  }
  // 获取轮播图数据
  getSwiperData = async () => {
    const result = await this.axios.get('/home/swiper')

    if (result.data.status === 200) {
      this.setState({
        swipers: result.data.body
      })
    }
  }

  // 渲染轮播图
  renderSwiper = () => {
    return (
      <Carousel autoplay infinite>
        {this.state.swipers.map(item => (
          <a
            key={item.id}
            href='http://www.alipay.com'
            style={{ display: 'inline-block', width: '100%', height: 212 }}
          >
            <img
              src={`${BASE_URL}${item.imgSrc}`}
              alt=''
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                // fire window resize event to change height
                window.dispatchEvent(new Event('resize'))
                this.setState({ imgHeight: 'auto' })
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
  // 渲染导航菜单
  renderNav = () => {
    return (
      <Flex className={styles.nav}>
        {this.navs.map(item => {
          return (
            <Flex.Item key={item.text}>
              <Link to={item.path}>
                <img src={item.icon} alt='' />
                <p>{item.text}</p>
              </Link>
            </Flex.Item>
          )
        })}
      </Flex>
    )
  }
  // 渲染租房小组
  renderGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex justify='between'>
          <Flex.Item style={{ fontSize: 18, fontWeight: 'bold' }}>
            租房小组
          </Flex.Item>
          <Flex.Item align='end'>更多</Flex.Item>
        </Flex>
        <Grid
          data={this.state.groups}
          columnNum={2}
          hasLine={false}
          square={false}
          renderItem={item => (
            <div className={styles.navItem}>
              <div className={styles.left}>
                <p>{item.title}</p>
                <p>{item.desc}</p>
              </div>
              <div className={styles.right}>
                <img src={`${BASE_URL}${item.imgSrc}`} />
              </div>
              <div></div>
            </div>
          )}
        />
      </div>
    )
  }
  // 渲染最新资讯
  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新资讯</h3>
        <WingBlank size='md'>
          {this.state.news.map(item => {
            return (
              <div key={item.id} className={styles.newsItem}>
                <div className={styles.imgWrap}>
                  <img
                    className={styles.img}
                    src={`${BASE_URL}${item.imgSrc}`}
                    alt=''
                  />
                </div>
                <Flex
                  justify='between'
                  className={styles.content}
                  direction='column'
                >
                  <h3 className={styles.title}>{item.title}</h3>
                  <Flex className={styles.info} justify='between'>
                    <span>{item.from}</span>
                    <span>{item.date}</span>
                  </Flex>
                </Flex>
              </div>
            )
          })}
        </WingBlank>
      </div>
    )
  }
  render () {
    const { swipers,news,groups,cityName } = this.state
    return (
      <div className={styles.root}>
        {/* 搜索子组件 */}
        <Search cityName={cityName} />
        {/* 渲染轮播图 */}
        {swipers && this.renderSwiper()}
        {/* 渲染导航菜单 */}
        {this.renderNav()}
        {/* 渲染租房小组 */}
        {groups && this.renderGroups()}
        {/* 渲染最新资讯 */}
        {news && this.renderNews()}
      </div>
    )
  }
}

export default Home
