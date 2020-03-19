import React, { Component } from 'react'
import styles from './index.module.scss'
import { Button, Grid, Modal } from 'antd-mobile'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../utils/url'
import { removeToken } from '../../utils/token'

// 菜单数据
const menus = [
  { id: 1, name: '我的收藏', iconfont: 'icon-coll', to: '/favorate' },
  { id: 2, name: '我的出租', iconfont: 'icon-index', to: '/rent' },
  { id: 3, name: '看房记录', iconfont: 'icon-record', to: '' },
  {
    id: 4,
    name: '成为房主',
    iconfont: 'icon-identity',
    to: ''
  },
  { id: 5, name: '个人资料', iconfont: 'icon-myinfo', to: '' },
  { id: 6, name: '联系我们', iconfont: 'icon-cust', to: '' }
]

class My extends Component {
  state = {
    avatar: '/img/profile/avatar.png',
    nickname: '游客',
    isLogin: false
  }

  componentDidMount () {
    this.getUserInfoData()
  }

  getUserInfoData = async () => {
    const result = await this.axios.get('/user')

    if (result.data.status === 200) {
      this.setState({
        avatar: result.data.body.avatar,
        nickname: result.data.body.nickname,
        isLogin: true
      })
    }
  }

  // 退出
  logout = async () => {
    Modal.alert('提示', '确认退出吗?', [
      { text: '取消', onPress: null },
      {
        text: '确定',
        onPress: async () => {
          const result = await this.axios.post('/user/logout')

          if (result.data.status === 200) {
            // 把本地的token删除掉
            removeToken()

            this.setState({
              avatar: '/img/profile/avatar.png',
              nickname: '游客',
              isLogin: false
            })
          }
        }
      }
    ])
  }
  render () {
    const { avatar, nickname, isLogin } = this.state

    return (
      <div className={styles.root}>
        {/* 用户信息 */}
        <div className={styles.title}>
          <img
            className={styles.bg}
            src='http://huangjiangjun.top:8088/img/profile/bg.png'
            alt=''
          />
          <div className={styles.info}>
            <div className={styles.myIcon}>
              <img
                className={styles.avatar}
                src={`${BASE_URL}${avatar}`}
                alt=''
              />
            </div>
            <div className={styles.user}>
              <div className={styles.name}>{nickname}</div>
              {isLogin ? (
                <div>
                  <div onClick={this.logout} className={styles.auth}>
                    <span>退出</span>
                  </div>
                  <div className={styles.edit}>
                    编辑个人资料
                    <span className={styles.arrow}>
                      <i className='iconfont icon-arrow'></i>
                    </span>
                  </div>
                </div>
              ) : (
                <div className={styles.edit}>
                  <Button
                    onClick={() => this.props.history.push('/login')}
                    inline
                    type='primary'
                    size='small'
                  >
                    去登录
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 菜单信息 */}
        <Grid
          data={menus}
          columnNum={3}
          hasLine={false}
          square={false}
          renderItem={dataItem => (
            <Link to={dataItem.to}>
              <div className={styles.menuItem}>
                <i className={`iconfont ${dataItem.iconfont}`} />
                <span>{dataItem.name}</span>
              </div>
            </Link>
          )}
        />
        {/* 底部广告 */}
        <div className={styles.ad}>
          <img
            src='http://huangjiangjun.top:8088/img/profile/join.png'
            alt=''
          />
        </div>
      </div>
    )
  }
}

export default My
