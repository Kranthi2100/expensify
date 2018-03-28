// import React from 'react';
// import Header from '../../components/Header';
// import ReactShallowRenderer from 'react-test-renderer/shallow';

// test('testing header component', ()=>{
//     const vDOM = new ReactShallowRenderer();
//     vDOM.render(<Header />);
//     expect(vDOM.getRenderOutput()).toMatchSnapshot();
// }); 

import React from 'react';
import { Header } from '../../components/Header';
import { shallow } from 'enzyme'

let wrapper,startLogout; 
beforeEach(() => {
    startLogout= jest.fn();
    wrapper = shallow(<Header startLogout={startLogout} />);
})

test('testing header component', () => {
    
    expect(wrapper).toMatchSnapshot();
})

test('should call startLogout on click', () => {
    wrapper.find('button').simulate('click');
    expect(startLogout).toHaveBeenCalled();
})