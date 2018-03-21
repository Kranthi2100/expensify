// import React from 'react';
// import Header from '../../components/Header';
// import ReactShallowRenderer from 'react-test-renderer/shallow';

// test('testing header component', ()=>{
//     const vDOM = new ReactShallowRenderer();
//     vDOM.render(<Header />);
//     expect(vDOM.getRenderOutput()).toMatchSnapshot();
// }); 

import React from 'react';
import Header from '../../components/Header';
import {shallow} from 'enzyme'

test('testing header component', ()=>{
    const wrapper = shallow(<Header />);
    expect(wrapper).toMatchSnapshot();
})