const problemController = require('../src/controllers/problem.controller');
const NotFound = require('../src/errors/notFound.error');
const problemService = require('../src/services/problem.service');
const { StatusCodes } = require('http-status-codes');

jest.mock('../src/services/problem.service');

describe('test', () => {
	beforeEach(() => {
		(req = {}),
			(res = {
				status: jest.fn(() => res),
				json: jest.fn(),
			}),
			(next = jest.fn());
	});
	test('Should get all problems', async () => {
		const problems = [];
		problemService.prototype.getAllProblems.mockResolvedValue(problems);
		await problemController.getProblems(req, res, next);
		expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
		expect(res.json).toHaveBeenCalledTimes(1);
		expect(next).not.toHaveBeenCalled();
	});
	test('getProblem should call next with error', async () => {
		const mockError = new NotFound('id', 123);
		problemService.prototype.getProblem.mockRejectedValue(mockError);
		req.params = { id: 10 };
		await problemController.getProblem(req, res, next);
		expect(next).toHaveBeenCalledWith(mockError);
		expect(res.status).not.toHaveBeenCalled();
		expect(res.json).not.toHaveBeenCalled();
	});
});
