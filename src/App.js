import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import LoginPage from './pages/login/LoginPage';
import AdminPage from './pages/admin/AdminPage';

/**
 * 应用的根组件
 * @returns 
 */
class App extends React.Component {
  render() {
    return (
      <ConfigProvider
        theme={{
          token: {
            // Seed Token，影响范围大
            colorPrimary: '#00b96b',
            borderRadius: 10,
            // 派生变量，影响范围小
            colorBgContainer: '#f6ffed'
          }
        }}
      >
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />}></Route>
            <Route path="/" element={<AdminPage />}></Route>
          </Routes>
        </Router>
      </ConfigProvider>

    )
  }
}

export default App;
