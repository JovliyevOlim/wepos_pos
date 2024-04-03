import {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Button, Form, Input, Modal} from "antd";
import moment from "moment";

import registerUserReducer, {editRegisterUsers, getRegisterUsers} from "./registerUserReducer";
import CustomTable from "../../../../../Components/CommonTable";
import useWindowWidth from "../../../../../Components/useWindowWidth";
import editPancil from "../../../../../../img/editPencil.svg"

import "./registerUsers.css"

const { TextArea } = Input;

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
  const {t} = useTranslation()
  const [form] = Form.useForm();
  const [pageData, setPageData] = useState({
    page: 1,
    size: 10,
    editId: null,
    openModal: false,
    loading: false
  });

  useEffect(()=>{
    getRegisterUsers({page: pageData?.page, size: pageData?.size})
  },[registerUserReducer.current])

  const onChange = (pageNumber, page) => {
    setPageData(prev => ({ ...prev, size: page, page: pageNumber, editId: null }));
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
            setPageData( (prev) => ({...prev, editId: record.id, openModal: true}))
            form.setFieldValue("fullName", record.fullName)
          }}
          buttonText={"Taxrirlash"} />
      </div>,
    },
  ];

  const onCreate = (values) => {
    editRegisterUsers({
      ...values,
      id: pageData.editId
    })
    setPageData( (prev) => ({...prev, loading: true, editId: null, page: 0, openModal: false}))
  };

  return (
    <div className="container">
      <h4 className="mb-4 text-center">Ro&apos;yxatdan o&apos;tgan mijozlar</h4>
      <Modal
        open={pageData.openModal}
        title={t("Ro'yxatdan o'tgan foydalanuvchilarni taxrirlash")}
        okText={t('Buttons.6')}
        cancelText={t('Buttons.7')}
        onCancel={() => {
          setPageData( (prev) => ({...prev, openModal: false, editId: null}))
          form.resetFields();
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
        >
          <Form.Item
            name="fullName"
            label="Ism familiyasi"
            rules={[
              {
                required: true,
              }
            ]}
          >
            <Input placeholder={`${t('Expenses.11')}...`} />
          </Form.Item>
          <Form.Item
            name="phoneNumber"
            label="Telefon nomeri"
            rules={[
              {
                required: true,
              }
            ]}
          >
            <Input placeholder={`${t('Expenses.11')}...`} />
          </Form.Item>
          <Form.Item
            name="description"
            label="Xulosa"
          >
            <TextArea rows={3} placeholder={`${t('Expenses.11')}...`} />
          </Form.Item>
        </Form>
      </Modal>
      <CustomTable
        columns={columns}
        pageSizeOptions={[10, 20, 50, 100]}
        page={pageData.page}
        size={pageData.size}
        data={registerUserReducer?.registerUsers?.suggestion_list}
        total={registerUserReducer?.registerUsers?.totalItems}
        loading={pageData.loading}
        onChange={onChange}
      />
    </div>
  );
}

export default connect((registerUserReducer), {getRegisterUsers}) (UserRegister);
