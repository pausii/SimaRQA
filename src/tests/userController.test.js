const { Users } = require('../models');
const bcrypt = require('bcryptjs');
const userController = require('../controllers/userControllers');
const httpMocks = require('node-mocks-http');
const jest = require('jest');
jest.mock('../models');
jest.mock('bcryptjs');

// Mock Data
const mockUser = {
    user_id: 1,
    username: 'testuser',
    password: 'hashedpassword',
    role: 'division',
    first_name: 'Test',
    last_name: 'User',
    phone_number: 123456789,
    address: '123 Test St'
}

describe('User Controller', () => {

    // setup for mocking
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('createUser', () => {
        it('should create a new user succesfully', async () => {
            const req = httpMocks.createRequest({
                body: { ...mockUser, password: 'plainpassword'}
            });
            const res = httpMocks.createResponse();
            bcrypt.hash.mockResolvedValue('hashedpassword');
            Users.create.mockResolvedValue(mockUser);

            await userController.createUser(req, res);

            expect(res.statusCode).toBe(200);
            expect(JSON.parse(res._getData())).toMatchObject({
                message: "Created User Succesful",
                data: mockUser
            });
        });
        it('should handle errors gracefully', async () => {
            const req = httpMocks.createRequest({
                body: { username: 'testuser' } 
            });
            const res = httpMocks.createResponse();

            await userController.createUser(req, res);

            expect(res.statusCode).toBe(400);
            expect(JSON.parse(res._getData())).toMatchObject({
                error: 'All fields are required'
            });
        });
    });

    describe('deleteUser', () => {
        it('should delete')
    })
})