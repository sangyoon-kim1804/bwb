import './Event.css';
import React, { useState, useRef, useEffect} from 'react';
import { Button, Checkbox, Tabs } from 'antd';
import Container from 'react-bootstrap/Container';
import Label from 'react-bootstrap/FormLabel';
import Badge from 'react-bootstrap/Badge';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';

function App() {
  const [email, setEmail] = useState();
  const [number, setNumber] = useState();
  const [check, setCheck] = useState();
  const [wallet, setWallet] = useState();  
  const [confirm, setConfirm] = useState();
  const inputEmail = useRef();
  const inputNumber = useRef();
  const inputCheck = useRef();    
  const inputWallet = useRef();   
  const inputConfirm = useRef(); 
  const eventSection = useRef();   
  const resultSection = useRef();
  const setEmailKeyup = ({ target: { value } }) => {
      setEmail(value);
  }
  const setNumberChange = (n) => {
      setNumber((number||0) + n);
  }
  const setNumberKeyup = ({ target: { value } }) => {        
      setNumber(value);
  };
  const maxNumber = () => {
      if (number == 0){
          setNumber(1);    
      }        
      if (number > 1000) {
          alert('예약 수량은 최소 1개부터 최대 1000개 까지 가능합니다.');
          setNumber(1000);
      }
  }
  const setCheckChange = (checkedValues) => {
      setCheck(checkedValues);
  };    
  const setWalletKeyup = ({ target: { value } }) => {        
    setWallet(value.replace(/[^a-zA-Z0-9]/gi,''));
  };  
  const onSave = () => {
    
    if (!email) {
          alert('이메일을 입력해 주세요');
          inputEmail.current.focus();
          return false;
      }
      if (!number) {
          alert('예약수량을 입력해 주세요');
          inputNumber.current.focus();
          return false;
      }
      if (wallet) {
        if (String(wallet).substring(0,2) !== "0x"){
          alert("지갑주소는 0x로 시작해야 합니다.");      
          setWallet('');
          inputWallet.current.focus();
          return false;
        }
        if (wallet.length !== 42){
          alert("지갑주소는 42글자여야 합니다.");      
          setWallet('');
          inputWallet.current.focus();
          return false;
        }    
      }        
      if (!check) {
          alert('약관동의에 체크해 주세요');
          inputCheck.current.focus();
          return false;
      }
      
      eventSection.current.style.display = "none";
      resultSection.current.style.display = "block";
  }
  const setConfirmKeyup = ({ target: { value } }) => {
      setConfirm(value);
  }    
  const onConfirm = () => {
      if (!confirm) {
          alert('이메일을 입력해 주세요');
          inputConfirm.current.focus();
          return false;
      }
      eventSection.current.style.display = "none";
      resultSection.current.style.display = "block";      
  }
  useEffect(() => {
      maxNumber();
  },[number]);  
  return (
    <Container>
      <div className="event-wrapper">
          <section ref={eventSection}>
              <Tabs className="design" defaultActiveKey="1">
                  <Tabs.TabPane tab="사전예약하기" key="1"> 
                      <Form>
                          <Form.Group className="mb-3">
                              <h2 className="title mt-4">영화 '거미집' NFT VOD 사전 예약</h2>
                              <ul className="mt-4 p-0 mb-3 mb-sm-4 event_ul" style={{ listStyle: "none" }}>
                                  <li>본 예약 신청 시 (언제)로 예정된 영화 ‘거미집' NFT VOD의 배포 시 우선 구매권한을  부여합니다.</li>      
                                  <li>NFT VOD의 배포 일정은 영화 일정에 따라 변경될 수 있습니다.</li>
                              </ul>
                              <Row>
                                  <Col sm='3'>
                                      <Label className='w-100 col-form-label d-flex h-100 align-items-end'>
                                          이메일 주소&nbsp;:
                                      </Label>
                                  </Col>
                                  <Col sm='9'>
                                      <Form.Control type="text" ref={inputEmail} placeholder="Email address" style={{ height: "48px" }} onChange={setEmailKeyup} value={email||''} />    
                                  </Col>
                              </Row>                              
                              <Row className="mb-3 mt-3">
                                  <Col sm='3'>
                                      <Label className='w-100 col-form-label d-flex h-100 align-items-end'>
                                          예약 수량&nbsp;:
                                      </Label>
                                  </Col>
                                  <Col sm='9'>  
                                      <h5>                                    
                                          <Badge bg="" className="me-1" style={{ cursor: "pointer", background: "#2AC8A1", fontWeight: "400" }} onClick={() => setNumberChange(1)}>+1개</Badge>
                                          <Badge bg="" className="me-1" style={{ cursor: "pointer", background: "#2AC8A1", fontWeight: "400" }} onClick={() => setNumberChange(10)}>+10개</Badge>
                                          <Badge bg="" className="me-1" style={{ cursor: "pointer", background: "#2AC8A1", fontWeight: "400" }} onClick={() => setNumberChange(100)}>+100개</Badge>
                                      </h5>                                                                          
                                      <Form.Control className="w-25 d-inline-block me-2" ref={inputNumber} type="number" style={{ height: "48px" }} value={number||''} onChange={setNumberKeyup} />    
                                      <b>개</b>
                                  </Col>
                              </Row>
                              <Row className="mb-4 mt-3">
                                  <Col sm='3'>
                                      <Label className='w-100 col-form-label d-flex h-100 align-items-end'>
                                          지갑 주소&nbsp;<small>(옵션)</small>&nbsp;:
                                      </Label>
                                  </Col>
                                  <Col sm='9'>
                                      <Form.Control type="text" ref={inputWallet} placeholder="0x" style={{ height: "48px" }} onChange={setWalletKeyup} value={wallet||''} />    
                                  </Col>
                              </Row>                                   
                              <Checkbox.Group ref={inputCheck} className="mb-1" style={{ width: '100%' }} onChange={setCheckChange} value={check}>
                                  <Checkbox value="Y">개인정보 이용에 동의합니다</Checkbox>                    
                              </Checkbox.Group>                                    
                              <Button type="primary" className="rounded-5 w-100 mt-4" bg="primarty" style={{ height: "50px", border: "none"}} onClick={onSave}>
                                  NFT VOD PRE-ORDER
                              </Button>
                          </Form.Group>
                      </Form>
                  </Tabs.TabPane>
                  <Tabs.TabPane tab="신청내역 확인하기" key="2">
                      <Form>
                          <Form.Group className="mb-3">
                              <h2 className="title mt-4">영화 '거미집' NFT VOD 신청내역 확인</h2>
                              <ul className="mt-4 p-0 mb-4 event_ul" style={{ listStyle: "none" }}>
                                  <li>예약시 입력한 이메일 주소를 입력하세요.</li>
                              </ul>
                              <Row className="mb-2">
                                  <Col sm='3'>
                                      <Label className='w-100 col-form-label text-sm-end'>
                                          이메일 주소 :
                                      </Label>
                                  </Col>
                                  <Col sm='9'>
                                      <Form.Control type="text" placeholder="Email address" value={confirm||''} ref={inputConfirm} onChange={setConfirmKeyup} style={{ height: "48px" }} />    
                                  </Col>
                              </Row>
                              <Button type="primary" className="rounded-5 w-100 mt-4" bg="primarty" style={{ height: "50px", border: "none"}} onClick={onConfirm}>
                                  SUBMIT
                              </Button>
                          </Form.Group>
                      </Form>
                  </Tabs.TabPane>
              </Tabs>
          </section>
          <section ref={resultSection} className="text-center" style={{ display: "none" }}>
            <h2 className="title mb-3"><b>영화 '거미집' NFT VOD 사전 예약 참여내역</b></h2>
              <h5 className="mt-5 mb-5">영화 '거미집' NFT VOD 사전 예약 참여가 완료되었습니다.</h5>
              <h4 className="mb-4"><b>xxx@email.com</b></h4>
              <h4><b>참여 수량 : 1 NFT VOD</b></h4>
              <ul className="mt-5 p-0 mb-3 mb-sm-4 event_ul text-start" style={{ listStyle: "none" }}>
                  <li>NFT VOD가 배포되면 이메일 및 nepla 알림 서비스를 통해 구매 안내가 제공됩니다.</li>
                  <li>본 예약 신청 시 (언제)로 예정된 영화 ‘거미집' NFT VOD의 배포 시 우선 구매권한을  부여합니다.</li>
                  <li>NFT VOD의 배포 일정은 영화 일정에 따라 변경될 수 있습니다.</li>
              </ul>            
          </section>
      </div>
  </Container>
  );
}

export default App;
