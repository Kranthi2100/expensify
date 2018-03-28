import authReducer from '../../reducers/auth';

test('init test should return default state', () => {
    const state = authReducer({}, {type:'@@init'});
    expect(state).toEqual({})
})

test('should handle login' , () => {
    const uid = '3242342';
    const state = authReducer({}, {type:'LOGIN', uid});
    expect(state).toEqual({uid})
})

test('should handle logout', () => {
    const state = authReducer({uid: '4534'},{type:'LOGOUT'})
    expect(state).toEqual({});
})