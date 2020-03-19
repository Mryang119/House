import React, { Component } from 'react'
import './index.module.scss'
import MyNavBar from '../../components/navBar'
import styles from './index.module.scss'
import { WhiteSpace, WingBlank, Flex, Toast } from 'antd-mobile'
import { setToken } from '../../utils/token'
import { Form, Field, withFormik, ErrorMessage } from 'formik'
import { axios } from '../../utils/axios'
import * as Yup from 'yup'
class Login extends Component {
  render () {
    return (
      <div className={styles.root}>
        <MyNavBar title='账号登录' />
        <WhiteSpace size='lg' />
        <WingBlank>
          <Form>
            <div className={styles.formItem}>
              <Field
                name='username'
                className={styles.input}
                placeholder='请输入账号'
                type='text'
              />
            </div>
            <ErrorMessage
              className={styles.error}
              component='div'
              name='username'
            />
            <div className={styles.formItem}>
              <Field
                name='password'
                className={styles.input}
                placeholder='请输入密码'
                type='password'
              />
            </div>
            <ErrorMessage
              className={styles.error}
              component='span'
              name='password'
            />
            <div className={styles.formSubmit}>
              <input className={styles.submit} type='submit' value='登录' />
            </div>
          </Form>
          <Flex className={styles.backHome}>
            <Flex.Item>
              <a href='#/'>还没有账号，去注册~</a>
            </Flex.Item>
          </Flex>
        </WingBlank>
      </div>
    )
  }
}

// 简单的校验规则
const USERNAMEREG = /^[a-zA-Z_0-9]{5,8}$/
const PASSWORDREG = /^[a-zA-Z_0-9]{5,12}$/
export default withFormik({
  // 建立和视图中 input 的关系
  mapPropsToValues: () => ({ username: '', password: '' }),
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .matches(USERNAMEREG, '用户名必须是5-8位')
      .required('账号为必填项'),
    password: Yup.string()
      .matches(PASSWORDREG, '密码必须是5-12位')
      .required('密码为必填项')
  }),
  handleSubmit: async (values, { props }) => {
    const result = await axios.post('/user/login', values)

    if (result.data.status === 200) {
      // 保存token
      setToken(result.data.body.token)

      // 跳转，返回
      if (props.location.state) {
        // my  ===> login ===> rent
        // props.history.push(props.location.state.to)

        // my ===> rent
        props.history.replace(props.location.state.to)
      } else {
        props.history.goBack()
      }
    } else {
      Toast.info(result.data.description, 1.5)
    }
  }
})(Login)
