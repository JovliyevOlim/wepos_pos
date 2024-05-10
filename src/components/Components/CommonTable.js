import React from 'react';
import {Table} from 'antd';
import './selectAnt.css'



const CommonTable = ({data,columns,size,page,pagination,total,handleLimitChange,handlePageChange,rowSelection,onchange}) => (
    <Table
        className={'scroll'}
        columns={columns}
        dataSource={data?.map((item, index) => {
            return {...item, index: index + 1 + (page * size),key:item.id}
        })}
        scroll={{
            y: 500,
            x: 800
        }}
        onChange={onchange}
        rowSelection={rowSelection}
        pagination={pagination && {
            total:total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            pageSize:size,
            showSizeChanger:true,
            onShowSizeChange:handleLimitChange,
            pageSizeOptions:[5, 10,25,50,100],
            current:page+1,
            onChange:handlePageChange
        }}
    />
);
export default CommonTable;


