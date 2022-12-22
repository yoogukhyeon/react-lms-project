import React, { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import Select from 'react-select';
import FroalaEditor from '../../components/common/FroalaEditor';
import styled from 'styled-components';

interface IOption {
    readonly value: string;
    readonly label: string;
}

const option: IOption[] = [
    { value: 'notice', label: '공지' },
    { value: 'free', label: '자유' },
    { value: 'sports', label: '스포츠' },
];

interface IInput {
    title: string;
    content: string;
}

/* interface IProps {
    onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
    inputs: Input;
    handleModelInput: (content: string) => void;
    setEditorInput: Dispatch<SetStateAction<string>>;
}  */

export default function Form() {
    const [selected, setSelected] = useState<IOption | null | any>();

    const [inputs, setInputs] = useState<IInput>(() => {
        return {
            title: '',
            content: '',
        };
    });

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
    };

    const [editorInput, setEditorInput] = useState('');
    // editor
    const handleModelInput = (content: string) => {
        setInputs({ ...inputs, ['content']: content });
    };

    return (
        <>
            <form action="">
                <TitleBox>
                    <div className="select_wrap">
                        <Cselect
                            isClearable={true}
                            isSearchable={false}
                            options={option}
                            placeholder="선택"
                            onChange={setSelected}
                            autoFocus
                        />
                    </div>
                    <Input
                        type="text"
                        placeholder="제목을 입력해주세요."
                        value={inputs.title}
                        onChange={onChangeInput}
                        name="title"
                    />
                </TitleBox>
                <div className="editor_wrap">
                    <FroalaEditor inputs={inputs} handleModelInput={handleModelInput} setEditorInput={setEditorInput} />
                </div>
            </form>
        </>
    );
}

const Cselect = styled(Select)`
    width: 100%;
    color: #6a6a82;
    position: relative;
    z-index: 999;

    > div:nth-child(3) {
        height: 52px;
    }

    .css-1jqq78o-placeholder {
        font-weight: 500;
        color: #6a6a82;
        opacity: 0.7;
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        > div:nth-child(3) {
            height: 42px;
        }

        .css-1jqq78o-placeholder {
            font-size: 12px;
        }

        .css-1dimb5e-singleValue {
            font-size: 14px;
        }
    }
`;

const TitleBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;

    .select_wrap {
        min-width: 105px;
        width: 20%;
    }
`;

const Input = styled.input`
    width: 80%;
    height: 50px;
    padding: 0 7px;
    color: #6a6a82;
    border: 1px solid #d3d3e4;
    outline: none;
    border-radius: 2px;

    ::placeholder {
        font-weight: 500;
        color: #6a6a82;
        opacity: 0.7;
        font-size: 14px;
    }

    @media screen and (max-width: 768px) {
        & {
            height: 40px;
        }

        ::placeholder {
            font-size: 12px;
        }
    }
`;
