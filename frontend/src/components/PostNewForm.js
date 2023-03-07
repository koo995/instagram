import React, { useState } from "react";
import { Card, Form, Input, Button, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { getBase64FromFile } from "utils/Base64";
import Axios from "axios";
import { useAppContext } from "store";
import { parseErrorMessages } from "utils/forms";
import { useHistory } from "react-router-dom";

export default function PostNewForm() {
  const {
    store: { jwtAccessToken },
  } = useAppContext();
  const history = useHistory();
  const [fileList, setFileList] = useState([]);
  const [fieldErrors, setFieldErrors] = useState({});
  const [previewPhoto, setPreviewPhoto] = useState({
    //모달로 보여줄 것이라는데 그게 뭔말이지?
    visible: false,
    base64: null,
  });
  const handleUploadChange = ({ fileList }) => {
    setFileList(fileList);
  };
  const handlePreviewPhoto = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64FromFile(file.originFileObj); //임의의 함수를 유틸에다가 만들것 "originFileObj":{"uid":"rc-upload-1677754128223-13"}이런 모양인데 이걸로 뭘하냐...
    }

    setPreviewPhoto({
      visible: true,
      base64: file.url || file.preview,
    });
  };

  const handleFinish = async (fieldValues) => {
    const {
      caption,
      location,
      photo: { fileList },
    } = fieldValues;
    const formData = new FormData(); //이건 단순히 자바스크립트 문법이라네? 이름 그대로로 생각하면 되나?
    formData.append("caption", caption);
    formData.append("location", location);
    fileList.forEach((file) => {
      formData.append("photo", file.originFileObj);
    });

    const headers = { Authorization: `Bearer ${jwtAccessToken}` };
    try {
      const response = await Axios.post(
        "http://127.0.0.1:8000/api/posts/",
        formData,
        {
          headers,
        }
      );
      console.log(response);
      history.push("/");
    } catch (error) {
      console.log(error); //이것을 통해 어떤 에러가 있었는지 자세히 알 수 있다.
    }
  };

  return (
    <Form
      labelCol={{ span: 8 }} //부트스트랩은 한 행이 12 컬럼인데 antd는 24컬럼임
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      onFinish={handleFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Caption"
        name="caption"
        rules={[{ required: true, message: "Caption을 입력해 주세요" }]} //rules을 통해 유효성검사로직이 들어가 잇다
      >
        <Input.TextArea />
        {/* antd에서 여러줄로 입력할수 있게 TextArea같은 것을 지원해 준다 */}
      </Form.Item>
      <Form.Item
        label="Location"
        name="location"
        rules={[{ required: true, message: "Location 입력해 주세요" }]} //rules을 통해 유효성검사로직이 들어가 잇다
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Photo"
        name="photo"
        rules={[{ required: true, message: "사진을 입력해주세요" }]}
        hasFeedback
        {...fieldErrors.photo}
      >
        {/* 항목에 보여주는 녀석들을 fileList에 넣어준다?  업로드 안에 저렇게 넣어주니 바로 사진을 올릴수있게 뜨는게 신기하네*/}
        <Upload
          listType="picture-card"
          fileList={fileList}
          beforeUpload={() => {
            return false;
          }}
          onChange={handleUploadChange}
          onPreview={handlePreviewPhoto}
        >
          {fileList.length > 0 ? null : ( //파일이 하나만 올라가면 upload을 숨기기 위함
            <div>
              <PlusOutlined />
              <div className="ant-upload-text">Upload</div>
            </div>
          )}
        </Upload>
      </Form.Item>
      {/* //8칸 이동하고 16칸을 쓰겠다 */}
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
        <hr />
      </Form.Item>
      <Modal //모달창을 upload안에 넣어두었기에 닫았는데도 upload가 클릭이 되어서 파일선택창이 뜬다
        open={previewPhoto.visible}
        footer={null}
        onCancel={() => setPreviewPhoto({ visible: false })}
      >
        {/* 이미지태그에는 url을 써도 되고 base64을 써도 된다? 웹의 기본 기능이다 */}
        <img
          src={previewPhoto.base64}
          style={{ width: "100%" }}
          alt="preview"
        />
      </Modal>
      {JSON.stringify(fileList)}
    </Form>
  );
}
