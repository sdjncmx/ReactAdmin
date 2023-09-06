import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Form,
    Input,
    Button,
    message
} from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

import './login.less';
import logo from '../../assets/images/logo.png';
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils';
import storageUtils from '../../utils/storageUtils';


const Item = Form.Item // 不能写在import之前

class LoginPage extends Component {

    // 官方提交表单
    onFinish = (values) => {
        console.log('Received values of form: ', values);
    };

    handleSubmit = (values) => {
        console.log('handleSubmit', values)

        //获取navigate
        const navigate = useNavigate();
        // 阻止事件的默认行为
        // event.preventDefault()

        // 对所有表单字段进行检验
        const getData = async () => {
            // 检验成功
            console.log('提交登陆的ajax请求', values)
            // 请求登陆
            // const { username, password } = values
            const identifier = values.username;
            const password = values.password;
            const result = await reqLogin(identifier, password) // {status: 0, data: user}  {status: 1, msg: 'xxx'}
            console.log('请求成功', result) // result.status === 0
            if (result.user !== null) { // 登陆成功
                // 提示登陆成功
                message.success('登陆成功')

                // 保存user
                // const user = result.data
                const user = result.user
                memoryUtils.user = user // 保存在内存中
                storageUtils.saveUser(user) // 保存到local中

                console.log("-------------------", this.props)
                
                // 跳转到管理界面 (不需要再回退回到登陆)
                // this.props.history.replace('/')
                navigate("/", {replace:true});

            } else { // 登陆失败
                // 提示错误信息
                message.error(result.msg)
                // message.error('用户名或密码错误')
            }

        };

        getData();

    }

    /*
    对密码进行自定义验证
    */
    /*
    用户名/密码的的合法性要求
        1). 必须输入
        2). 必须大于等于4位
        3). 必须小于等于12位
        4). 必须是英文、数字或下划线组成
        */
    validatePwd = (rule, value) => {
        console.log('validatePwd()', rule, value)
        if (!value) {
            return Promise.reject(new Error('密码必须输入'));
        } else if (value.length < 4) {
            return Promise.reject(new Error('密码长度不能小于4位'));
        } else if (value.length > 12) {
            return Promise.reject(new Error('密码长度不能大于12位'));
        } else if (!(/^[a-zA-Z0-9_]+$/.test(value))) {
            return Promise.reject(new Error('密码必须是英文、数字或下划线组成'));
        } else {
            return Promise.resolve() // 验证通过
        }
    }


    render() {

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>React项目: 后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登陆</h2>
                    <Form
                        name="normal_login"
                        className="login-form"
                        onFinish={this.handleSubmit}
                    >
                        {
                            /*
                        用户名/密码的的合法性要求
                            1). 必须输入
                            2). 必须大于等于4位
                            3). 必须小于等于12位
                            4). 必须是英文、数字或下划线组成
                        */
                        }
                        <Item
                            name="username"
                            rules={[
                                { required: true, whitespace: true, message: '用户名必须输入' },
                                { min: 4, message: '用户名至少4位' },
                                { max: 12, message: '用户名最多12位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是英文、数字或下划线组成' }
                            ]}
                            initialValue="admin"
                        >

                            {
                                (
                                    <Input
                                        prefix={<UserOutlined className="site-form-item-icon" />}
                                        placeholder="用户名"
                                        
                                    />
                                )
                            }
                        </Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    validator: this.validatePwd
                                }
                            ]}
                        >
                            {
                                (
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }
}

export default LoginPage;