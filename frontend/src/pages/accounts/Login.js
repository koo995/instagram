import React, { useState } from "react";
import { Card, Button, Form, Input, notification } from "antd";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import useLocalStorage from "utils/useLocalStorage";

export default function Login() {
  const history = useHistory();
  const [jwtAccessToken, setJwtAccessToken] = useLocalStorage(
    "jwtAccessToken",
    ""
  );

  console.log("loaded Token: ", jwtAccessToken); // 왜 이게 두번이나 출력되는 것이지?

  const onFinish = (values) => {
    async function fn() {
      const { username, password } = values;
      const data = { username, password }; //조금더 명시적으로 하기 위함??
      try {
        //응답을 꼭 받아야 한다. 토큰을 받아야 하니까
        const response = await Axios.post(
          "http://127.0.0.1:8000/accounts/token/",
          data,
          { headers: { "Content-Type": "application/json" } }
        );
        // const { data: token } = response; 이런 방식은 아래랑 다르다 response에서 data을 꺼내서 이름을 token이라 짓는 것
        // const token = response.data 와 일치하며 밑에 녀석은
        // const jwtAccessToken = response.data.access 과 일치한다
        const {
          data: { access: jwtAccessToken },
        } = response;
        setJwtAccessToken(jwtAccessToken);

        notification.open({
          message: "로그인 성공!",
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        // history.push("/accounts/login"); //TODO: 이동주소
      } catch (error) {
        console.log(error);

        if (error.response) {
          notification.open({
            message: "로그인 실패!",
            icon: <FrownOutlined style={{ color: "#ff3333" }} />,
            description: "아이디/암호를 확인해 주세요.",
            onClick: () => {
              console.log("Notification Clicked!");
            },
          });
        }
      }
    }
    fn(); //위에서 fn()을 정의하고 여기서 호출한다.
  };

  return (
    <Card title="login">
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
