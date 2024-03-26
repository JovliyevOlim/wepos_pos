import {useEffect, useState} from "react";
import {connect} from "react-redux";
import { Button } from "antd";
import moment from "moment";

import registerUserReducer, {getRegisterUsers} from "./registerUserReducer";
import CustomTable from "../../../../../Components/CommonTable";
import useWindowWidth from "../../../../../Components/useWindowWidth";
import editPancil from "../../../../../../img/editPencil.svg"
import "./registerUsers.css"
import {Link} from "react-router-dom";

export function EditButton({buttonText, ...props}) {
  const widthWidth = useWindowWidth()
  return <Button title={buttonText} className="d-flex align-items-center gap-2 table_button edit_buttonTable" {...props}>
    {
      widthWidth >= 768 && buttonText && <span>{buttonText}</span>
    }
    <img style={{width: 16, height: 16}} src={editPancil} alt="edit table button pencil"/>
  </Button>
}

function UserRegister({registerUserReducer,getRegisterUsers}) {
  const [pageData, setPageData] = useState({
    page: 1,
    size: 10,
  });

  useEffect(()=>{
    getRegisterUsers({page: pageData?.page, size: pageData?.size})
  },[registerUserReducer.current])

  const onChange = (pageNumber, page) => {
    setPageData(prev => ({ ...prev, size: page, page: pageNumber }));
  };

  const columns = [
    {
      key: "id",
      title: 'Id',
      dataIndex: 'index',
      width: '50px',
      fixed: 'left',
    },
    {
      title: "Ismi Sharifi",
      dataIndex: "fullName",
      key: "fullName",
      search: true,
    },
    {
      title: "Telefon Nomeri",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Telegram",
      dataIndex: "telegramLink",
      key: "telegramLink",
      render: record => <Link to={{pathname: `https://${record}`}} rel="noopener noreferrer" target="_blank" >Link</Link>,
    },
    {
      title: "Tavsif",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "O'qilgan",
      dataIndex: "read",
      key: "read",
      render: eski => eski ? "O'qilgan" : "O'qilmagan",
    },
    {
      title: "Vaqti",
      dataIndex: "createdAt",
      key: "createdAt",
      render: eski => moment(eski).format("LLL"),
    },
    {
      title: "Amallar",
      dataIndex: 'id',
      key: 'id',
      render: (item, record) => <div className="flex justify-center items-center gap-2">
        <EditButton
          onClick={() => {
            // setPageData( (prev) => ({...prev, editId: record.id, openModal: true}))
            // form.setFieldValue("name", record.name)
          }}
          buttonText={"Taxrirlash"} />
      </div>,
    },
  ];

  console.log(registerUserReducer)

  return (
    <div className="container">
      <h4 className="mb-4 text-center">Ro&apos;yxatdan o&apos;tgan mijozlar</h4>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        page={pageData.page}
        size={pageData.size}
        data={registerUserReducer?.registerUsers?.suggestion_list}
        total={registerUserReducer?.registerUsers?.totalItems}
        // loading={isLoading}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((registerUserReducer), {getRegisterUsers}) (UserRegister);
