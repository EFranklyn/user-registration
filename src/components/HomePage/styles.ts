import styled from 'vue3-styled-components';

const btnProps = { color: String };

export const ButtonMenu = styled('button', btnProps)`
background-color: ${(props) => props.color || 'gray'};
color: white;
padding: 10px 20px;
border: none;
margin: 5px;
cursor: pointer;
border-radius: 5px;
`;

// export default ButtonMenu;