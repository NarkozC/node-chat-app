const expect = require('expect');
const {
  Users
} = require('./users');

describe('Users', () => {
  var users

  beforeEach(() => {
    users = new Users()
    users.users = [{
      id: 1,
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: 2,
      name: 'Jen',
      room: 'React Course'
    }, {
      id: 3,
      name: 'Dogu',
      room: 'Node Course'
    }]
  })

  it('should add new user', () => {
    var users = new Users()
    var user = {
      id: '123',
      name: 'Dogucan',
      room: 'DRM'
    }
    var response = users.addUser(user.id, user.name, user.room)

    expect(users.users).toEqual([user])
  })

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course')

    expect(userList).toEqual(['Mike', 'Dogu'])
  })

  it('should return names for React Course', () => {
    var userList = users.getUserList('React Course')

    expect(userList).toEqual(['Jen'])
  })

  it('should return user with id', () => {
    var id = 1
    var user = users.getUser(id)
    expect(user.id).toBe(id)
  })

  it('should not return user', () => {
    var id = 99
    var user = users.getUser(id)
    expect(user).toBe(undefined)
  })

  it('should remove user', () => {
    var id = 1
    var user = users.removeUser(id)

    expect(user.id).toBe(id)
    expect(users.users.length).toBe(2)
  })
  it('should not remove user', () => {
    var id = 99
    var user = users.removeUser(id)

    expect(user).toBeFalsy()
    expect(users.users.length).toBe(3)
  })
})
