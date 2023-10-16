import React, { ChangeEvent, useState, useEffect } from 'react'
import CkEditor from 'components/community/CkEditor'
import { Button, Input, P, ShadowBox } from 'styles/reusable-style/elementStyle'
import { styled } from 'styled-components'
import { URGENCY_GUIDE_LIST } from 'constants/urgencyGuideList'
import { AddAnnounceType } from 'types/community-type/announceType'
import RangeDatePicker from 'components/community/RangeDatePicker'
import { categoryService } from 'services/community/categoryService'
import { useNavigate } from 'react-router-dom'
import { Category } from 'types/community-type/categoryType'
import { announceService } from 'services/community/announceService'

const AddAnnouncePage = () => {
  const BOARD_TYPE = 'announce'

  const navigate = useNavigate()

  const [inputValue, setInputValue] = useState<AddAnnounceType>({
    category: '일반',
    // protected: false,
    title: '',
    content: '',
    // recruitFrom: new Date(),
    // recruitTo: null,
    thumbnail: '',
  })

  const [categoryList, setCategoryList] = useState<string[]>([])

  useEffect(() => {
    const getCategory = async () => {
      const response = await categoryService.getCategory({ boardType: BOARD_TYPE })
      const mappedResponse = response.data.map((item: Category) => item.categoryName)
      setCategoryList(['전체', ...mappedResponse])
    }

    getCategory()
  }, [])

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, [e.target.name]: e.target.value }))
  }

  // const toggleCheckValue = (e: ChangeEvent<HTMLInputElement>) => {
  //   setInputValue((prevState) => ({ ...prevState, protected: e.target.checked }))
  // }

  const selectRadioValue = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue((prevState) => ({ ...prevState, category: e.target.name }))
  }

  const savePost = async () => {
    const { statusCode, message } = await announceService.addPost({
      boardType: BOARD_TYPE,
      data: inputValue,
    })
    if (statusCode === 201) {
      const userConfirmed = confirm('정말 등록 하시겠습니까?')
      if (userConfirmed) {
        alert(message)
        navigate(`/community/123`)
        return
      }
      return
    }
  }

  const cancelPost = () => {
    const userConfirmed = confirm(
      '작성중인 내용은 복구할 수 없습니다. 정말 취소 하시겠습니까? ',
    )
    if (userConfirmed) {
      navigate(`/community/123`)
      return
    }
    return
  }

  return (
    <ShadowBox $display="flex" $flexDirection="column" $gap="20px" $padding="30px">
      <StyledDiv>
        <P $fontWeight="700" $fontSize="20px" $lineHeight="40px">
          공지사항 작성
        </P>
        <StyledDiv>
          <P $fontWeight="700" $fontSize="12px" $lineHeight="35px">
            우리 아파트 주민에게만 공개
          </P>
          {/* <input
            type="checkbox"
            id="toggle"
            checked={inputValue.protected}
            onChange={toggleCheckValue}
            hidden
          /> */}
          <label htmlFor="toggle" className="toggleSwitch">
            <span className="toggleButton"></span>
          </label>
        </StyledDiv>
      </StyledDiv>
      <div>
        <P $fontWeight="700" $lineHeight="40px">
          긴급도
        </P>

        <StyledDiv className="column">
          {categoryList.slice(1).map((category, index) => (
            <StyledLabel htmlFor={category} key={index}>
              <input
                type="radio"
                name={category}
                value={category}
                checked={category === inputValue.category}
                onChange={selectRadioValue}
              />
              <P $fontWeight="900">{category}</P>
              <P $fontSize="12px" $lineHeight="10px">
                {URGENCY_GUIDE_LIST[index]}
              </P>
            </StyledLabel>
          ))}
        </StyledDiv>
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="40px">
          커뮤니티 홈 위젯 노출 기간
        </P>
        {/* <RangeDatePicker inputValue={inputValue} setInputValue={setInputValue} /> */}
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          제목
        </P>
        <Input
          type="text"
          name="title"
          value={inputValue.title}
          onChange={changeInputValue}
          placeholder="제목을 입력하세요."
          $height="50px"
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
        />
      </div>
      <div>
        <P $fontWeight="700" $lineHeight="30px">
          상세 정보
        </P>
        <CkEditor inputValue={inputValue} setInputValue={setInputValue} />
      </div>
      <StyledDiv>
        <Button
          $background="#FFFFFF"
          $border="1px solid #F2F2F2"
          $color="#303030"
          onClick={cancelPost}
        >
          취소
        </Button>
        <Button onClick={savePost}>저장</Button>
      </StyledDiv>
    </ShadowBox>
  )
}

export default AddAnnouncePage

const StyledDiv = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;

  &.column {
    flex-direction: column;
  }
`

const StyledLabel = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
`
