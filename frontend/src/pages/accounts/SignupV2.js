import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Alert } from "antd";
import { useHistory } from "react-router-dom";

export default function Signup() {
  const history = useHistory();
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({}); //다수의 에러라면 {}
  const [formDisabled, setFormDisabled] = useState(true);

  const onSubmit = (e) => {
    //이 시점에 입력한 username이나 password을 알아야 한다? 그래야 backend에 요청을보내고 응답을 받으니
    e.preventDefault(); //원래는 단순히 서브밋 하면 새로고침이 되는데 그것을 방지하는 것이 e을 받아서 preventDefault을 해준다
    setErrors({}); //요청을 보내기 전에는 null로 항상 클리어 한다.

    Axios.post("http://127.0.0.1:8000/accounts/signup/", inputs)
      .then((response) => {
        console.log("response: ", response);
        history.push("/accounts/login"); //hisotry을 통해 정상동작일때 로그인 페이지로 이동할 수 있다
      })
      .catch((error) => {
        console.log("error: ", error);
        if (error.response) {
          //response가있을수있고 없을수있다
          setErrors({
            username: (error.response.data.username || []).join(" "), //값이있다면 가져오고 없다면 빈 array을 조인한다?
            password: (error.response.data.password || []).join(" "),
          });
        }
      });
  };

  useEffect(() => {
    const isDisabled =
      inputs.username.length === 0 || inputs.password.length === 0;
    setFormDisabled(isDisabled);
  }, [inputs]);

  const onChange = (e) => {
    const { name, value } = e.target; //input상의 name속성값과 e.target.value의 value값
    //useState에서 objects을 쓸때 항상 같이 써야하는데 setInputs에 하나하나씩 쓰면 지워진다
    setInputs((prev) => ({
      //여기서 왜 소괄호를 써줘야 하는지 아직 잘 이해가 안가네
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* name은 serializer에서 필드명이다 */}
        <div>
          <input type="text" name="username" onChange={onChange} />
          {errors.username && <Alert type="error" message={errors.username} />}
        </div>
        <div>
          <input type="password" name="password" onChange={onChange} />
          {errors.password && <Alert type="error" message={errors.password} />}
        </div>
        <input type="submit" value="회원가입" disabled={formDisabled} />
      </form>
    </div>
  );
}
