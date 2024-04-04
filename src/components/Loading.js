import {Spin} from 'antd';

function Loading({children,spinning}) {
    return (
        <Spin size={'large'} spinning={!spinning}>
             {children}
        </Spin>
    );
}

export default Loading;
