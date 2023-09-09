import React from 'react';
import {Table, Avatar} from 'antd';
import {UserOutlined} from "@ant-design/icons";
import './selectAnt.css'


const CommonTable = ({data,columns,total,size,page,handlePageChange,handleLimitChange}) => (
    <Table
        columns={columns}
        dataSource={data}
        scroll={{
            y: 400,
            x: 500
        }}
        pagination={{
            total:total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            pageSize:size,
            showSizeChanger:true,
            onShowSizeChange:handleLimitChange,
            pageSizeOptions:[5, 10, 15],
            current:page+1,
            onChange:handlePageChange
        }}
    />
);
export default CommonTable;