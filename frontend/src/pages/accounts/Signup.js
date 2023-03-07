import React, { useState } from "react";
import { Button, Card, Form, Input, notification } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import { parseErrorMessages } from "utils/forms";

export default function Signip() {
  const history = useHistory();
  const [fieldErrors, setFieldErrors] = useState({});

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      const data = { username, password }; //조금더 명시적으로 하기 위함??
      setFieldErrors({});
      try {
        await Axios.post("http://127.0.0.1:8000/accounts/signup/", data);
        notification.open({
          message: "회원가입 성공!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
          description: "로그인 페이지로 이동합니다.",
          onClick: () => {
            console.log("Notification Clicked!");
          },
        });
        history.push("/accounts/login");
      } catch (error) {
        console.log(error);

        if (error.response) {
          notification.open({
            message: "회원가입 실패!",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
            description: "아이디/암호를 확인해 주세요.",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });

          const { data: fieldsErrorMessages } = error.response;
          //fieldsErrorMessages으로 임의로 변경해 준다 모양은 {username:["m1", "m2"], password:[]}
          //python의 mydict.items()와 같다
          console.log(fieldsErrorMessages);

          setFieldErrors(parseErrorMessages(fieldsErrorMessages));
          console.log(fieldErrors);
        }
      }
      //await은 async함수 안에서 사용되어야 하니까 임의의 fn()을 만들어주고 넣어준다.
    }
    fn(); //위에서 fn()을 정의하고 여기서 호출한다.

    console.log(values);
  };

  return (
    <Card title="회원가입">
      <Form
        labelCol={{ span: 8 }} //부트스트랩은 한 행이 12 컬럼인데 antd는 24컬럼임
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]} //rules을 통해 유효성검사로직이 들어가 잇다
          hasFeedback //username의 끝 부분에 체크표시?
          {...fieldErrors.username}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please input your password!" },
            { min: 5, message: "5자리 이상 해주세요" }, // 한글자 한글자 들어갈때마다 검사해준다.
          ]}
          {...fieldErrors.password}
        >
          <Input.Password />
        </Form.Item>
        {/* //8칸 이동하고 16칸을 쓰겠다 */}
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
