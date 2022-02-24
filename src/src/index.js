import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import storageUtils from './utils/storageUtils'
import memoryUtils from './utils/memoryUtils'
import App from './App'
import 'antd/dist/antd.less'

// 读取local中的user保存到memory中
const user = storageUtils.getUser()
memoryUtils.user = user

ReactDOM.render(
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
)