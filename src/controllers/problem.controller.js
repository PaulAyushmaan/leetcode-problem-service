const { StatusCodes } = require('http-status-codes');
const NotImplemented = require('../errors/Notimplemented.error');
const { ProblemService } = require('../services');
const { ProblemRepository } = require('../repositorries');
const problemService = new ProblemService(new ProblemRepository());
function pingProblemControllers(req, res) {
	return res
		.status(StatusCodes.OK)
		.json({ message: 'Problem Controller Is Up' });
}

async function addProblem(req, res, next) {
	try {
		console.log('incoming req body', req.body);
		const newProblem = await problemService.createProblem(req.body);
		return res.status(StatusCodes.CREATED).json({
			success: true,
			message: 'Problem created successfully',
			error: {},
			data: newProblem,
		});
	} catch (error) {
		next(error);
	}
}

async function getProblem(req, res, next) {
	try {
		const problem = await problemService.getProblem(req.params.id);
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Successfully Fetched The Problem',
			error: {},
			data: problem,
		});
		// throw new NotImplemented('getTheProblem');
	} catch (error) {
		next(error);
	}
}

async function getProblems(req, res, next) {
	try {
		const response = await problemService.getAllProblems();
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'Successfully Fetched All The Problems',
			error: {},
			data: response,
		});
	} catch (error) {
		next(error);
	}
}

async function deleteProblem(req, res, next) {
	try {
		const response = await problemService.deleteProblem(req.params.id);
		return res.status(StatusCodes.OK).json({
			success: true,
			message: 'The Requested Problem is Deleted Successfully',
			error: {},
			data: response,
		});
	} catch (error) {
		next(error);
	}
}
function updateProblem(req, res, next) {
	try {
		throw new NotImplemented('updateProblem');
	} catch (error) {
		next(error);
	}
}
module.exports = {
	addProblem,
	getProblem,
	getProblems,
	deleteProblem,
	updateProblem,
	pingProblemControllers,
};
/**
 *
 * res
 *
 * res.status -> returns the same response object with status property set
 * .json -> return the same response object which has status set but this json to be returned is also set
 *
 */
